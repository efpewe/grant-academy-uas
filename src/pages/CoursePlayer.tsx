import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  courseService,
  type Course,
  type Lesson,
} from "../services/course.service";
import { useAuth } from "../contexts/AuthContext";
import { useModal } from "../contexts/ModalContext";

export default function CoursePlayer() {
  // Tangkap DUA parameter dari URL
  const { courseSlug, lessonSlug } = useParams<{
    courseSlug: string;
    lessonSlug?: string;
  }>();
  const navigate = useNavigate();
  const { user, hasPurchased } = useAuth();
  const { showAlert } = useModal();

  const [course, setCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. FETCH COURSE & CHECK ACCESS
  useEffect(() => {
    const initCourse = async () => {
      try {
        if (!courseSlug) return;

        // Cek apakah data course sudah ada di state (Optimization agar tidak fetch ulang saat ganti materi)
        // Kita hanya fetch jika course belum ada atau slug course berbeda
        if (!course || course.slug !== courseSlug) {
          const result = await courseService.getCourseBySlug(courseSlug);
          const courseData = result.data || result;

          if (!courseData) throw new Error("Kursus tidak ditemukan");

          // --- SECURITY CHECK ---
          const courseId = courseData._id;
          const isEnrolled = hasPurchased(courseId);
          const mentorId = courseData.mentor?._id || courseData.mentor;
          const isOwner = user?._id === mentorId;

          if (!isEnrolled && !isOwner) {
            showAlert("⛔ Akses Ditolak: Anda belum terdaftar.", "warning");
            navigate(`/course/${courseSlug}`);
            return;
          }

          setCourse(courseData);

          // LOGIC REDIRECT: Jika user akses /learn/react tapi tidak ada lessonSlug
          // Otomatis lempar ke lesson pertama
          if (!lessonSlug && courseData.lessons?.length > 0) {
            const firstLesson = courseData.lessons[0];
            navigate(
              `/learn/${courseSlug}/${encodeURIComponent(firstLesson.slug)}`,
              {
                replace: true,
              },
            );
          }
        }
      } catch (error) {
        console.error("Error loading course:", error);
        navigate("/my-courses");
      } finally {
        setLoading(false);
      }
    };

    if (user) initCourse();
  }, [courseSlug, user, hasPurchased, navigate]); // Hapus 'course' dari depedency agar tidak infinite loop

  // 2. SYNC URL DENGAN ACTIVE LESSON
  // Setiap kali URL (lessonSlug) berubah, kita update tampilan materi
  useEffect(() => {
    if (course && course.lessons) {
      if (lessonSlug) {
        // ⚡ DECODE URL parameter karena mungkin mengandung special characters
        const decodedSlug = decodeURIComponent(lessonSlug);

        // Cari materi berdasarkan SLUG (sesuai schema)
        const foundLesson = course.lessons.find((l) => l.slug === decodedSlug);
        if (foundLesson) {
          setActiveLesson(foundLesson);
        } else {
          // Jika slug ngawur (404), kembalikan ke materi pertama
          console.warn("Materi tidak ditemukan, redirecting...");
          if (course.lessons.length > 0) {
            navigate(
              `/learn/${courseSlug}/${encodeURIComponent(course.lessons[0].slug)}`,
              {
                replace: true,
              },
            );
          }
        }
      } else if (course.lessons.length > 0) {
        // Fallback jika tidak ada slug di URL
        setActiveLesson(course.lessons[0]);
      }
    }
  }, [lessonSlug, course, courseSlug, navigate]);

  // Helper Youtube
  const getYoutubeID = (url: string) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Navigasi saat Sidebar diklik
  const handleLessonClick = (lesson: Lesson) => {
    // ⚡ ENCODE URL untuk handle special characters seperti &, (, ) di slug
    const encodedSlug = encodeURIComponent(lesson.slug);

    // Kita TIDAK set state manual, tapi pindah URL.
    // useEffect ke-2 akan otomatis menangkap perubahan ini dan mengupdate UI.
    navigate(`/learn/${courseSlug}/${encodedSlug}`);
  };

  if (loading) return <div className="p-10 text-center">Memuat Kelas...</div>;
  if (!course) return null;

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      {/* HEADER */}
      <header className="h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-white shrink-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/my-courses")}
            className="text-gray-500 hover:text-black"
          >
            ← Kembali
          </button>
          <h1 className="font-bold text-gray-900 line-clamp-1">
            {course.title}
          </h1>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <aside className="w-80 border-r border-gray-200 bg-gray-50 flex flex-col overflow-y-auto hidden md:flex shrink-0">
          <div className="p-4 font-bold text-gray-700 border-b">
            Daftar Materi
          </div>
          <div className="flex-1 overflow-y-auto">
            {course.lessons?.map((lesson, idx) => {
              // Cek aktif berdasarkan SLUG, bukan ID lagi (meski ID juga bisa)
              const isActive = activeLesson?.slug === lesson.slug;

              return (
                <button
                  key={lesson._id}
                  onClick={() => handleLessonClick(lesson)} // Panggil handler navigasi
                  className={`w-full text-left p-4 text-sm border-b transition-colors flex gap-3
                                ${
                                  isActive
                                    ? "bg-white text-primary border-l-4 border-l-primary shadow-sm"
                                    : "text-gray-600 hover:bg-gray-100 border-l-4 border-l-transparent"
                                }
                            `}
                >
                  <span
                    className={`font-mono font-bold ${isActive ? "text-primary" : "text-gray-400"}`}
                  >
                    {idx + 1}.
                  </span>
                  <span className="line-clamp-2">{lesson.title}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* MAIN PLAYER */}
        <main className="flex-1 flex flex-col overflow-y-auto bg-white">
          {activeLesson ? (
            <>
              {/* VIDEO PLAYER */}
              {activeLesson.videoUrl ? (
                <div className="aspect-video w-full bg-black">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${getYoutubeID(activeLesson.videoUrl)}`}
                    title={activeLesson.title}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="bg-blue-50 p-10 border-b flex items-center gap-4">
                  <span className="text-4xl">📝</span>
                  <div>
                    <h2 className="text-xl font-bold">Materi Bacaan</h2>
                  </div>
                </div>
              )}

              {/* TEXT CONTENT */}
              <div className="p-8 max-w-4xl mx-auto w-full">
                <h2 className="text-2xl font-bold mb-6">
                  {activeLesson.title}
                </h2>
                <article className="prose prose-blue max-w-none whitespace-pre-line">
                  {activeLesson.content}
                </article>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              Pilih materi untuk mulai belajar.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

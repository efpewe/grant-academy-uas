import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courseService, type Course, type Lesson } from '../services/course.service';
import { useAuth } from '../contexts/AuthContext';

export default function CoursePlayer() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  // 1. Ambil fungsi hasPurchased dan data user dari AuthContext
  const { user, hasPurchased } = useAuth();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseAndCheckAccess = async () => {
      try {
        if (!slug) return;

        // A. Fetch Data Kursus
        const result = await courseService.getCourseBySlug(slug);
        
        // Handling struktur response (jaga-jaga jika ada wrapper .data atau tidak)
        const courseData = result.data || result; 
        
        if (!courseData) {
            throw new Error("Kursus tidak ditemukan");
        }

        // B. SECURITY CHECK (LOGIC PENGAMANAN)
        // Kita butuh ID kursus untuk cek di array enrolledCourses user
        const courseId = courseData._id;
        
        // Cek 1: Apakah user sudah beli?
        const isEnrolled = hasPurchased(courseId);
        
        // Cek 2: Apakah user adalah mentor pemilik kursus ini? (Biar mentor bisa preview)
        // Note: courseData.mentor bisa berupa object atau string ID, jadi kita handle keduanya
        const mentorId = courseData.mentor?._id || courseData.mentor;
        const isOwner = user?._id === mentorId;

        // JIKA TIDAK PUNYA AKSES -> TENDANG KELUAR
        if (!isEnrolled && !isOwner) {
            alert("⛔ Akses Ditolak: Anda belum terdaftar di kelas ini.");
            navigate(`/course/${slug}`); // Redirect ke halaman penjualan
            return; // Stop eksekusi
        }

        // C. Jika Aman, Set State
        setCourse(courseData);

        // Otomatis putar materi pertama
        if (courseData.lessons && courseData.lessons.length > 0) {
            setActiveLesson(courseData.lessons[0]);
        }

      } catch (error) {
        console.error("Gagal memuat kursus:", error);
        navigate('/my-courses');
      } finally {
        setLoading(false);
      }
    };

    // Pastikan user sudah loaded sebelum cek akses
    if (user) {
        fetchCourseAndCheckAccess();
    }
  }, [slug, navigate, user, hasPurchased]); // Dependency array penting agar re-run jika user berubah

  // --- HELPER YOUTUBE ---
  const getYoutubeID = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  if (loading) return (
      <div className="h-screen flex items-center justify-center flex-col gap-2">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 text-sm font-medium">Memverifikasi akses Anda...</p>
      </div>
  );

  if (!course) return null;

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      
      {/* HEADER */}
      <header className="h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-white shrink-0 z-10 shadow-sm">
         <div className="flex items-center gap-4">
            <button 
                onClick={() => navigate('/my-courses')} 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Kembali ke Dashboard"
            >
               <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
               </svg>
            </button>
            <div>
                <h1 className="font-bold text-gray-900 line-clamp-1 text-sm md:text-base">{course.title}</h1>
                <p className="text-xs text-gray-500">Mentor: {course.mentor?.fullName || 'Teacher'}</p>
            </div>
         </div>
         {/* Progress Bar Mockup */}
         <div className="hidden md:block">
             <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-1">
                 <span>Progress Belajar</span>
                 <span className="text-primary">0%</span>
             </div>
             <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                 <div className="h-full bg-primary w-[0%]"></div>
             </div>
         </div>
      </header>

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">
          
          {/* SIDEBAR (Responsive: Hidden on mobile initially) */}
          <aside className="w-80 border-r border-gray-200 bg-gray-50 flex flex-col overflow-y-auto hidden md:flex shrink-0">
             <div className="p-4 font-bold text-gray-700 border-b border-gray-100 text-sm uppercase tracking-wide">
                Daftar Materi ({course.lessons?.length || 0})
             </div>
             <div className="flex-1 overflow-y-auto custom-scrollbar">
                {course.lessons && course.lessons.length > 0 ? (
                    course.lessons.map((lesson, idx) => (
                        <button
                            key={lesson._id}
                            onClick={() => setActiveLesson(lesson)}
                            className={`w-full text-left p-4 text-sm border-b border-gray-100 transition-all flex gap-3 group
                                ${activeLesson?._id === lesson._id 
                                    ? 'bg-white text-primary border-l-4 border-l-primary shadow-sm z-10' 
                                    : 'text-gray-600 hover:bg-gray-100 border-l-4 border-l-transparent'}
                            `}
                        >
                            <span className={`font-mono font-bold ${activeLesson?._id === lesson._id ? 'text-primary' : 'text-gray-400'}`}>
                                {idx + 1}.
                            </span>
                            <span className="line-clamp-2 font-medium">{lesson.title}</span>
                            <span className="ml-auto text-xs opacity-50 grayscale group-hover:grayscale-0 transition-all" title={lesson.videoUrl ? 'Video' : 'Artikel'}>
                                {lesson.videoUrl ? '📺' : '📝'}
                            </span>
                        </button>
                    ))
                ) : (
                    <div className="p-8 text-sm text-gray-400 text-center flex flex-col items-center">
                        <span className="text-2xl mb-2">📭</span>
                        Belum ada materi yang diupload.
                    </div>
                )}
             </div>
          </aside>

          {/* MAIN PLAYER */}
          <main className="flex-1 flex flex-col overflow-y-auto bg-white relative scroll-smooth">
             {activeLesson ? (
                 <>
                    {/* VIDEO AREA */}
                    {activeLesson.videoUrl ? (
                        <div className="aspect-video w-full bg-black shadow-lg">
                            <iframe 
                                width="100%" 
                                height="100%" 
                                src={`https://www.youtube.com/embed/${getYoutubeID(activeLesson.videoUrl)}?modestbranding=1&rel=0`} 
                                title={activeLesson.title}
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                            ></iframe>
                        </div>
                    ) : (
                        // HEADER ARTIKEL (Jika tidak ada video)
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-10 border-b flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">
                                📝
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">Mode Baca</h2>
                                <p className="text-sm text-gray-500">Silakan pelajari materi teks di bawah ini.</p>
                            </div>
                        </div>
                    )}

                    {/* CONTENT / DESCRIPTION */}
                    <div className="p-6 md:p-10 max-w-4xl mx-auto w-full">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                            <h2 className="text-2xl font-bold font-lexend text-gray-900 leading-tight">
                                {activeLesson.title}
                            </h2>
                        </div>

                        {/* Render Text dengan whitespace-pre-line agar enter terbaca */}
                        <article className="prose prose-blue prose-lg max-w-none text-gray-600 leading-relaxed whitespace-pre-line font-inter">
                            {activeLesson.content}
                        </article>
                    </div>
                 </>
             ) : (
                 <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                     <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                         👈
                     </div>
                     <p>Pilih materi di samping untuk mulai belajar.</p>
                 </div>
             )}
          </main>
      </div>
    </div>
  );
}
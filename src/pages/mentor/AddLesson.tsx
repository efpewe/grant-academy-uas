import { useState, type ChangeEvent, type FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/templates/DashboardLayout";
import { courseService } from "../../services/course.service";
import { useModal } from "../../contexts/ModalContext";

export default function AddLesson() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { showAlert } = useModal();

  const [loading, setLoading] = useState(false);

  const [lessonType, setLessonType] = useState<"video" | "text">("video");

  const [formData, setFormData] = useState({
    title: "",
    videoUrl: "",
    content: "",
    isFree: false,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, isFree: e.target.checked });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!courseId) return;

    setLoading(true);
    try {
      const payload = {
        ...formData,
        videoUrl: lessonType === "text" ? "" : formData.videoUrl,
      };

      await courseService.addLesson(courseId, payload);
      showAlert("Materi berhasil ditambahkan!", "success");
      navigate("/mentor/dashboard");
    } catch (error: any) {
      console.error(error);
      showAlert(
        error.response?.data?.message || "Gagal menambah materi",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold mb-2 font-lexend">
          Tambah Materi Baru
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Pilih jenis materi yang ingin Anda sampaikan.
        </p>

        <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => setLessonType("video")}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
              lessonType === "video"
                ? "bg-white text-primary shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <span>📹</span> Materi Video
          </button>
          <button
            type="button"
            onClick={() => setLessonType("text")}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
              lessonType === "text"
                ? "bg-white text-primary shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <span>📝</span> Materi Bacaan / Teks
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Judul Materi
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
              placeholder={
                lessonType === "video"
                  ? "Contoh: Intro to React Hooks"
                  : "Contoh: Panduan Instalasi Node.js"
              }
            />
          </div>

          {lessonType === "video" && (
            <div className="animate-fade-in-down">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Link Video (YouTube) <span className="text-red-500">*</span>
              </label>
              <input
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                required={lessonType === "video"}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none bg-blue-50/50"
                placeholder="https://youtube.com/watch?v=..."
              />
              <p className="text-xs text-gray-400 mt-1">
                Pastikan video tidak di-private.
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {lessonType === "video"
                ? "Deskripsi Video"
                : "Isi Artikel / Materi Bacaan"}
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={lessonType === "text" ? 15 : 4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
              placeholder={
                lessonType === "video"
                  ? "Jelaskan singkat tentang apa yang dibahas di video ini..."
                  : "Tulis materi lengkap Anda di sini. Anda bisa menjelaskan konsep, memberikan contoh kode, atau langkah-langkah tutorial..."
              }
            />
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
            <input
              type="checkbox"
              id="isFree"
              checked={formData.isFree}
              onChange={handleCheckbox}
              className="w-5 h-5 text-primary rounded focus:ring-primary"
            />
            <label
              htmlFor="isFree"
              className="text-sm font-medium text-gray-700 cursor-pointer select-none"
            >
              Set sebagai <strong>Preview Gratis</strong>
              <span className="text-gray-400 font-normal ml-1">
                (Dapat diakses tanpa membeli kursus)
              </span>
            </label>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => navigate("/mentor/dashboard")}
              className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors shadow-lg flex justify-center items-center gap-2"
            >
              {loading ? (
                "Menyimpan..."
              ) : (
                <>
                  <span>💾</span> Simpan Materi{" "}
                  {lessonType === "text" ? "Bacaan" : "Video"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

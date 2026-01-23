import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/templates/DashboardLayout";
import { courseService } from "../../services/course.service";
import { AxiosError } from "axios"; // Import untuk handling error

export default function CreateCourse() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  // State Form
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    level: "Beginner",
    category: "Development",
    thumbnail: null as File | null,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ UPDATE: Handle File dengan Validasi Size
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // 1. Validasi Ukuran (Max 2MB) sesuai limit Backend
      if (file.size > 2 * 1024 * 1024) {
        alert("Ukuran file terlalu besar! Maksimal 2MB.");
        e.target.value = ""; // Reset input
        return;
      }

      // 2. Validasi Tipe (Opsional, meski accept sudah memfilter)
      if (!file.type.startsWith("image/")) {
        alert("File harus berupa gambar!");
        return;
      }

      setFormData({ ...formData, thumbnail: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Siapkan FormData
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("price", formData.price.toString());
      payload.append("level", formData.level);
      payload.append("category", formData.category);

      // 'thumbnail' harus sesuai dengan upload.single('thumbnail') di backend
      if (formData.thumbnail) {
        payload.append("thumbnail", formData.thumbnail);
      }

      // 2. Kirim ke Backend
      await courseService.createCourse(payload);

      alert("Kursus berhasil dibuat!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      // ✅ UPDATE: Error Handling yang lebih detail
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message || "Gagal membuat kursus";
        alert(`Error: ${message}`);
      } else {
        alert("Terjadi kesalahan sistem.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto pb-10">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold font-lexend text-gray-900">
              Buat Kursus Baru
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Isi detail di bawah untuk mempublikasikan materi baru.
            </p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-gray-700 text-sm font-medium"
          >
            &larr; Kembali
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6"
        >
          {/* Judul Kursus */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Judul Kursus <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Contoh: Fullstack Laravel & React 2024"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Grid Kategori & Level */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Kategori
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none appearance-none bg-white"
                >
                  <option value="Development">Development</option>
                  <option value="Design">Design</option>
                  <option value="Business">Business</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                </select>
                <div className="absolute right-4 top-4 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Level
              </label>
              <div className="relative">
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none appearance-none bg-white"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                <div className="absolute right-4 top-4 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Deskripsi <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={6}
              placeholder="Jelaskan kurikulum, target audience, dan apa yang akan dipelajari..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none resize-none"
            />
          </div>

          {/* Harga */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Harga (Rp)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-gray-500 font-bold">
                Rp
              </span>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min={0}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div
                className={`w-2 h-2 rounded-full ${formData.price === 0 ? "bg-green-500" : "bg-gray-300"}`}
              ></div>
              <p className="text-xs text-gray-500">
                {formData.price === 0
                  ? "Kursus ini akan diset sebagai GRATIS."
                  : "Harga dalam Rupiah."}
              </p>
            </div>
          </div>

          {/* Upload Thumbnail */}
          <div className="p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Thumbnail Kursus <span className="text-red-500">*</span>
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Preview Image */}
              <div className="w-full sm:w-48 h-32 bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm flex items-center justify-center shrink-0 relative group">
                {preview ? (
                  <>
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-xs font-medium">
                        Preview
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-4">
                    <svg
                      className="w-8 h-8 text-gray-300 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <span className="text-gray-400 text-xs">No Image</span>
                  </div>
                )}
              </div>

              {/* Input File */}
              <div className="flex-1 w-full">
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2.5 file:px-4
                                file:rounded-lg file:border-0
                                file:text-sm file:font-semibold
                                file:bg-primary file:text-white
                                hover:file:bg-primary/90
                                cursor-pointer file:cursor-pointer
                            "
                />
                <div className="mt-3 text-xs text-gray-500 space-y-1">
                  <p>✓ Format: JPG, PNG, WebP</p>
                  <p>✓ Maksimal Ukuran: 2MB</p>
                  <p>✓ Rasio Rekomendasi: 16:9 (cth: 1280x720)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-white text-gray-600 font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`
                        px-8 py-3 bg-primary text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg
                        flex items-center gap-2
                        ${loading ? "opacity-70 cursor-wait" : "hover:-translate-y-0.5"}
                    `}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Mengupload...</span>
                </>
              ) : (
                <>
                  <span>🚀 Terbitkan Kursus</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

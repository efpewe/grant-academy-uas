import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/templates/DashboardLayout';
import { courseService } from '@/services/course.service';

export default function CreateCourse() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  // State Form
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    level: 'Beginner',
    category: 'Development',
    thumbnail: null as File | null, // State khusus file
  });

  // Handle Input Teks
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Input File (Thumbnail)
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, thumbnail: file });
      // Buat preview gambar lokal
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle Submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Bungkus data ke FormData object
      const payload = new FormData();
      payload.append('title', formData.title);
      payload.append('description', formData.description);
      payload.append('price', formData.price.toString()); // Number harus jadi string
      payload.append('level', formData.level);
      payload.append('category', formData.category);
      
      if (formData.thumbnail) {
        payload.append('thumbnail', formData.thumbnail);
      }

      // 2. Kirim ke Backend
      await courseService.createCourse(payload);
      
      alert('Kursus berhasil dibuat!');
      navigate('/dashboard'); // Atau ke halaman manage course
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || 'Gagal membuat kursus');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
            <h1 className="text-2xl font-bold font-lexend text-gray-900">Buat Kursus Baru</h1>
            <p className="text-gray-500 text-sm">Bagikan ilmumu kepada dunia.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            
            {/* Judul Kursus */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Judul Kursus</label>
                <input 
                    type="text" 
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="Contoh: Mastering React JS 2024"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
            </div>

            {/* Kategori & Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Kategori</label>
                    <select 
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
                    >
                        <option value="Development">Development</option>
                        <option value="Design">Design</option>
                        <option value="Business">Business</option>
                        <option value="Marketing">Marketing</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Level</label>
                    <select 
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
                    >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>
            </div>

            {/* Deskripsi */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Deskripsi</label>
                <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Jelaskan apa yang akan dipelajari siswa..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
                />
            </div>

            {/* Harga */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Harga (Rp)</label>
                <div className="relative">
                    <span className="absolute left-4 top-3 text-gray-500 font-bold">Rp</span>
                    <input 
                        type="number" 
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        min={0}
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
                    />
                </div>
                <p className="text-xs text-gray-400 mt-1">Isi 0 untuk kursus GRATIS.</p>
            </div>

            {/* Upload Thumbnail */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Thumbnail Kursus</label>
                
                <div className="flex items-start gap-6">
                    {/* Preview Image */}
                    <div className="w-40 h-24 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center shrink-0">
                        {preview ? (
                            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-gray-400 text-xs text-center px-2">No Image</span>
                        )}
                    </div>

                    {/* Input File */}
                    <div className="flex-1">
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-bold
                                file:bg-primary/10 file:text-primary
                                hover:file:bg-primary/20
                            "
                        />
                        <p className="text-xs text-gray-400 mt-2">Format: JPG, PNG, WebP. Maks 2MB.</p>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className={`
                        px-8 py-3 bg-primary text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1
                        ${loading ? 'opacity-70 cursor-wait' : ''}
                    `}
                >
                    {loading ? 'Menyimpan...' : '🚀 Terbitkan Kursus'}
                </button>
            </div>

        </form>
      </div>
    </DashboardLayout>
  );
}
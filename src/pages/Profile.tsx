import { useState, useEffect, useRef, type ChangeEvent, type FormEvent } from 'react';
import DashboardLayout from '../components/templates/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/auth.service';

export default function Profile() {
  const { user, refreshProfile } = useAuth(); 
  
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // 1. State untuk File Gambar
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    profession: '',
    bio: '',
    skills: '', 
    linkedin: '',
    github: '',
    website: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        username: user.username || '',
        profession: user.profession || '',
        bio: user.bio || '',
        skills: user.skills?.join(', ') || '',
        linkedin: user.socials?.linkedin || '',
        github: user.socials?.github || '',
        website: user.socials?.website || ''
      });
      // Set preview awal dari data user yang sudah ada
      setPhotoPreview(user.profilePicture || null);
    }
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. Handle Perubahan File (Upload Gambar)
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];

        // Validasi Ukuran (Max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            setErrorMsg("Ukuran file terlalu besar! Maksimal 2MB.");
            return;
        }

        setPhotoFile(file);
        setPhotoPreview(URL.createObjectURL(file)); // Buat preview lokal
        setErrorMsg(''); // Hapus error jika ada
    }
  };

  // 3. Trigger klik pada input file tersembunyi
  const handleTriggerFile = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      // 4. Gunakan FormData untuk mengirim File + Data Text
      const payload = new FormData();
      
      payload.append('fullName', formData.fullName);
      payload.append('profession', formData.profession);
      payload.append('bio', formData.bio);
      
      // Kirim skills sebagai array JSON string atau dipisah koma (Tergantung Backend Anda)
      // Opsi 1 (Jika backend terima string lalu di-split):
      // payload.append('skills', formData.skills); 
      
      // Opsi 2 (Jika backend terima array via FormData, kita kirim loop):
      const skillArray = formData.skills.split(',').map(s => s.trim()).filter(s => s !== '');
      skillArray.forEach(skill => payload.append('skills[]', skill));

      // Socials (Nested Object di FormData biasanya dikirim per key)
      payload.append('socials[linkedin]', formData.linkedin);
      payload.append('socials[github]', formData.github);
      payload.append('socials[website]', formData.website);

      // 🔥 Kirim File Profil (Jika ada perubahan)
      if (photoFile) {
        payload.append('profilePicture', photoFile); 
      }

      // Pastikan authService.updateProfile mendukung FormData!
      await authService.updateProfile(payload);
      
      await refreshProfile(); 

      setSuccessMsg("Profil berhasil diperbarui!");
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || 'Gagal mengupdate profil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold font-lexend text-gray-900 mb-8">Profil Saya</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* --- KOLOM KIRI (Kartu User) --- */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center sticky top-24">
              
              {/* AREA FOTO PROFIL DENGAN TOMBOL EDIT */}
              <div className="relative w-32 h-32 mx-auto mb-4 group">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-100">
                    <img 
                        src={photoPreview && photoPreview !== 'user.jpg' 
                            ? photoPreview 
                            : `https://ui-avatars.com/api/?name=${user?.fullName || 'User'}&background=random`} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                    />
                </div>
                
                {/* Overlay Tombol Edit saat Hover */}
                <button 
                    type="button"
                    onClick={handleTriggerFile}
                    className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                </button>

                {/* Input File Tersembunyi */}
                <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg, image/jpg"
                    className="hidden"
                />
              </div>

              <button 
                type="button" 
                onClick={handleTriggerFile}
                className="text-xs text-primary font-bold hover:underline mb-4"
              >
                Ubah Foto Profil
              </button>
              
              <h2 className="text-xl font-bold font-lexend text-gray-900">{user?.fullName}</h2>
              <p className="text-gray-500 text-sm mb-4">@{user?.username}</p>
              
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase mb-6">
                {user?.role}
              </div>

              <div className="text-left border-t border-gray-100 pt-4 space-y-3">
                <div>
                  <label className="text-xs text-gray-400 uppercase font-bold">Email</label>
                  <p className="text-gray-700 font-medium break-all">{user?.email}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase font-bold">Bergabung Sejak</label>
                  <p className="text-gray-700 font-medium">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : '-'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* --- KOLOM KANAN (Form Edit) --- */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">
              <h3 className="text-xl font-bold font-lexend text-gray-900 mb-6 pb-4 border-b border-gray-100">
                Edit Informasi
              </h3>

              {successMsg && (
                <div className="mb-4 p-4 bg-green-50 text-green-600 rounded-lg border border-green-100 text-sm flex items-center">
                  ✅ <span className="ml-2">{successMsg}</span>
                </div>
              )}
              {errorMsg && (
                <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 text-sm">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 gap-6">
                
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-lexend">Nama Lengkap</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    required
                  />
                </div>

                {/* Profession */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-lexend">Profesi / Pekerjaan</label>
                  <input
                    type="text"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    placeholder="Contoh: Frontend Developer"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-lexend">Bio Singkat</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Ceritakan sedikit tentang dirimu..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                  />
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-lexend">Keahlian (Skills)</label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="Pisahkan dengan koma. Contoh: React, Node.js, UI Design"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  />
                  <p className="text-xs text-gray-400 mt-1">Gunakan tanda koma ( , ) untuk memisahkan skill.</p>
                </div>

                {/* Social Links */}
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-md font-semibold font-lexend text-gray-800 mb-4">Social Media</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">LinkedIn URL</label>
                      <input
                        type="url"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">GitHub URL</label>
                      <input
                        type="url"
                        name="github"
                        value={formData.github}
                        onChange={handleChange}
                        placeholder="https://github.com/..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-500 mb-1">Website / Portfolio</label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="https://websiteanda.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`
                      px-6 py-2.5 rounded-lg text-white font-medium font-lexend shadow-md transition-all
                      ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark hover:shadow-lg'}
                    `}
                  >
                    {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                  </button>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
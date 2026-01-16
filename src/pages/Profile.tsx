import { useState, useEffect } from 'react';
import MainLayout from '../components/templates/MainLayout';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/auth.service';

export default function Profile() {
  const { user, refreshProfile } = useAuth(); 
  
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

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
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const payload = {
        fullName: formData.fullName,
        profession: formData.profession,
        bio: formData.bio,
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s !== ''),
        socials: {
          linkedin: formData.linkedin,
          github: formData.github,
          website: formData.website
        }
      };

      // PERBAIKAN 2: Hapus 'const response =' karena tidak dipakai
      await authService.updateProfile(payload);
      
      // PERBAIKAN 3: Gunakan refreshProfile() agar update instant tanpa reload browser
      await refreshProfile(); 

      setSuccessMsg("Profil berhasil diperbarui!");
      // window.location.reload(); // Hapus ini karena sudah pakai refreshProfile
      
      // Scroll ke atas agar pesan sukses terlihat (opsional)
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || 'Gagal mengupdate profil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold font-lexend text-gray-900 mb-8">Profil Saya</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* --- KOLOM KIRI (Kartu User) --- */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center sticky top-24">
              <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full overflow-hidden mb-4 border-4 border-white shadow-md">
                <img 
                  src={user?.profilePicture && user.profilePicture !== 'user.jpg' 
                    ? user.profilePicture 
                    : `https://ui-avatars.com/api/?name=${user?.fullName}&background=random`} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
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
    </MainLayout>
  );
}
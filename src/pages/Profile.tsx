import {
  useState,
  useEffect,
  useRef,
  type ChangeEvent,
  type FormEvent,
} from "react";
import DashboardLayout from "../components/templates/DashboardLayout";
import { useAuth } from "../contexts/AuthContext";
import { authService } from "../services/auth.service";

export default function Profile() {
  const { user, refreshProfile } = useAuth();

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    profession: "",
    bio: "",
    skills: "",
    linkedin: "",
    github: "",
    website: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        username: user.username || "",
        profession: user.profession || "",
        bio: user.bio || "",
        skills: user.skills?.join(", ") || "",
        linkedin: user.socials?.linkedin || "",
        github: user.socials?.github || "",
        website: user.socials?.website || "",
      });
      setPhotoPreview(user.profilePicture || null);
    }
  }, [user]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size > 2 * 1024 * 1024) {
        setErrorMsg("Ukuran file terlalu besar! Maksimal 2MB.");
        e.target.value = "";
        return;
      }

      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
      setErrorMsg("");
    }
  };

  const handleTriggerFile = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const payload = new FormData();

      payload.append("fullName", formData.fullName);
      payload.append("profession", formData.profession);
      payload.append("bio", formData.bio);

      const skillArray = formData.skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== "");
      skillArray.forEach((skill) => payload.append("skills[]", skill));

      payload.append("socials[linkedin]", formData.linkedin);
      payload.append("socials[github]", formData.github);
      payload.append("socials[website]", formData.website);

      if (photoFile) {
        payload.append("profilePicture", photoFile);
      }

      await authService.updateProfile(payload);

      await refreshProfile();

      setSuccessMsg("Profil berhasil diperbarui!");

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || "Gagal mengupdate profil");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold font-lexend text-gray-900 mb-8">
          Profil Saya
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center sticky top-24">
              <div className="relative w-32 h-32 mx-auto mb-6 group">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100">
                  <img
                    src={
                      photoPreview && photoPreview !== "user.jpg"
                        ? photoPreview
                        : `https://ui-avatars.com/api/?name=${user?.fullName || "User"}&background=random&size=128`
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleTriggerFile}
                  className="absolute bottom-0 right-0 bg-blue-600 text-white p-2.5 rounded-full shadow-md hover:bg-blue-700 transition-all transform hover:scale-110 border-2 border-white z-10 cursor-pointer"
                  title="Ubah Foto Profil"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </button>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  className="hidden"
                />
              </div>

              <h2 className="text-xl font-bold font-lexend text-gray-900">
                {user?.fullName}
              </h2>
              <p className="text-gray-500 text-sm mb-4">@{user?.username}</p>

              <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase mb-6">
                {user?.role || "User"}
              </div>

              <div className="text-left border-t border-gray-100 pt-4 space-y-3">
                <div>
                  <label className="text-xs text-gray-400 uppercase font-bold">
                    Email
                  </label>
                  <p className="text-gray-700 font-medium break-all">
                    {user?.email}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase font-bold">
                    Bergabung Sejak
                  </label>
                  <p className="text-gray-700 font-medium">
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8"
            >
              <h3 className="text-xl font-bold font-lexend text-gray-900 mb-6 pb-4 border-b border-gray-100">
                Edit Informasi
              </h3>

              {successMsg && (
                <div className="mb-4 p-4 bg-green-50 text-green-600 rounded-lg border border-green-100 text-sm flex items-center animate-fade-in">
                  ✅ <span className="ml-2 font-medium">{successMsg}</span>
                </div>
              )}
              {errorMsg && (
                <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 text-sm flex items-center animate-fade-in">
                  ⚠️ <span className="ml-2 font-medium">{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-lexend">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-lexend">
                    Profesi / Pekerjaan
                  </label>
                  <input
                    type="text"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    placeholder="Contoh: Frontend Developer"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-lexend">
                    Bio Singkat
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Ceritakan sedikit tentang dirimu..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-lexend">
                    Keahlian (Skills)
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="Pisahkan dengan koma. Contoh: React, Node.js, UI Design"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Gunakan tanda koma ( , ) untuk memisahkan skill.
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-md font-semibold font-lexend text-gray-800 mb-4">
                    Social Media
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">
                        LinkedIn URL
                      </label>
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
                      <label className="block text-xs font-bold text-gray-500 mb-1">
                        GitHub URL
                      </label>
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
                      <label className="block text-xs font-bold text-gray-500 mb-1">
                        Website / Portfolio
                      </label>
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

                <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end items-center gap-4">
                  {loading && (
                    <span className="text-sm text-gray-500 animate-pulse">
                      Sedang menyimpan...
                    </span>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className={`
                      flex items-center gap-2 px-8 py-3 rounded-xl text-white font-bold font-lexend shadow-lg transition-all
                      ${
                        loading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-primary hover:bg-primary-dark hover:-translate-y-1 hover:shadow-xl"
                      }
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
                        <span>Menyimpan...</span>
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span>Simpan Perubahan</span>
                      </>
                    )}
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

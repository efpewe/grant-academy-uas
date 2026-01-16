import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../components/templates/MainLayout';
import Badge from '../components/atoms/Badge'; 
import { courseService, type Course } from '../services/course.service';
import { transactionService } from '../services/transaction.service';
import { useAuth } from '../contexts/AuthContext';

export default function CourseDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, hasPurchased, refreshProfile } = useAuth();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  // --- LOG DEBUGGING (WAJIB MUNCUL) ---
  console.log("🔥 RENDER COMPONENT JALAN! Slug:", slug); 
  // ------------------------------------

  useEffect(() => {
    const fetchCourse = async () => {
      // LOG DI DALAM EFFECT
      console.log("🚀 useEffect Triggered. Mencari:", slug);

      try {
        if (slug) {
          const result = await courseService.getCourseBySlug(slug);
          console.log("📦 DATA API DITERIMA:", result); // Cek isi ini!

          // Logic Penyelamat Data
          if (result && result.data) {
             setCourse(result.data);
          } else {
             setCourse(result); // Fallback jika data langsung object
          }
        }
      } catch (error) {
        console.error("❌ Gagal memuat kursus:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  // Format Rupiah
  const formatPrice = (price: number) => {
    return price === 0 
      ? "Gratis" 
      : new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  const handleEnroll = async () => {
    if (!isAuthenticated || !user) { navigate('/login'); return; }
    if (!course) return;

    try {
        setProcessing(true);
        await transactionService.checkout(course._id);
        await refreshProfile(); 
        alert("Pendaftaran Berhasil!");
        navigate('/my-courses');
    } catch (error: any) {
        alert(error.response?.data?.message || "Gagal.");
    } finally {
        setProcessing(false);
    }
  };

  if (loading) return <MainLayout><div className="p-20 text-center">Loading...</div></MainLayout>;

  if (!course) {
    return (
      <MainLayout>
        <div className="container py-20 text-center">
          <h2 className="text-2xl font-bold">Kursus tidak ditemukan</h2>
          <p className="text-gray-500 mb-4">Slug yang dicari: {slug}</p> {/* Tampilkan slug di layar */}
          <button onClick={() => navigate('/dashboard')} className="text-primary font-bold">Kembali</button>
        </div>
      </MainLayout>
    );
  }

  // Cek Status Pembelian
  const isOwned = user ? hasPurchased(course._id) : false;

  return (
    <MainLayout>
      {/* HEADER */}
      <section className="bg-[#f9f9f9] text-center pt-16 pb-20 px-4">
        <div className="container mx-auto flex flex-col items-center max-w-4xl">
          <Badge text={course.category} />
          <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
          <p className="text-gray-500">Mentor: {course.mentor?.fullName}</p>
          <img src={course.thumbnail} alt={course.title} className="w-full max-w-[700px] rounded-2xl mt-8 shadow-xl" />
        </div>
      </section>

      {/* CONTENT */}
      <section className="pb-20 -mt-10 px-4">
         <div className="max-w-[800px] mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-4">Deskripsi</h2>
            <p className="text-gray-600 mb-8 whitespace-pre-line">{course.description}</p>
            
            <div className="flex justify-between items-center pt-6 border-t">
               <div>
                  <p className="text-sm text-gray-400">Harga</p>
                  <h3 className="text-2xl font-bold text-primary">{formatPrice(course.price)}</h3>
               </div>
               <button 
                  onClick={isOwned ? () => navigate('/my-courses') : handleEnroll}
                  disabled={processing}
                  className={`px-8 py-3 rounded-full text-white font-bold ${isOwned ? 'bg-green-600' : 'bg-primary'}`}
               >
                  {isOwned ? 'Lanjut Belajar' : 'Daftar Sekarang'}
               </button>
            </div>
         </div>
      </section>
    </MainLayout>
  );
}
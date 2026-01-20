import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/templates/DashboardLayout';
import CourseCard from '../components/molecules/CourseCard';
import Button from '../components/atoms/Button'; 
import { transactionService } from '../services/transaction.service';
import { type Course } from '../services/course.service';

export default function MyCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyClasses = async () => {
      try {
        // 1. Ambil data transaksi user
        const result = await transactionService.getMyTransactions();
        const transactions = result.data || [];

        // 2. Filter & Extract Data
        const myPurchasedCourses = transactions
          // Hanya ambil transaksi yang SUKSES (Settlement) atau GRATIS (Capture/Success)
          .filter((trx: any) => 
             trx.status === 'settlement' || 
             trx.status === 'success' || 
             trx.status === 'capture'
          )
          // Ambil object course dari dalam transaksi
          .map((trx: any) => trx.course)
          // Hapus data null (jika kursus sudah dihapus admin tapi transaksi masih ada)
          .filter((course: any) => course !== null);

        // 3. Hapus Duplikat
        // (Jaga-jaga jika user tidak sengaja beli kursus yang sama 2x sebelum validasi dipasang)
        const uniqueCourses = Array.from(
            new Map(myPurchasedCourses.map((c: any) => [c._id, c])).values()
        ) as Course[];

        setCourses(uniqueCourses);

      } catch (error) {
        console.error("❌ Gagal memuat kelas saya:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyClasses();
  }, []);

  return (
    <DashboardLayout>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
           <h1 className="text-2xl font-bold font-lexend text-gray-900">Kelas Saya</h1>
           <p className="text-gray-500 text-sm">Daftar kursus yang telah Anda beli.</p>
        </div>
        <Link to="/dashboard">
            <Button className="text-sm py-2.5 px-6 shadow-md hover:shadow-lg transition-all">
               + Cari Kelas Baru
            </Button>
        </Link>
      </div>

      {/* Content Section */}
      {loading ? (
         // Loading State
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
               <div key={i} className="h-64 bg-gray-100 rounded-xl animate-pulse"></div>
            ))}
         </div>
      ) : courses.length > 0 ? (
         // Data State: Grid Kartu Kursus
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
               <CourseCard key={course._id} course={course} />
            ))}
         </div>
      ) : (
         // Empty State
         <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
            <div className="w-20 h-20 bg-blue-50 text-primary rounded-full flex items-center justify-center mb-6 text-4xl shadow-sm">
                📚
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 font-lexend">Belum ada kelas aktif</h3>
            <p className="text-gray-500 mb-8 max-w-md text-center leading-relaxed">
                Anda belum mengikuti kelas apapun. Investasikan waktu Anda untuk belajar skill baru hari ini!
            </p>
            <Link to="/dashboard">
                <Button className="px-8 py-3 bg-white text-primary border border-primary hover:bg-blue-50">
                    Jelajahi Katalog Kelas
                </Button>
            </Link>
         </div>
      )}
    </DashboardLayout>
  );
}
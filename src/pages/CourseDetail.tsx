import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import MainLayout from "../components/templates/MainLayout";
import Badge from "../components/atoms/Badge";
import { courseService, type Course } from "../services/course.service";
import { transactionService } from "../services/transaction.service";
import { useAuth } from "../contexts/AuthContext";
import { useModal } from "../contexts/ModalContext";

export default function CourseDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // Hook untuk menyimpan history url saat ini
  const { user, isAuthenticated, hasPurchased, refreshProfile } = useAuth();
  const { showAlert } = useModal();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  // 1. FETCH DATA COURSE
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        if (slug) {
          const result = await courseService.getCourseBySlug(slug);

          // Extract data from ApiResponse<Course>
          setCourse(result.data);
        }
      } catch (error) {
        console.error("❌ Gagal memuat kursus:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [slug]);

  // 2. FORMAT RUPIAH
  const formatPrice = (price: number) => {
    return price === 0
      ? "Gratis"
      : new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(price);
  };

  // 3. LOGIC PENDAFTARAN (CORE LOGIC)
  const handleEnroll = async () => {
    // Skenario A: Belum Login
    if (!isAuthenticated || !user) {
      // Redirect ke login, bawa state 'from' agar nanti bisa balik lagi kesini
      navigate("/login", { state: { from: location } });
      return;
    }

    if (!course) return;

    try {
      setProcessing(true);

      const result = await transactionService.checkout(course._id);

      // Handle both possible response structures
      // Backend returns: { message, data: {...transaction} }
      // After axios, result = { message, data: {...transaction} }
      const transactionData = result.data || result;

      // PENTING: Refresh profile agar data 'enrolledCourses' di context terupdate
      await refreshProfile();

      // Skenario B: Logic Pemisah Gratis vs Bayar
      if (course.price === 0) {
        // --- KELAS GRATIS ---
        alert("Berhasil mendaftar kelas gratis!");
        // Arahkan ke halaman user, misalnya Transaksi atau Kelas Saya
        navigate("/transactions");
      } else {
        // --- KELAS BERBAYAR ---
        // Arahkan ke halaman Payment dengan membawa ID Transaksi
        navigate(`/payment/${transactionData._id}`, {
          state: { transactionData: transactionData },
        });
      }
    } catch (error: any) {
      // Handle Error (Misal user sudah punya kursus)
      console.error("❌ Checkout Error:", error);
      console.error("📄 Error Response:", error.response?.data);

      const msg =
        error.response?.data?.message || "Gagal memproses pendaftaran.";

      if (
        msg.toLowerCase().includes("already") ||
        error.response?.status === 400
      ) {
        showAlert("Anda sudah terdaftar di kelas ini.", "info");
        navigate("/my-courses");
      } else {
        showAlert(msg, "error");
      }
    } finally {
      setProcessing(false);
    }
  };

  // --- RENDERING ---

  if (loading)
    return (
      <MainLayout>
        <div className="p-20 text-center">Loading...</div>
      </MainLayout>
    );

  if (!course) {
    return (
      <MainLayout>
        <div className="container py-20 text-center">
          <h2 className="text-2xl font-bold">Kursus tidak ditemukan</h2>
          <p className="text-gray-500 mb-4">Slug: {slug}</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-primary font-bold"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </MainLayout>
    );
  }

  // Cek Status Pembelian (Untuk ubah tombol jadi 'Lanjut Belajar')
  // Kita handle kemungkinan course._id bertipe object atau string
  const isOwned = user ? hasPurchased(course._id) : false;

  return (
    <MainLayout>
      {/* HEADER SECTION */}
      <section className="bg-[#f9f9f9] text-center pt-16 pb-20 px-4">
        <div className="container mx-auto flex flex-col items-center max-w-4xl">
          <Badge text={course.category} />
          <h1 className="text-3xl md:text-5xl font-bold font-lexend mt-4 mb-4 text-gray-900 leading-tight">
            {course.title}
          </h1>
          <p className="text-gray-500 text-lg">
            Mentor:{" "}
            <span className="font-semibold text-gray-800">
              {course.mentor?.fullName || "Tim Grant Academy"}
            </span>
          </p>
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full max-w-175 aspect-video object-cover rounded-2xl mt-8 shadow-xl border-4 border-white"
          />
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="pb-20 -mt-10 px-4">
        <div className="max-w-200 mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold font-lexend mb-4">Deskripsi</h2>
          <p className="text-gray-600 mb-8 whitespace-pre-line leading-relaxed font-inter">
            {course.description}
          </p>

          {/* List Materi */}
          {course.lessons && course.lessons.length > 0 && (
            <div className="mb-8 p-6 bg-gray-50 rounded-xl">
              <h3 className="font-bold mb-4">Materi yang akan dipelajari:</h3>
              <ul className="space-y-2">
                {course.lessons.map((lesson, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <span className="text-primary font-bold">✓</span>{" "}
                    {lesson.title}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ACTION FOOTER */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-gray-100 gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-400 font-lexend">
                Investasi Belajar
              </p>
              <h3 className="text-3xl font-bold text-primary font-lexend">
                {formatPrice(course.price)}
              </h3>
            </div>

            <button
              onClick={isOwned ? () => navigate("/my-courses") : handleEnroll}
              disabled={processing}
              className={`
                    w-full md:w-auto px-8 py-3.5 rounded-full text-white font-bold font-lexend transition-all shadow-lg hover:shadow-xl hover:-translate-y-1
                    ${
                      processing
                        ? "bg-gray-300 cursor-not-allowed"
                        : isOwned
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-primary hover:bg-primary-dark"
                    }
                  `}
            >
              {processing
                ? "Memproses..."
                : isOwned
                  ? "Lanjut Belajar"
                  : course.price === 0
                    ? "Daftar Gratis Sekarang"
                    : "Beli Kelas Ini"}
            </button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MainLayout from "../components/templates/MainLayout";
import { transactionService } from "../services/transaction.service";

export default function PaymentPage() {
  const { transactionId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Ambil data dari state navigasi (dikirim dari CourseDetail)
  // Jika user refresh halaman, data ini akan hilang (undefined)
  const [transaction, setTransaction] = useState<any>(
    location.state?.transactionData || null,
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Jika data transaksi KOSONG (misal user refresh page), ambil dari API berdasarkan ID di URL
    if (!transaction && transactionId) {
      const fetchTransaction = async () => {
        setLoading(true);
        try {
          // Pastikan Anda sudah membuat method getTransactionById di service
          const result =
            await transactionService.getTransactionDetail(transactionId);

          // 🔥 NAH, DISINI KITA PAKAI setTransaction
          setTransaction(result.data || result);
        } catch (error) {
          console.error("Gagal mengambil data transaksi:", error);
          alert("Data transaksi tidak ditemukan.");
          navigate("/dashboard");
        } finally {
          setLoading(false);
        }
      };
      fetchTransaction();
    }
  }, [transactionId, transaction, navigate]);

  const handlePay = () => {
    if (!transaction || !transaction.snapToken) {
      alert("Token pembayaran tidak ditemukan. Silakan ulangi pembelian.");
      return;
    }

    // Panggil Snap Midtrans
    if (window.snap) {
      window.snap.pay(transaction.snapToken, {
        onSuccess: () => {
          alert("Pembayaran Berhasil!");
          navigate("/my-courses");
        },
        onPending: () => {
          alert("Menunggu pembayaran...");
          navigate("/transactions");
        },
        onError: (result: any) => {
          console.error("Error Result:", result);
          alert("Pembayaran Gagal.");
        },
        onClose: () => {
          // User closed popup without finishing payment
        },
      });
    } else {
      alert("Gagal memuat sistem pembayaran. Cek koneksi internet Anda.");
    }
  };

  // Format Rupiah
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          {/* Animasi Spinner Sederhana */}
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 font-medium">Memuat data transaksi...</p>
        </div>
      </MainLayout>
    );
  }

  if (!transaction) {
    return (
      <MainLayout>
        <div className="p-20 text-center">
          <h2 className="text-xl font-bold mb-2">
            Data Transaksi Tidak Ditemukan
          </h2>
          <p className="text-gray-500 mb-4">Mungkin Anda merefresh halaman?</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-primary underline"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-10 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center border border-gray-100">
          {/* ICON KARTU */}
          <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
            💳
          </div>

          <h1 className="text-2xl font-bold font-lexend text-gray-900 mb-2">
            Selesaikan Pembayaran
          </h1>

          <div className="bg-gray-50 p-4 rounded-xl mb-6 text-left">
            <p className="text-xs text-gray-500 uppercase font-bold mb-1">
              Order ID
            </p>
            <p className="font-mono text-gray-700 text-sm mb-3 truncate">
              {transaction.orderId}
            </p>

            <p className="text-xs text-gray-500 uppercase font-bold mb-1">
              Total Tagihan
            </p>
            <p className="text-xl font-bold text-primary">
              {formatPrice(transaction.amount)}
            </p>
          </div>

          <button
            onClick={handlePay}
            className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all shadow-lg hover:shadow-primary/30"
          >
            Bayar Sekarang (Midtrans)
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-4 text-sm text-gray-400 hover:text-gray-600 font-medium"
          >
            Batalkan
          </button>
        </div>
      </div>
    </MainLayout>
  );
}

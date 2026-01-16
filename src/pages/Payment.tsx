import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/templates/DashboardLayout'; // Atau MainLayout

export default function Payment() {
  const { transactionId } = useParams();
  const navigate = useNavigate();

  const handlePay = () => {
    // NANTI: Di sini logic memanggil Snap.js dari Midtrans
    alert(`Membuka Midtrans untuk Transaksi ID: ${transactionId}`);
  };

  return (
    <DashboardLayout>
      <div className="max-w-xl mx-auto py-20 text-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
            💳
          </div>
          <h1 className="text-2xl font-bold font-lexend text-gray-900 mb-2">
            Selesaikan Pembayaran
          </h1>
          <p className="text-gray-500 mb-8">
            Order ID: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{transactionId}</span>
          </p>
          
          <div className="space-y-3">
            <button 
              onClick={handlePay}
              className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors"
            >
              Bayar Sekarang (Midtrans)
            </button>
            <button 
              onClick={() => navigate('/transactions')}
              className="w-full py-3 text-gray-500 font-medium hover:text-gray-900"
            >
              Cek Riwayat Transaksi
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
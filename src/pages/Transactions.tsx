import { useEffect, useState } from "react";
import DashboardLayout from "../components/templates/DashboardLayout";
import { transactionService } from "../services/transaction.service";

interface Transaction {
  _id: string;
  orderId: string;
  amount: number;
  status: "pending" | "success" | "failed" | "challenge";
  snapToken?: string;
  createdAt: string;
  course: {
    title: string;
    slug: string;
    thumbnail: string;
  };
}

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      const response = await transactionService.getMyTransactions();

      const transactions = response.data.data || response.data || [];

      setTransactions(transactions);
    } catch (err) {
      console.error("❌ Error fetching transactions:", err);
      setError("Gagal memuat riwayat transaksi.");
    } finally {
      setLoading(false);
    }
  };

  const formatIDR = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "failed":
      case "deny":
      case "expire":
      case "cancel":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleContinuePayment = (snapToken: string) => {
    if (window.snap) {
      window.snap.pay(snapToken, {
        onSuccess: () => {
          alert("Pembayaran Berhasil!");
          fetchTransactions();
        },
        onPending: () => alert("Menunggu pembayaran..."),
        onError: () => alert("Pembayaran gagal!"),
        onClose: () => alert("Anda menutup popup pembayaran."),
      });
    } else {
      alert("Sistem pembayaran belum siap. Silakan refresh halaman.");
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold font-lexend">Riwayat Transaksi</h1>
        <button
          onClick={fetchTransactions}
          className="text-sm text-primary hover:underline"
        >
          Refresh Data
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading && (
          <div className="p-8 text-center text-gray-500">
            Memuat data transaksi...
          </div>
        )}

        {!loading && error && (
          <div className="p-8 text-center text-red-500">{error}</div>
        )}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-900 font-bold border-b border-gray-100">
                <tr>
                  <th className="p-4 whitespace-nowrap">ID Order</th>
                  <th className="p-4">Kursus</th>
                  <th className="p-4">Tanggal</th>
                  <th className="p-4">Harga</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td className="p-8 text-center text-gray-400" colSpan={6}>
                      Belum ada transaksi yang dilakukan.
                    </td>
                  </tr>
                ) : (
                  transactions.map((trx) => (
                    <tr
                      key={trx._id}
                      className="border-b border-gray-50 last:border-none hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4 font-mono text-xs font-medium text-gray-500">
                        {trx.orderId}
                      </td>
                      <td className="p-4 font-medium text-gray-900">
                        {trx.course ? trx.course.title : "Kursus dihapus"}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        {formatDate(trx.createdAt)}
                      </td>
                      <td className="p-4 font-medium">
                        {formatIDR(trx.amount)}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(trx.status)}`}
                        >
                          {trx.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4">
                        {trx.status === "pending" && trx.snapToken && (
                          <button
                            onClick={() =>
                              handleContinuePayment(trx.snapToken!)
                            }
                            className="px-3 py-1 bg-primary text-white text-xs rounded hover:bg-primary/90 transition"
                          >
                            Bayar
                          </button>
                        )}
                        {trx.status === "success" && (
                          <span className="text-xs text-green-600 font-medium">
                            Lunas
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

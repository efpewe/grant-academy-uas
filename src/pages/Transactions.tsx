import DashboardLayout from '../components/templates/DashboardLayout';

export default function Transactions() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold font-lexend mb-4">Riwayat Transaksi</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-900 font-bold border-b border-gray-100">
            <tr>
              <th className="p-4">ID Transaksi</th>
              <th className="p-4">Kursus</th>
              <th className="p-4">Tanggal</th>
              <th className="p-4">Harga</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 text-center py-8" colSpan={5}>Belum ada transaksi</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
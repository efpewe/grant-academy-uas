import DashboardLayout from '../components/templates/DashboardLayout';

export default function MyCourses() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold font-lexend mb-4">Kelas Saya</h1>
      <div className="p-10 text-center bg-white rounded-xl border border-dashed border-gray-300">
        <p className="text-gray-500">Anda belum mengikuti kelas apapun.</p>
        {/* Nanti di sini kita fetch data enrolledCourses dari user */}
      </div>
    </DashboardLayout>
  );
}
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/templates/DashboardLayout";
import { useAuth } from "../../contexts/AuthContext";
import { courseService, type Course } from "../../services/course.service";

export default function MentorDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const response = await courseService.getAllCourses();

        const myCourses = response.data.filter((c: any) => {
          const mentorId = c.mentor?._id || c.mentor;
          return mentorId === user?._id;
        });

        setCourses(myCourses);
      } catch (error) {
        console.error("Gagal load data mentor", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchMyCourses();
    }
  }, [user]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold font-lexend text-gray-900">
            Studio Creator
          </h1>
          <p className="text-gray-500 text-sm">
            Kelola kursus dan pantau perkembangan siswamu.
          </p>
        </div>
        <Link
          to="/mentor/create-course"
          className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2"
        >
          <span>+</span> Buat Kursus
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="text-gray-500 text-sm font-medium mb-1">
            Total Kursus
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {courses.length}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="text-gray-500 text-sm font-medium mb-1">
            Total Siswa
          </div>
          <div className="text-3xl font-bold text-gray-900">0</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="text-gray-500 text-sm font-medium mb-1">
            Pendapatan
          </div>
          <div className="text-3xl font-bold text-primary">Rp 0</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-lg font-lexend">Daftar Kursus Saya</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold tracking-wider">
              <tr>
                <th className="p-5">Kursus</th>
                <th className="p-5">Harga</th>
                <th className="p-5">Kategori</th>
                <th className="p-5 text-center">Materi</th>
                <th className="p-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center">
                    Loading data...
                  </td>
                </tr>
              ) : courses.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    Belum ada kursus dibuat.
                  </td>
                </tr>
              ) : (
                courses.map((course) => (
                  <tr
                    key={course._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={course.thumbnail}
                          alt=""
                          className="w-12 h-8 object-cover rounded"
                        />
                        <span className="font-bold text-gray-900 line-clamp-1 max-w-[200px]">
                          {course.title}
                        </span>
                      </div>
                    </td>
                    <td className="p-5 font-medium">
                      {formatPrice(course.price)}
                    </td>
                    <td className="p-5">
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs font-bold text-gray-600">
                        {course.category}
                      </span>
                    </td>
                    <td className="p-5 text-center">
                      <span className="text-gray-500 font-medium">
                        {course.lessons?.length || 0} Materi
                      </span>
                    </td>
                    <td className="p-5 text-right space-x-2">
                      <button
                        onClick={() =>
                          navigate(`/mentor/course/${course._id}/add-lesson`)
                        }
                        className="text-green-600 hover:text-green-700 font-bold text-xs bg-green-50 hover:bg-green-100 border border-green-200 px-3 py-1.5 rounded-lg transition-all"
                      >
                        + Materi
                      </button>

                      <button className="text-blue-600 hover:underline font-medium text-sm">
                        Edit
                      </button>
                      <button className="text-red-500 hover:underline font-medium text-sm">
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

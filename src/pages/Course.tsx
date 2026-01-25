import { useEffect, useState } from "react";
import { courseService, type Course } from "../services/course.service";
import CourseCard from "../components/molecules/CourseCard";
import MainLayout from "../components/templates/MainLayout";

export default function Course() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await courseService.getAllCourses();
        setCourses(response.data);
      } catch (error) {
        console.error("Gagal mengambil data kursus", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <MainLayout>
      <div className="w-[90%] max-w-[1140px] mx-auto mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-lexend text-gray-900 mb-4">
            Eksplorasi Kelas <span className="text-primary">Terbaik</span>
          </h1>
          <p className="text-gray-500 font-lexend max-w-2xl mx-auto">
            Tingkatkan keahlianmu dengan berbagai pilihan kelas yang disusun
            oleh para ahli industri.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-100 h-[400px] rounded-xl animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((item) => (
              <CourseCard key={item._id} course={item} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

import { useEffect, useState } from "react";
import MainLayout from "../components/templates/MainLayout";
import SectionTitle from "../components/atoms/SectionTitle";
import CourseCard from "../components/molecules/CourseCard";
import FeatureItem from "../components/molecules/FeatureItem";
import HeroSection from "../components/organisms/HeroSection";

import { courseService, type Course } from "../services/course.service";

export default function Home() {
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await courseService.getAllCourses();
        setFeaturedCourses(response.data.slice(0, 3));
      } catch (error) {
        console.error("Gagal memuat kursus unggulan", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <MainLayout>
      <HeroSection />
      <section className="py-[80px] bg-white">
        <div className="w-[90%] max-w-[1140px] mx-auto mx-auto px-4">
          <SectionTitle>Kursus Unggulan Kami</SectionTitle>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-gray-100 rounded-xl h-[400px] animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
              {featuredCourses.length > 0 ? (
                featuredCourses.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))
              ) : (
                <div className="col-span-3 text-center text-gray-400 py-10 font-lexend">
                  Belum ada kursus unggulan saat ini.
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="py-[80px]">
        <div className="w-[90%] max-w-[1140px] mx-auto mx-auto px-4">
          <SectionTitle>Mengapa Grant Academy?</SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[40px]">
            <FeatureItem
              icon="🎓"
              title="Instruktur Ahli"
              description="Belajar langsung dari praktisi yang berpengalaman di bidangnya."
            />
            <FeatureItem
              icon="⚡"
              title="Materi Terupdate"
              description="Kurikulum kami selalu disesuaikan dengan kebutuhan teknologi terbaru."
            />
            <FeatureItem
              icon="💼"
              title="Siap Kerja"
              description="Dengan portofolio dan studi kasus nyata, Anda siap bersaing."
            />
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

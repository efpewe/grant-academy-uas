import { Link } from "react-router-dom";
import { type Course } from "../../services/course.service";

interface CourseCardProps {
  course: Course;
  href?: string; // Opsional: Custom Link
  ctaText?: string; // Opsional: Custom Text Tombol
}

export default function CourseCard({ course, href, ctaText }: CourseCardProps) {
  // Logic: Jika ada href custom (misal dari MyCourses), pakai itu.
  // Jika tidak, default ke halaman detail (/course/slug).
  const linkTarget = href ? href : course.slug ? `/course/${course.slug}` : "#";

  // Format Rupiah
  const formatPrice = (price: number) => {
    return price === 0
      ? "Gratis"
      : new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(price);
  };

  return (
    <Link
      to={linkTarget}
      className="block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group border border-gray-100 h-full flex flex-col"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
          {course.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
          {course.title}
        </h3>

        <div className="flex items-center gap-2 mb-4 mt-auto">
          <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
            {/* Avatar placeholder */}
            <img
              src={`https://ui-avatars.com/api/?name=${course.mentor?.fullName}&background=random`}
              alt=""
            />
          </div>
          <p className="text-sm text-gray-500 truncate">
            {course.mentor?.fullName || "Mentor"}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <span className="font-bold text-gray-900">
            {formatPrice(course.price)}
          </span>
          <span className="text-sm font-bold text-primary bg-primary/5 px-3 py-1.5 rounded-lg group-hover:bg-primary group-hover:text-white transition-all">
            {ctaText || "Lihat Detail"} {/* Teks dinamis */}
          </span>
        </div>
      </div>
    </Link>
  );
}

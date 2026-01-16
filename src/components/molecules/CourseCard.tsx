import { Link } from 'react-router-dom';
// Pastikan path import ini benar sesuai struktur folder Anda
import {type Course } from '../../services/course.service'; 

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  // PENGAMAN: Cek apakah slug ada. Jika tidak, fallback ke '#' atau string kosong
  // Ini mencegah error /undefined
  const linkTarget = course.slug ? `/course/${course.slug}` : '#';

  return (
    <Link 
      to={linkTarget} // <--- PERBAIKAN DI SINI
      className="block bg-white rounded-xl overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 group h-full flex flex-col"
    >
      {/* Gambar Thumbnail */}
      <div className="relative h-[200px] overflow-hidden">
        <img 
          src={course.thumbnail || 'https://via.placeholder.com/400x250?text=No+Image'} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
      </div>

      <div className="p-[25px] flex flex-col flex-grow">
        {/* Badge Category */}
        <div className="mb-[15px]">
          <span className="inline-block px-3 py-1 rounded-full text-[12px] font-semibold font-lexend uppercase tracking-wider bg-primary/10 text-primary">
            {course.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-[10px] font-lexend group-hover:text-primary transition-colors line-clamp-2">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-[15px] text-gray-500 leading-relaxed mb-5 font-inter line-clamp-3 flex-grow">
          {course.description}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
            <span className="text-sm font-bold text-gray-400">
                {course.level}
            </span>
            <div className="text-[15px] font-bold font-lexend text-primary flex items-center">
            Lihat Detail <span className="ml-1">→</span>
            </div>
        </div>
      </div>
    </Link>
  );
}
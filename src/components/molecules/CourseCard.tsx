import { Link } from 'react-router-dom';
import Badge from '../atoms/Badge'; 
import {type Course } from '../../services/course.service';

interface CourseCardProps {
  course: Course;
}

export default ({ course }: CourseCardProps) => {
  return (
    <Link 
      to={`/course/${course.slug}`}
      className="block bg-white rounded-xl overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 group h-full flex flex-col"
    >
      <div className="relative h-[200px] overflow-hidden">
        <img 
          src={course.thumbnail || 'https://via.placeholder.com/400x250?text=No+Image'} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
      </div>

      <div className="p-[25px] flex flex-col flex-grow">
        <div className="mb-[15px]">
          <Badge text={course.category} />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-[10px] font-lexend group-hover:text-primary transition-colors line-clamp-2">
          {course.title}
        </h3>

        <p className="text-[15px] text-gray-500 leading-relaxed mb-5 font-inter line-clamp-3 flex-grow">
          {course.description}
        </p>

        <div className="text-[15px] font-bold font-lexend text-primary mt-auto">
          Lihat Detail <span className="ml-1 transition-transform group-hover:translate-x-1 inline-block">→</span>
        </div>
      </div>
    </Link>
  );
}
import { Link } from 'react-router-dom';
import Badge from '../atoms/Badge';

interface NewsCardProps {
  image: string;
  category: string;
  title: string;
  description: string;
  link: string;
  date?: string;
}

export default function NewsCard({ image, category, title, description, link, date }: NewsCardProps) {
  return (
    <Link 
      to={link} 
      className="block bg-white rounded-xl overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 group h-full flex flex-col"
    >
      <div className="relative h-[220px] overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        {date && (
          <div className="absolute bottom-0 left-0 bg-white/90 px-4 py-2 text-xs font-bold font-lexend text-gray-800 rounded-tr-lg">
            {date}
          </div>
        )}
      </div>

      <div className="p-[25px] flex flex-col flex-grow">
        <div className="mb-[15px]">
          <Badge text={category} />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-[10px] font-lexend group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>

        <p className="text-[15px] text-gray-500 leading-relaxed mb-5 font-inter line-clamp-3 flex-grow">
          {description}
        </p>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center text-primary font-bold font-lexend text-[15px]">
          Baca Selengkapnya 
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
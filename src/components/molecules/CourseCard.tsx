import Badge from '../atoms/Badge';

interface CourseCardProps {
  image: string;
  category: string;
  title: string;
  description: string;
  link: string;
}

export default ({ image, category, title, description, link }: CourseCardProps) => {
  return (
    <a 
      href={link} 
      className="block bg-white rounded-xl overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 group"
    >
      <img src={image} alt={title} className="w-full h-[200px] object-cover" />
      <div className="p-[25px]">
        <Badge text={category} />
        <h3 className="text-xl font-bold text-dark mb-[10px] font-lexend group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-[15px] text-grey leading-relaxed mb-5 font-inter">
          {description}
        </p>
        <div className="text-[15px] font-bold font-lexend text-primary">
          Lihat Detail
        </div>
      </div>
    </a>
  );
}
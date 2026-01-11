import { Link } from "react-router-dom";

interface TeamMemberCardProps {
  image: string;
  name: string;
  role: string;
  link: string;
}

export default ({ image, name, role, link }: TeamMemberCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.07)] p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] group">
      <Link to={link} className="block">
        <img 
          src={image} 
          alt={`Foto ${name}`} 
          className="w-[150px] h-[150px] rounded-full object-cover mx-auto mb-5 border-4 border-[#f0f0f0]" 
        />
        <h3 className="text-[20px] text-dark font-bold font-lexend mb-[5px] group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-[15px] text-primary font-medium font-inter">
          {role}
        </p>
      </Link>
    </div>
  );
}
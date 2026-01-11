import {type ReactNode} from 'react';
interface FeatureItemProps {
  icon: string | ReactNode;
  title: string;
  description: string;
}

export default ({ icon, title, description }: FeatureItemProps) => {
  return (
    <div className="text-center">
      <span className="block text-5xl mb-5 text-dark font-lexend">{icon}</span>
      <h3 className="text-[22px] font-bold text-dark mb-[10px] font-lexend">
        {title}
      </h3>
      <p className="text-base text-grey font-inter">
        {description}
      </p>
    </div>
  );
};
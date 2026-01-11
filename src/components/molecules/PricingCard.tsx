import { Link } from 'react-router-dom'
import Button from '../atoms/Button'
import ButtonOutline from '../atoms/ButtonOutline'

interface PricingCardProps {
  title: string
  price: string
  duration: string
  features: string[]
  isFeatured: boolean
  buttonText: string
}

export default ({ title, price, duration, features, isFeatured, buttonText }: PricingCardProps) => {
  return (
    <div 
      className={`
        bg-white rounded-xl p-[40px] text-center border-[3px] transition-all duration-300
        ${isFeatured 
          ? 'border-primary transform scale-100 md:scale-105 shadow-[0_10px_40px_rgba(194,87,128,0.2)] relative z-10' 
          : 'border-transparent shadow-[0_4px_25px_rgba(0,0,0,0.07)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)]'
        }
      `}
    >
      {isFeatured && (
        <span className="absolute -top-[15px] left-1/2 -translate-x-1/2 bg-primary text-white py-[5px] px-[15px] rounded-[20px] text-xs font-bold">
          Best Seller
        </span>
      )}

      <h3 className="text-[24px] text-dark mb-[10px] font-lexend font-bold">
        {title}
      </h3>
      
      <p className="text-[38px] font-extrabold text-primary mb-[5px] font-lexend">
        {price}
      </p>
      
      <p className="text-[15px] text-grey mb-[25px] font-inter">
        {duration}
      </p>
      
      <ul className="list-none mb-[30px] space-y-[12px]">
        {features.map((feature, idx) => (
          <li key={idx} className="text-[16px] text-grey font-inter">
            {feature}
          </li>
        ))}
      </ul>
      
      <Link to="#">
        {isFeatured ? (
          <Button className="w-full">{buttonText}</Button>
        ) : (
          <ButtonOutline className="w-full">{buttonText}</ButtonOutline>
        )}
      </Link>
    </div>
  )
}
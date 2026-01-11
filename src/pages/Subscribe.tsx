import MainLayout from '../components/templates/MainLayout'
import PageHeader from '../components/atoms/PageHeader'
import PricingCard from '../components/molecules/PricingCard'
import { pricingData } from '../data/pricing'

export default () => {
  return (
    <MainLayout>
      <PageHeader>Pilih Paket Terbaik Anda</PageHeader>
      
      <section className="pb-[80px]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px] items-center">
            {pricingData.map((pkg) => (
              <PricingCard 
                key={pkg.id}
                title={pkg.title}
                price={pkg.price}
                duration={pkg.duration}
                features={pkg.features}
                isFeatured={pkg.isFeatured}
                buttonText={pkg.buttonText}
              />
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
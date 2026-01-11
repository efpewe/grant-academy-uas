import MainLayout from '../components/templates/MainLayout'
import SectionTitle from '../components/atoms/SectionTitle'
import CourseCard from '../components/molecules/CourseCard'
import { newsData } from '../data/news'

export default () => {
  return (
    <MainLayout>
      <section className="py-[80px] bg-white">
        <div className="container">
          <SectionTitle>Berita & Acara</SectionTitle>
          
          <p className="text-center -mt-[20px] mb-[40px] text-grey font-inter text-[16px]">
             Ikuti perkembangan terbaru, acara, dan tips dari Grant Academy.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
             {newsData.map((item) => (
               <CourseCard 
                 key={item.id}
                 image={item.image}
                 category={item.category}
                 title={item.title}
                 description={item.description}
                 link={item.link}
               />
             ))}
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
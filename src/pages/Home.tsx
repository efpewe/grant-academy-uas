import MainLayout from '../components/templates/MainLayout'
import SectionTitle from '../components/atoms/SectionTitle'
import CourseCard from '../components/molecules/CourseCard'
import FeatureItem from '../components/molecules/FeatureItem'
import HeroSection from '../components/organisms/HeroSection'

import bsThumb from '../assets/bootstrap-thumnail.png'
import jsThumb from '../assets/js-thumnail.png'
import htmlThumb from '../assets/html-css-thumnail.png'

export default () => {
  return (
    <MainLayout>
      
      <HeroSection />

      <section className="py-[80px] bg-white">
        <div className="container">
          <SectionTitle>Kursus Unggulan Kami</SectionTitle>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
            <CourseCard 
              image={bsThumb}
              category="Front-End"
              title="Mastering Bootstrap 5"
              description="Buat website responsif profesional dengan cepat tanpa repot."
              link="/course/bootstrap"
            />
            <CourseCard 
              image={jsThumb}
              category="Programming"
              title="JavaScript Modern (ES6+)"
              description="Fundamental JavaScript dari dasar hingga mahir untuk DOM dan API."
              link="/course/javascript"
            />
            <CourseCard 
              image={htmlThumb}
              category="Dasar Web"
              title="HTML5 & CSS3 Lengkap"
              description="Struktur dan styling fundamental yang wajib dikuasai setiap developer."
              link="/course/html-css"
            />
          </div>
        </div>
      </section>

      <section className="py-[80px]">
        <div className="container">
          <SectionTitle>Mengapa Grant Academy?</SectionTitle>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[40px]">
            <FeatureItem 
              icon="🎓"
              title="Instruktur Ahli"
              description="Belajar langsung dari mahasiswa yang berpengalaman di bidangnya."
            />
            <FeatureItem 
              icon="⚡"
              title="Materi Terupdate"
              description="Kurikulum kami selalu disesuaikan dengan kebutuhan teknologi terbaru."
            />
            <FeatureItem 
              icon="💼"
              title="Siap Kerja"
              description="Dengan portofolio dan studi kasus nyata, Anda siap bersaing."
            />
          </div>
        </div>
      </section>

    </MainLayout>
  )
}
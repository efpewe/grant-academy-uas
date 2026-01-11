import { useParams, Link } from 'react-router-dom'
import MainLayout from '../components/templates/MainLayout'
import Badge from '../components/atoms/Badge'
import Button from '../components/atoms/Button'
import { courses } from '../data/courses'

export default () => {
  const { id } = useParams()
  const course = courses.find((c) => c.id === id)

  if (!course) {
    return (
      <MainLayout>
        <div className="container py-20 text-center">
          <h2 className="text-2xl font-bold">Kursus tidak ditemukan</h2>
          <Link to="/course" className="text-primary mt-4 block">Kembali ke Daftar Kursus</Link>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <section className="bg-[#f9f9f9] text-center pt-[64px] pb-[32px]">
        <div className="container flex flex-col items-center">
          <Badge text={course.category} />
          <h1 className="text-[32px] md:text-[48px] font-bold font-lexend text-dark mb-4 leading-tight">
            {course.title}
          </h1>
          <p className="text-[18px] text-grey font-inter max-w-[700px]">
            {course.subtitle}
          </p>
          <img 
            src={course.image} 
            alt={course.title} 
            className="w-full max-w-[700px] rounded-lg mt-8 shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
          />
        </div>
      </section>

      <section className="pb-[80px] -mt-10 md:-mt-0">
        <div className="container">
          <div className="max-w-[800px] mx-auto bg-white p-6 md:p-8 rounded-xl md:shadow-none">
            
            <div className="mb-8">
              <h2 className="text-[2rem] font-bold font-lexend text-dark mb-4">Deskripsi Kursus</h2>
              <p className="text-[16px] text-[#5c5c5c] font-inter leading-[1.7]">
                {course.description}
              </p>
            </div>

            <div className="bg-primary-light/30 p-6 rounded-lg mb-8">
              <h2 className="text-[24px] font-bold font-lexend text-dark mb-6">Apa yang Akan Dipelajari?</h2>
              <ul className="space-y-4">
                {course.modules.map((modul, idx) => (
                  <li key={idx} className="flex items-start text-[1.1rem] text-dark font-inter">
                    <span className="mr-3 text-primary font-bold text-xl leading-none">✓</span>
                    {modul}
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center md:text-left">
                <Link to="/subscribe">
                    <Button>DAFTAR SEKARANG</Button>
                </Link>
            </div>

          </div>
        </div>
      </section>
    </MainLayout>
  )
}
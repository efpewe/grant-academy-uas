import MainLayout from '../components/templates/MainLayout'
import PageHeader from '../components/atoms/PageHeader'
import CourseCard from '../components/molecules/CourseCard'
import { courses } from '../data/courses'

export default () => {
  return (
    <MainLayout>
      <PageHeader>Semua Kursus</PageHeader>
      
      <section className="pb-[80px]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
            {courses.map((course) => (
              <CourseCard 
                key={course.id}
                image={course.image}
                category={course.category}
                title={course.title}
                description={course.subtitle}
                link={`/course/${course.id}`} 
              />
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
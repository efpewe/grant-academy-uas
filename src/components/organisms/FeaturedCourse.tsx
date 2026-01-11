import CourseCard from "../molecules/CourseCard"
export default () => {
  return (
    <section className="bg-white px-0 py-[80px]">
            <div className="w-[90%] max-w-[1140px] my-0 mx-auto">
                <h2 className="text-[36px] font-bold text-[#333] text-center mb-[50px]">Kursus Unggulan Kami</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">      
                <CourseCard image="assets/bootstrap-thumnail.png" category="Front-End" title="Mastering Bootstrap 5" description="Buat website responsif profesional dengan cepat tanpa repot"/>
                <CourseCard image="assets/js-thumnail.png" category="Programming" title="JavaScript Modern (ES6+)" description="Fundamental JavaScript dari dasar hingga mahir untuk DOM dan API."/>
                <CourseCard image="assets/html-css-thumnail.png" category="Dasar Web" title="HTML5 & CSS3 Lengkap" description="Struktur dan styling fundamental yang wajib dikuasai setiap developer."/>
                </div>
            </div>
        </section>
  )
}
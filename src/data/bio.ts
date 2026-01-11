import gybertImg from '../assets/gybert.png'
import ryanImg from '../assets/ryan.png'
import ferImg from '../assets/fer.png'
import jasonImg from '../assets/jason.png'

export const bioData: Record<string, any> = {
  gybert: {
    name: 'Gybert',
    role: 'Founder & CEO',
    img: gybertImg,
    about: 'Halo! Saya Gybert, pendiri sekaligus CEO dari Grant Academy. Saya membangun platform ini berdasarkan keyakinan bahwa pendidikan teknologi berkualitas harus dapat diakses oleh siapa saja. Saya memiliki hasrat untuk memberdayakan individu melalui keterampilan digital agar mereka siap bersaing di industri.',
    about2: 'Saya bertanggung jawab atas visi, strategi, dan arah pengembangan Grant Academy agar tetap relevan dengan kebutuhan pasar.',
    skills: ['Product Management', 'Business Strategy', 'UI/UX Design Principles'],
    socials: [
      { label: 'LinkedIn', url: '#' },
      { label: 'GitHub', url: '#' },
    ]
  },
  ryan: {
    name: 'Ryan',
    role: 'Lead Instructor (Mentor)',
    img: ryanImg,
    about: 'Saya Ryan, Lead Instructor di Grant Academy. Tugas utama saya adalah memastikan bahwa setiap siswa mendapatkan pengalaman belajar terbaik. Saya membimbing para mentor lain dan bertanggung jawab atas kualitas pengajaran di semua kursus.',
    about2: 'Saya percaya bahwa mentor yang baik tidak hanya mengajar, tetapi juga menginspirasi. Saya fokus pada materi JavaScript Modern dan React JS.',
    skills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React JS', 'Mentoring'],
    socials: [
      { label: 'LinkedIn', url: '#' },
      { label: 'GitHub', url: '#' }
    ]
  },
  fernando: {
    name: 'Fernando',
    role: 'Head of Curriculum (Mentor)',
    img: ferImg,
    about: 'Saya Fernando, Head of Curriculum. Peran saya adalah merancang alur belajar (learning path) dan materi kursus agar relevan, terstruktur, dan mudah dipahami oleh pemula. Saya memastikan bahwa setiap materi yang kami rilis sudah memenuhi standar industri.',
    about2: 'Saya berfokus pada fundamental web, memastikan pondasi siswa kuat sebelum melangkah ke teknologi yang lebih canggih.',
    skills: ['HTML5', 'CSS3', 'TypeScript', 'Tailwind CSS', 'React JS & Next.js', 'Node.js', 'Express.js'],
    socials: [
      { label: 'LinkedIn', url: '#' },
      { label: 'GitHub', url: '#' },
      { label: 'Portfolio', url: '#' }
    ]
  },
  jason: {
    name: 'Jason Kho',
    role: 'Data Science Instructor (Mentor)',
    img: jasonImg,
    about: 'Hai, saya Jason. Saya adalah mentor spesialis untuk bidang Data Science di Grant Academy. Saya membantu para siswa memahami dunia data, mulai dari pengumpulan, pembersihan, analisis, hingga visualisasi data.',
    about2: 'Dunia data sangat luas, dan tugas saya adalah menyederhanakannya menjadi konsep-konsep yang mudah dicerna menggunakan Python, Pandas, dan Numpy.',
    skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Mentoring'],
    socials: [
      { label: 'LinkedIn', url: '#' },
      { label: 'Kaggle', url: '#' }
    ]
  }
}
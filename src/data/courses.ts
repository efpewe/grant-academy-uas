import bsThumb from '../assets/bootstrap-thumnail.png'
import jsThumb from '../assets/js-thumnail.png'
import htmlThumb from '../assets/html-css-thumnail.png'
import reactThumb from '../assets/react-thumnail.png'
import nodeThumb from '../assets/nodejs-thumnail.png'
import pythonThumb from '../assets/python-thumnail.png'

export const courses = [
  {
    id: 'bootstrap',
    category: 'Front-End',
    title: 'Mastering Bootstrap 5',
    subtitle: 'Buat website responsif profesional dengan cepat tanpa repot.',
    image: bsThumb,
    description: 'Bootstrap 5 adalah framework front-end paling populer di dunia untuk membangun situs web yang responsif dan mobile-first. Dalam kursus ini, Anda akan belajar dari dasar cara kerja sistem grid Bootstrap, komponen-komponen siap pakai, hingga utilitas canggih untuk mempercepat pekerjaan Anda. Kita akan membangun sebuah proyek portfolio lengkap dari awal hingga akhir menggunakan Bootstrap 5.',
    modules: [
      'Memahami sistem Grid responsif (Container, Row, Col)',
      'Menggunakan komponen siap pakai seperti Navbar, Card, Modal, dan Carousel',
      'Menerapkan Utility classes untuk spacing, color, dan typography',
      'Membuat formulir yang modern dan interaktif',
      'Dasar kustomisasi Bootstrap dengan Sass (Opsional)',
      'Membangun proyek website portfolio dari nol'
    ]
  },
  {
    id: 'javascript',
    category: 'Programming',
    title: 'JavaScript Modern (ES6+)',
    subtitle: 'Fundamental JavaScript dari dasar hingga mahir untuk DOM dan API.',
    image: jsThumb,
    description: 'JavaScript adalah bahasa pemrograman yang wajib dikuasai oleh setiap web developer. Kursus ini akan membimbing Anda dari nol, mulai dari sintaks dasar, variabel, dan tipe data, hingga konsep modern ES6+ seperti Arrow Functions, Promises, dan Async/Await. Anda akan belajar cara memanipulasi DOM untuk membuat website interaktif dan cara mengambil data dari API eksternal.',
    modules: [
      'Sintaks Dasar: Variabel (var, let, const), Tipe Data, dan Operator',
      'Struktur Kontrol (If/Else, Loops) dan Fungsi',
      'DOM Manipulation (Mengubah HTML & CSS dengan JS)',
      'Event Handling (Click, Submit, Keyup)',
      'Konsep ES6+ (Arrow Functions, Destructuring, Spread/Rest)',
      'Asynchronous JavaScript (Promises dan Async/Await)',
      'Mengambil data dari API dengan Fetch API'
    ]
  },
  {
    id: 'html-css',
    category: 'Dasar Web',
    title: 'HTML5 & CSS3 Lengkap',
    subtitle: 'Struktur dan styling fundamental yang wajib dikuasai setiap developer.',
    image: htmlThumb,
    description: 'HTML dan CSS adalah pondasi dari semua halaman web. Tanpa pemahaman yang kuat tentang keduanya, Anda akan kesulitan membangun website yang baik. Kursus ini dirancang untuk pemula tanpa pengalaman coding sama sekali. Anda akan belajar tag HTML semantik (HTML5) untuk membangun struktur web yang kokoh dan SEO-friendly, kemudian beralih ke CSS3 untuk styling, layouting dengan Flexbox dan Grid.',
    modules: [
      'Struktur dasar dokumen HTML (Head, Body, Tags)',
      'Tag HTML5 Semantik (Header, Footer, Nav, Section, Article)',
      'Membuat Formulir, Tabel, dan menyisipkan Media',
      'Konsep Dasar CSS (Selector, Properti, Value)',
      'Box Model (Margin, Border, Padding)',
      'Layouting Modern dengan Flexbox',
      'Layouting Modern dengan CSS Grid',
      'Membuat Desain Responsif dengan Media Queries'
    ]
  },
  {
    id: 'react',
    category: 'Front-End',
    title: 'React JS: The Complete Guide',
    subtitle: 'Bangun aplikasi web interaktif dengan React.',
    image: reactThumb,
    description: 'Pelajari React JS dari dasar hingga mahir. Memahami konsep Components, Props, State, dan Hooks untuk membangun Single Page Application yang modern dan cepat.',
    modules: [
      'Pengenalan React & JSX',
      'Components & Props',
      'State Management & Event Handling',
      'React Hooks (useState, useEffect)',
      'React Router',
      'Deployment ke Vercel/Netlify'
    ]
  },
  {
    id: 'node',
    category: 'Back-End',
    title: 'Node.js & Express',
    subtitle: 'Membangun API server-side yang cepat dan efisien.',
    image: nodeThumb,
    description: 'Node.js memungkinkan Anda menjalankan JavaScript di sisi server. Digabungkan dengan Express.js, ini menjadi salah satu stack paling populer untuk membangun REST API. Kursus ini akan mengajarkan Anda cara membangun server dari nol, membuat rute API, terhubung ke database, dan mengelola otentikasi pengguna.',
    modules: [
      'Konsep Dasar Node.js (Module System, NPM)',
      'Membangun Server dengan Express.js',
      'Membuat REST API (CRUD Operations)',
      'Routing dan Middleware',
      'Terhubung ke Database (MongoDB dengan Mongoose)',
      'Otentikasi dan Otorisasi (JWT - JSON Web Tokens)',
      'Error Handling dan Best Practices'
    ]
  },
  {
    id: 'python',
    category: 'Data Science',
    title: 'Python untuk Data Science',
    subtitle: 'Analisis data dari dasar dengan Pandas dan Numpy.',
    image: pythonThumb,
    description: 'Mulai perjalanan Data Science Anda dengan Python. Pelajari cara mengolah, menganalisis, dan memvisualisasikan data menggunakan library populer seperti Pandas, NumPy, dan Matplotlib.',
    modules: [
      'Dasar Pemrograman Python',
      'Struktur Data Python (List, Dictionary, Tuple)',
      'NumPy untuk Komputasi Numerik',
      'Pandas untuk Analisis Data',
      'Visualisasi Data dengan Matplotlib',
      'Studi Kasus Analisis Data Sederhana'
    ]
  }
]
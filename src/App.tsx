import './home.css'
import Home from './pages/Home'
import About from './pages/About'
import { Routes, Route } from 'react-router-dom'
import BioDetail from './components/templates/BioDetail'
import Course from './pages/Course'
import CourseDetail from './pages/CourseDetail'
import News from './pages/News'
import ComingSoon from './pages/ComingSoon'
import NotFound from './pages/NotFound'
import Subscribe from './pages/Subscribe'
import Contact from './pages/Contact'
import Register from './pages/Register'
import Login from './pages/Login'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/bio/:id" element={<BioDetail />} />
      <Route path="/course" element={<Course />} />
      <Route path="/course/:id" element={<CourseDetail />} />
      <Route path="/news" element={<News />} />
      <Route path="/subscribe" element={<Subscribe />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/coming-soon" element={<ComingSoon />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  )
}

export default App

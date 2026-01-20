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
import Contact from './pages/Contact'
import Register from './pages/Register'
import Login from './pages/Login'
import Activation from './pages/Activation'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import MyCourses from './pages/MyCourse'
import Transactions from './pages/Transactions';
import Payment from './pages/Payment';
import MentorDashboard from './pages/mentor/MentorDashboard'
import CreateCourse from './pages/mentor/CreateCourse'
import AddLesson from './pages/mentor/AddLesson'
import CoursePlayer from './pages/CoursePlayer';
function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/bio/:id" element={<BioDetail />} />
      <Route path="/course" element={<Course />} />
      <Route path="/news" element={<News />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/coming-soon" element={<ComingSoon />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/auth/activation" element={<Activation />} />
      <Route path="/course/:slug" element={<CourseDetail />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/learn/:courseSlug" element={<CoursePlayer />} />
        <Route path="/learn/:courseSlug/:lessonSlug" element={<CoursePlayer />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/payment/:transactionId" element={<Payment />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/mentor/dashboard" element={<MentorDashboard />} />
        <Route path="/mentor/create-course" element={<CreateCourse />} />
        <Route path="/mentor/course/:courseId/add-lesson" element={<AddLesson />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  )
}

export default App

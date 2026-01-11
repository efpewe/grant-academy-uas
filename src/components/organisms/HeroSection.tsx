import { Link } from 'react-router-dom'
import Button from '../atoms/Button'

// Assets
import gybertImg from '../../assets/gybert.png'
import htmlIcon from '../../assets/html.png'
import cssIcon from '../../assets/css.png'
import jsIcon from '../../assets/js.png'
import reactIcon from '../../assets/react.png'
import nodeIcon from '../../assets/nodejs.png'
import pythonIcon from '../../assets/python.png'

export default () => {
  const techStack = [htmlIcon, cssIcon, jsIcon, reactIcon, nodeIcon, pythonIcon]

  return (

    <section className="relative pt-[50px] pb-[100px] md:pt-0 md:pb-0 bg-[linear-gradient(110deg,#f7f5f7_50%,#fdf9fb_100%)] overflow-hidden md:min-h-[600px] flex items-center">
      
      <div className="container flex flex-col md:flex-row items-center relative gap-5 z-10">
        
        <div className="md:w-[60%] w-full text-center md:text-left flex flex-col items-center md:items-start">
          <h1 className="text-[29px] md:text-5xl font-extrabold font-lexend text-dark leading-[1.3] mb-5 max-w-[650px]">
            ILMU ADALAH SALAH SATU ANUGERAH YANG DAPAT DIMILIKI MANUSIA!
          </h1>
          <p className="text-lg md:text-[20px] text-grey font-inter mb-10 font-normal">
            AKSES ILMU TERLENGKAP HANYA DI <span className="text-primary font-bold">GRANT ACADEMY</span>
          </p>
          
          <Link to="/course">
            <Button>LIHAT COURSE</Button>
          </Link>

          <div className="mt-[70px] md:mt-[60px]">
            <h4 className="text-base font-semibold text-grey mb-5 font-lexend text-center md:text-left">
              Materi Tersedia:
            </h4>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
              {techStack.map((icon, idx) => (
                <div key={idx} className="w-[50px] hover:scale-110 transition-transform">
                  <img src={icon} alt="tech" className="w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="md:w-[40%]"></div>
      </div>

      <div className="hidden md:block absolute bottom-0 md:right-0 lg:right-30 w-[500px] max-w-[50%] z-0 pointer-events-none">
          <img 
            src={gybertImg} 
            alt="Maskot Grant Academy" 
            className="w-full h-auto object-contain object-bottom drop-shadow-xl" 
          />
      </div>
    </section>
  )
}
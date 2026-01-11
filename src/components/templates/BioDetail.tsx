import { useParams, Link } from 'react-router-dom'
import MainLayout from '../templates/MainLayout'
import Button from '../atoms/Button'
import { bioData } from '../../data/bio'

export default () => {
  const { id } = useParams<{ id: string }>()
  const person = bioData[id || '']

  if (!person) {
    return (
      <MainLayout>
        <div className="min-h-[50vh] flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Member tidak ditemukan</h2>
          <Link to="/about"><Button>Kembali ke About</Button></Link>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
        <section className="bg-[#f9f9f9] py-[64px]">
            <div className="container flex flex-col md:flex-row items-center gap-[32px] md:pl-[130px]">
                
                <div className="flex-shrink-0">
                    <img 
                        src={person.img} 
                        alt={person.name} 
                        className="w-[170px] h-[170px] md:w-[200px] md:h-[200px] rounded-full object-cover border-[5px] border-white shadow-[0_5px_15px_rgba(0,0,0,0.1)]"
                    />
                </div>

                <div className="text-center md:text-left">
                    <h1 className="text-[3rem] font-bold font-lexend text-dark leading-tight m-0">
                        {person.name}
                    </h1>
                    <p className="text-[1.5rem] text-primary font-medium font-inter m-0">
                        {person.role}
                    </p>
                </div>
            </div>
        </section>

        <div className="max-w-[900px] mx-auto py-[32px] px-6 md:px-0">
            
            <div className="mb-[2.5rem] text-justify">
                <h2 className="text-[2rem] font-bold font-lexend text-dark border-b-2 border-[#f0f0f0] pb-2 mb-4">
                    Tentang Saya
                </h2>
                <p className="font-inter text-[1rem] leading-[1.7] text-dark mb-4">
                    {person.about}
                </p>
                {person.about2 && (
                    <p className="font-inter text-[1rem] leading-[1.7] text-dark mb-4">
                        {person.about2}
                    </p>
                )}
            </div>

            <div className="mb-[2.5rem] text-justify">
                <h2 className="text-[2rem] font-bold font-lexend text-dark border-b-2 border-[#f0f0f0] pb-2 mb-4">
                    Keahlian
                </h2>
                <ul className="list-disc pl-[20px] space-y-2">
                    {person.skills.map((skill: string, idx: number) => (
                        <li key={idx} className="font-inter text-[1rem] leading-[1.7] text-dark">
                            {skill}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mb-[2.5rem]">
                <h2 className="text-[2rem] font-bold font-lexend text-dark border-b-2 border-[#f0f0f0] pb-2 mb-4">
                    Hubungi Saya
                </h2>
                <div className="flex gap-6">
                    {person.socials.map((social: any, idx: number) => (
                        <a 
                            key={idx} 
                            href={social.url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="font-inter text-[1rem] font-medium text-primary hover:underline hover:text-primary-dark transition-colors"
                        >
                            {social.label}
                        </a>
                    ))}
                </div>
            </div>

        </div>
    </MainLayout>
  )
}
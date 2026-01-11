import { Link } from 'react-router-dom'
import MainLayout from '../components/templates/MainLayout'
import Button from '../components/atoms/Button'

export default () => {
  return (
    <MainLayout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
        <h1 className="text-[100px] md:text-[150px] font-extrabold font-lexend text-primary leading-none opacity-20 select-none">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold font-lexend text-dark -mt-4 mb-4">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-lg text-grey font-inter mb-8 max-w-[500px]">
          Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>
        <Link to="/">
          <Button>KEMBALI KE HOME</Button>
        </Link>
      </div>
    </MainLayout>
  )
}
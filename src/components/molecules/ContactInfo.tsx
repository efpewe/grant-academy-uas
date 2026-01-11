export default () => {
  return (
    <div className="text-left">
      <h2 className="text-[28px] text-dark mb-[20px] font-lexend font-bold">
        Informasi Kontak
      </h2>
      <p className="text-[16px] text-[#5c5c5c] mb-[20px] font-inter">
        Ada pertanyaan? Jangan ragu untuk menghubungi kami.
      </p>
      <ul className="list-none space-y-[15px]">
        <li className="text-[16px] text-dark font-inter">
          <strong className="text-primary mr-[5px]">Email:</strong> info@grantacademy.com
        </li>
        <li className="text-[16px] text-dark font-inter">
          <strong className="text-primary mr-[5px]">Telepon:</strong> +62 123 456 789
        </li>
        <li className="text-[16px] text-dark font-inter">
          <strong className="text-primary mr-[5px]">Alamat:</strong> Jl. Edukasi No. 10, Jakarta, Indonesia
        </li>
      </ul>
    </div>
  )
}
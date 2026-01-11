import Button from '../atoms/Button'

export default () => {
  return (
    <div>
      <h2 className="text-[28px] text-dark mb-[20px] font-lexend font-bold">
        Kirim Pesan
      </h2>
      <form action="#">
        <div className="mb-[20px]">
          <label htmlFor="name" className="block text-[15px] font-semibold text-dark mb-[8px] font-lexend">
            Nama
          </label>
          <input 
            type="text" 
            id="name" 
            placeholder="Nama Lengkap" 
            required 
            className="w-full p-[12px] text-[16px] font-inter border border-[#ddd] rounded-lg transition-colors focus:border-primary focus:outline-none"
          />
        </div>

        <div className="mb-[20px]">
          <label htmlFor="email" className="block text-[15px] font-semibold text-dark mb-[8px] font-lexend">
            Email
          </label>
          <input 
            type="email" 
            id="email" 
            placeholder="Alamat Email" 
            required 
            className="w-full p-[12px] text-[16px] font-inter border border-[#ddd] rounded-lg transition-colors focus:border-primary focus:outline-none"
          />
        </div>

        <div className="mb-[20px]">
          <label htmlFor="subject" className="block text-[15px] font-semibold text-dark mb-[8px] font-lexend">
            Subjek
          </label>
          <input 
            type="text" 
            id="subject" 
            placeholder="Subjek" 
            required 
            className="w-full p-[12px] text-[16px] font-inter border border-[#ddd] rounded-lg transition-colors focus:border-primary focus:outline-none"
          />
        </div>

        <div className="mb-[20px]">
          <label htmlFor="message" className="block text-[15px] font-semibold text-dark mb-[8px] font-lexend">
            Pesan
          </label>
          <textarea 
            id="message" 
            rows={5} 
            placeholder="Pesan..." 
            required 
            className="w-full p-[12px] text-[16px] font-inter border border-[#ddd] rounded-lg transition-colors focus:border-primary focus:outline-none resize-y"
          ></textarea>
        </div>

        <Button type="submit">Kirim</Button>
      </form>
    </div>
  )
}
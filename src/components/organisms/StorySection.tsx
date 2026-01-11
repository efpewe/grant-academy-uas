import SectionTitle from '../atoms/SectionTitle';
import StoryItem from '../molecules/StoryItem';

export default () => {
  return (
    <section className="py-[80px] bg-white">
      <div className="container">
        <SectionTitle>Cerita di Balik Grant Academy</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[50px] items-start">
          
          <StoryItem title='Asal Usul Nama "GRANT"'>
            <p className="mb-4">
              Nama "GRANT" bukan sekadar kata, melainkan sebuah akronim yang mewakili identitas dan kolaborasi para pendiri, CEO, dan mentor utama kami:
            </p>
            <ul className="list-none p-0 mb-4 font-lexend text-dark">
              <li className="py-[10px] border-t border-dashed border-[#eee] border-b">
                <strong className="text-primary mr-[10px] inline-block w-[35px] font-extrabold">G</strong> - Gybert
              </li>
              <li className="py-[10px] border-b border-dashed border-[#eee]">
                <strong className="text-primary mr-[10px] inline-block w-[35px] font-extrabold">R</strong> - Ryan
              </li>
              <li className="py-[10px] border-b border-dashed border-[#eee]">
                <strong className="text-primary mr-[10px] inline-block w-[35px] font-extrabold">AN</strong> - Fernando
              </li>
              <li className="py-[10px] border-b border-dashed border-[#eee]">
                <strong className="text-primary mr-[10px] inline-block w-[35px] font-extrabold">T</strong> - Tuna
              </li>
            </ul>
            <p>
              Gabungan ini melambangkan semangat kolaborasi dan keahlian beragam yang kami bawa ke dalam setiap kursus yang kami buat untuk Anda.
            </p>
          </StoryItem>

          <StoryItem title="Filosofi Logo Kami">
            <p className="mb-4">
              Kata "Grant" dalam bahasa Inggris berarti "Anugerah". Filosofi inilah yang kami tuangkan dalam logo kami.
            </p>
            <p className="mb-4">
              Bentuk tangan yang menengadah atau memberi melambangkan proses penganugerahan ilmu. Kami percaya bahwa ilmu adalah anugerah berharga yang harus dibagikan.
            </p>
            <p>
              Logo ini adalah komitmen kami untuk "menganugerahkan" pengetahuan dan keterampilan terbaik kepada setiap siswa kami.
            </p>
          </StoryItem>

        </div>
      </div>
    </section>
  );
}
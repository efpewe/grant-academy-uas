import allTeamImg from "../../assets/all.jpg";

export default () => {
  return (
    <section className="pb-[60px]">
      <div className="w-[90%] max-w-[1140px] mx-auto flex flex-col md:flex-row items-center gap-[50px]">
        <div className="flex-1 text-center md:text-left">
          <div className="mb-8">
            <h2 className="text-[28px] font-bold font-lexend text-dark mb-[15px]">
              Misi Kami
            </h2>
            <p className="text-base text-grey font-inter leading-[1.7]">
              Misi kami adalah menyediakan akses pendidikan teknologi
              berkualitas tinggi yang terjangkau bagi semua orang, di mana saja.
              Kami percaya bahwa ilmu adalah anugerah yang harus dibagikan.
            </p>
          </div>
          <div>
            <h2 className="text-[28px] font-bold font-lexend text-dark mb-[15px]">
              Visi Kami
            </h2>
            <p className="text-base text-grey font-inter leading-[1.7]">
              Menjadi platform e-learning terdepan di Indonesia yang melahirkan
              talenta-talenta digital siap kerja yang mampu bersaing secara
              global.
            </p>
          </div>
        </div>

        <div className="flex-1 w-full">
          <img
            src={allTeamImg}
            alt="Tim Grant Academy"
            className="w-full rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.1)]"
          />
        </div>
      </div>
    </section>
  );
};

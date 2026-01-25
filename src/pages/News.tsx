import MainLayout from "../components/templates/MainLayout";
import SectionTitle from "../components/atoms/SectionTitle";
import NewsCard from "../components/molecules/NewsCard";
import { newsData } from "../data/news";

export default function News() {
  return (
    <MainLayout>
      <section className="py-[80px] min-h-screen">
        <div className="w-[90%] max-w-[1140px] mx-auto mx-auto px-4">
          <div className="text-center mb-12">
            <SectionTitle>Berita & Acara</SectionTitle>
            <p className="mt-4 text-gray-500 font-inter text-[16px] max-w-2xl mx-auto">
              Ikuti perkembangan terbaru, acara eksklusif, dan tips teknologi
              terkini dari Grant Academy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
            {newsData.map((item) => (
              <NewsCard
                key={item.id}
                image={item.image}
                category={item.category}
                title={item.title}
                description={item.description}
                link={item.link}
              />
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

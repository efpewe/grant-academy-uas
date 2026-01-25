import { Link } from "react-router-dom";
import MainLayout from "../components/templates/MainLayout";
import { Button } from "../components/ui/button";

export default () => {
  return (
    <MainLayout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold font-lexend text-primary mb-4">
          Coming Soon
        </h1>
        <p className="text-lg text-grey font-inter mb-8 max-w-[500px]">
          Halaman ini sedang dalam tahap pengembangan. Pantau terus untuk update
          selanjutnya!
        </p>
        <Link to="/">
          <Button>KEMBALI KE HOME</Button>
        </Link>
      </div>
    </MainLayout>
  );
};

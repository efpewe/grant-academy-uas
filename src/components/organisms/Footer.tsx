import { Link } from "react-router-dom";
import igIcon from "../../assets/ig.png";
import ytIcon from "../../assets/yt.png";
import linkedinIcon from "../../assets/linkedin.png";

export default () => {
  const footerLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Course", path: "/course" },
    { label: "News", path: "/news" },
    { label: "Subscribe", path: "/subscribe" },
    { label: "Contact", path: "/contact" },
  ];
  const socialLinks = [
    { label: "Instagram", icon: igIcon, path: "https://instagram.com" },
    { label: "Youtube", icon: ytIcon, path: "https://youtube.com" },
    { label: "Linkedin", icon: linkedinIcon, path: "https://linkedin.com" },
  ];
  return (
    <footer className="bg-dark text-[#f0f0f0] pt-[60px] mt-[80px] font-inter">
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-10 pb-10 text-center md:text-left">
        <div className="md:col-span-2 lg:col-span-1">
          <h3 className="text-white text-2xl font-bold font-lexend mb-4">
            Grant Academy
          </h3>
          <p className="text-[15px] text-[#aaa] mt-5 max-w-[300px] mx-auto md:mx-0 leading-relaxed">
            Platform untuk meningkatkan skill dan pengetahuan digital Anda ke
            level selanjutnya.
          </p>
        </div>

        <div>
          <h4 className="text-lg text-white mb-5 font-lexend font-bold">
            Navigasi
          </h4>
          <nav className="flex flex-col gap-2">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className="text-[#aaa] text-[15px] hover:text-white hover:pl-[5px] transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h4 className="text-lg text-white mb-5 font-lexend font-bold">
            Ikuti Kami
          </h4>
          <div className="flex justify-center md:justify-start gap-[10px]">
            {socialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.path}
                target="_blank"
                className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all"
              >
                <img src={link.icon} alt={link.label} className="w-[35px]" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-[#444] py-5 text-center">
        <p className="text-sm text-[#aaa]">
          &copy; 2025 Grant Academy. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

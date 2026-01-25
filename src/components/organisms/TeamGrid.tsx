import SectionTitle from "../atoms/SectionTitle";
import TeamMemberCard from "../molecules/TeamMemberCard";

import gybertImg from "../../assets/gybert.png";
import ryanImg from "../../assets/ryan.png";
import ferImg from "../../assets/fer.png";
import jasonImg from "../../assets/jason.png";

export default () => {
  const team = [
    {
      name: "Gybert",
      role: "Founder & CEO",
      img: gybertImg,
      link: "/bio/gybert",
    },
    {
      name: "Ryan",
      role: "Lead Instructor (Mentor)",
      img: ryanImg,
      link: "/bio/ryan",
    },
    {
      name: "Fernando",
      role: "Head of Curriculum (Mentor)",
      img: ferImg,
      link: "/bio/fernando",
    },
    {
      name: "Jason Kho",
      role: "Data Science Instructor (Mentor)",
      img: jasonImg,
      link: "/bio/jason",
    },
  ];

  return (
    <section className="py-[80px]">
      <div className="w-[90%] max-w-[1140px] mx-auto">
        <SectionTitle>Temui Tim & Instruktur Kami</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px]">
          {team.map((member, idx) => (
            <TeamMemberCard
              key={idx}
              image={member.img}
              name={member.name}
              role={member.role}
              link={member.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

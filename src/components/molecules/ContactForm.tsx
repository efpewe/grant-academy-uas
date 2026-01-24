import Button from "../atoms/Button";
import emailjs from "@emailjs/browser";
import { useRef } from "react";

export default () => {
  const form = useRef<HTMLFormElement>(null);
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm("service_57ry5ue", "template_mww4rpa", form.current, {
          publicKey: "5koMvTcCXsGQVjS5q",
        })
        .then(
          () => {},
          (error) => {
            console.error("Failed to send email:", error.text);
          },
        );
    }
  };

  return (
    <div>
      <h2 className="text-[28px] text-dark mb-[20px] font-lexend font-bold">
        Kirim Pesan
      </h2>
      <form ref={form} onSubmit={sendEmail} action="#">
        <div className="mb-[20px]">
          <label
            htmlFor="name"
            className="block text-[15px] font-semibold text-dark mb-[8px] font-lexend"
          >
            Nama
          </label>
          <input
            type="text"
            id="name"
            name="user_name"
            placeholder="Nama Lengkap"
            required
            className="w-full p-[12px] text-[16px] font-inter border border-[#ddd] rounded-lg transition-colors focus:border-primary focus:outline-none"
          />
        </div>

        <div className="mb-[20px]">
          <label
            htmlFor="email"
            className="block text-[15px] font-semibold text-dark mb-[8px] font-lexend"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="user_email"
            placeholder="Alamat Email"
            required
            className="w-full p-[12px] text-[16px] font-inter border border-[#ddd] rounded-lg transition-colors focus:border-primary focus:outline-none"
          />
        </div>

        <div className="mb-[20px]">
          <label
            htmlFor="subject"
            className="block text-[15px] font-semibold text-dark mb-[8px] font-lexend"
          >
            Subjek
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Subjek"
            required
            className="w-full p-[12px] text-[16px] font-inter border border-[#ddd] rounded-lg transition-colors focus:border-primary focus:outline-none"
          />
        </div>

        <div className="mb-[20px]">
          <label
            htmlFor="message"
            className="block text-[15px] font-semibold text-dark mb-[8px] font-lexend"
          >
            Pesan
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Pesan..."
            required
            className="w-full p-[12px] text-[16px] font-inter border border-[#ddd] rounded-lg transition-colors focus:border-primary focus:outline-none resize-y"
          ></textarea>
        </div>

        <Button type="submit">Kirim</Button>
      </form>
    </div>
  );
};

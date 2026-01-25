import Button from "../atoms/Button";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";

export default () => {
  const form = useRef<HTMLFormElement>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    setIsSuccess(false);

    if (form.current) {
      emailjs
        .sendForm("service_57ry5ue", "template_mww4rpa", form.current, {
          publicKey: "5koMvTcCXsGQVjS5q",
        })
        .then(
          () => {
            setIsSuccess(true);
            setIsSending(false);
            if (form.current) {
              form.current.reset();
            }
            setTimeout(() => {
              setIsSuccess(false);
            }, 5000);
          },
          (error) => {
            console.error("Failed to send email:", error.text);
            setIsSending(false);
          },
        );
    }
  };

  return (
    <div>
      <h2 className="text-[28px] text-dark mb-[20px] font-lexend font-bold">
        Kirim Pesan
      </h2>

      {isSuccess && (
        <div className="mb-[20px] p-[16px] bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 font-inter text-[15px] flex items-center gap-[8px]">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Pesan Anda berhasil terkirim! Kami akan segera menghubungi Anda.
          </p>
        </div>
      )}

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

        <Button type="submit" disabled={isSending}>
          {isSending ? "Mengirim..." : "Kirim"}
        </Button>
      </form>
    </div>
  );
};

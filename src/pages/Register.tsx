import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../services/auth.service";

import AuthLayout from "../components/templates/AuthLayout";
import FormGroup from "../components/molecules/FormGroup";
import Button from "../components/atoms/Button";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [usernameError, setUsernameError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Validasi username di frontend
    if (name === "username") {
      if (value && !/^[a-zA-Z0-9]*$/.test(value)) {
        setUsernameError(
          "Username hanya boleh huruf dan angka (tanpa spasi atau simbol)",
        );
        return; // Tidak update state jika invalid
      } else {
        setUsernameError("");
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      setLoading(false);
      return;
    }

    try {
      await authService.register(formData);

      setIsSuccess(true);
    } catch (err: any) {
      const msg = err.response?.data?.message || "Gagal mendaftar.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <AuthLayout title="" subtitle="">
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
            ✉️
          </div>
          <h2 className="text-2xl font-bold font-lexend text-gray-800 mb-2">
            Cek Email Anda!
          </h2>
          <p className="text-gray-600 mb-8 font-lexend">
            Kami telah mengirimkan link aktivasi ke{" "}
            <strong>{formData.email}</strong>.<br />
            Silakan klik link tersebut untuk mengaktifkan akun Anda.
          </p>
          <Link to="/login">
            <Button className="w-full">Kembali ke Login</Button>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        {/* Back to Home Button - Outside Card */}
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors mb-4 group"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Kembali ke Home
        </a>

        <AuthLayout
          title="Buat Akun Baru"
          subtitle="Bergabunglah dengan Grant Academy dan mulai belajar."
          footerText="Sudah punya akun?"
          footerLink="/login"
          footerLinkText="Masuk di sini"
        >
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm font-lexend flex items-center">
              ⚠️ <span className="ml-2">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-1">
            <FormGroup
              label="Nama Lengkap"
              name="fullName"
              placeholder="Contoh: Gybert Ganteng"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <FormGroup
              label="Username"
              name="username"
              placeholder="Contoh: johnsmith123"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {usernameError && (
              <p className="text-red-500 text-xs mt-1 -mb-1">
                ⚠️ {usernameError}
              </p>
            )}
            <p className="text-gray-400 text-xs mt-1">
              Hanya huruf dan angka, tanpa spasi atau simbol (min. 3, maks. 20
              karakter)
            </p>

            <FormGroup
              label="Alamat Email"
              name="email"
              type="email"
              placeholder="nama@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormGroup
                label="Password"
                name="password"
                type="password"
                placeholder="Min. 6 karakter"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <FormGroup
                label="Ulangi Password"
                name="confirmPassword"
                type="password"
                placeholder="Ketik ulang password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="pt-6">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sedang Mendaftar..." : "Daftar Sekarang"}
              </Button>
            </div>
          </form>
        </AuthLayout>
      </div>
    </div>
  );
}

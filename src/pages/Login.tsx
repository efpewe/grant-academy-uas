import { useState, type ChangeEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Tambah useLocation
import { jwtDecode } from "jwt-decode"; // Tambah jwtDecode
import { useAuth } from "../contexts/AuthContext";
import { authService } from "../services/auth.service";
import AuthLayout from "../components/templates/AuthLayout";
import FormGroup from "../components/molecules/FormGroup";
import Button from "../components/atoms/Button";

// Definisi tipe token untuk TypeScript
interface DecodedToken {
  id: string;
  role: "student" | "mentor" | "admin";
  exp: number;
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation(); // Hook untuk membaca state history (redirect back)
  const { login } = useAuth();

  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Panggil API
      const response = await authService.login({
        identifier: formData.identifier,
        password: formData.password,
      });

      // 2. LOGIKA PENCARI TOKEN (Cari sampai dapat)
      let token = null;

      if (response?.data?.data && typeof response.data.data === "string") {
        // KEMUNGKINAN 1: Axios Standar (Paling Sering)
        token = response.data.data;
      } else if (response?.data && typeof response.data === "string") {
        // KEMUNGKINAN 2: Response langsung string token (Jarang)
        token = response.data;
      } else if (
        response?.data?.token &&
        typeof response.data.token === "string"
      ) {
        // KEMUNGKINAN 3: Backend kirim { token: "..." }
        token = response.data.token;
      } else if (response?.token && typeof response.token === "string") {
        // KEMUNGKINAN 4: Interceptor sudah kupas data
        token = response.token;
      }

      // 3. STOP!! JANGAN LANJUT KALAU TOKEN KOSONG
      if (!token) {
        throw new Error(
          "Token tidak ditemukan! Cek Console F12 untuk lihat struktur response.",
        );
      }

      // 4. SIMPAN & DECODE (Sekarang aman karena token pasti ada isinya)
      await login(token);
      const decoded = jwtDecode<DecodedToken>(token);

      // 5. REDIRECT
      const from = location.state?.from?.pathname;
      if (from) {
        navigate(from, { replace: true });
      } else {
        if (decoded.role === "mentor") {
          navigate("/mentor/dashboard", { replace: true });
        } else {
          navigate("/dashboard", { replace: true });
        }
      }
    } catch (err: any) {
      console.error("❌ ERROR LOGIN:", err);
      // Tampilkan pesan error yang lebih jelas
      const msg =
        err.message ||
        err.response?.data?.message ||
        "Terjadi kesalahan sistem.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Selamat Datang Kembali"
      subtitle="Masuk untuk melanjutkan pembelajaran di Grant Academy"
      footerText="Belum punya akun?"
      footerLink="/register"
      footerLinkText="Daftar Sekarang"
    >
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm border border-red-100 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-2">
        <FormGroup
          label="Username atau Email"
          name="identifier"
          type="text"
          placeholder="Contoh: Gybert Ganteng"
          value={formData.identifier}
          onChange={handleChange}
          required
        />

        <FormGroup
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <div className="pt-2">
          <Button className="w-full" type="submit" isLoading={loading}>
            Masuk ke Akun
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}

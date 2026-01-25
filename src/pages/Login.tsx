import { useState, type ChangeEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../contexts/AuthContext";
import { authService } from "../services/auth.service";
import AuthLayout from "../components/templates/AuthLayout";
import FormGroup from "../components/molecules/FormGroup";
import Button from "../components/atoms/Button";

interface DecodedToken {
  id: string;
  role: "student" | "mentor" | "admin";
  exp: number;
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
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
      const response = await authService.login({
        identifier: formData.identifier,
        password: formData.password,
      });

      let token = null;

      if (response?.data?.data && typeof response.data.data === "string") {
        token = response.data.data;
      } else if (response?.data && typeof response.data === "string") {
        token = response.data;
      } else if (
        response?.data?.token &&
        typeof response.data.token === "string"
      ) {
        token = response.data.token;
      } else if (response?.token && typeof response.token === "string") {
        token = response.token;
      }

      if (!token) {
        throw new Error(
          "Token tidak ditemukan! Cek Console F12 untuk lihat struktur response.",
        );
      }

      await login(token);
      const decoded = jwtDecode<DecodedToken>(token);

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
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Terjadi kesalahan sistem.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

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
          title="Selamat Datang Kembali"
          subtitle="Masuk untuk melanjutkan pembelajaran di Grant Academy"
          footerText="Belum punya akun?"
          footerLink="/register"
          footerLinkText="Daftar Sekarang"
        >
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm border border-red-100 flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
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
      </div>
    </div>
  );
}

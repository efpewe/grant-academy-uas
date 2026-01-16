import { useState, type ChangeEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Tambah useLocation
import { jwtDecode } from 'jwt-decode'; // Tambah jwtDecode
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/auth.service';
import AuthLayout from '../components/templates/AuthLayout';
import FormGroup from '../components/molecules/FormGroup';
import Button from '../components/atoms/Button';

// Definisi tipe token untuk TypeScript
interface DecodedToken {
  id: string;
  role: 'student' | 'mentor' | 'admin';
  exp: number;
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation(); // Hook untuk membaca state history (redirect back)
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Request Login ke API
      const response = await authService.login({
        identifier: formData.identifier, 
        password: formData.password
      });

      // 2. Simpan token ke Context & LocalStorage
      // Asumsi: response.data berisi string token JWT
      const token = response.data; 
      await login(token); 

      // 3. LOGIKA REDIRECT CERDAS
      if (token) {
        const decoded = jwtDecode<DecodedToken>(token);
        
        // Cek apakah ada halaman sebelumnya yang ingin dituju? (Misal: dari tombol "Daftar Kursus")
        // location.state?.from?.pathname diset di component CourseDetail.tsx
        const from = location.state?.from?.pathname;

        if (from) {
            // Jika ada history, kembalikan user ke sana (Course Detail)
            navigate(from, { replace: true });
        } else {
            // Jika login biasa, arahkan sesuai Role
            if (decoded.role === 'mentor') {
                navigate('/mentor/dashboard', { replace: true });
            } else {
                navigate('/dashboard', { replace: true });
            }
        }
      }

    } catch (err: any) {
      const message = err.response?.data?.message || "Login gagal. Cek koneksi atau data Anda.";
      setError(message);
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
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
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
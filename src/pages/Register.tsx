import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/auth.service';

import AuthLayout from '../components/templates/AuthLayout';
import FormGroup from '../components/molecules/FormGroup';
import Button from '../components/atoms/Button';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
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
          <h2 className="text-2xl font-bold font-lexend text-gray-800 mb-2">Cek Email Anda!</h2>
          <p className="text-gray-600 mb-8 font-lexend">
            Kami telah mengirimkan link aktivasi ke <strong>{formData.email}</strong>.<br/>
            Silakan klik link tersebut untuk mengaktifkan akun Anda.
          </p>
          <Link to="/login">
            <Button className="w-full">
              Kembali ke Login
            </Button>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
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
          placeholder="Username unik tanpa spasi"
          value={formData.username}
          onChange={handleChange}
          required
        />

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
          <Button 
            type="submit" 
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Sedang Mendaftar...' : 'Daftar Sekarang'}
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
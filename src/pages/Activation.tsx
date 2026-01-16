import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom'; 
import { authService } from '../services/auth.service';
import AuthLayout from '../components/templates/AuthLayout';
import Button from '../components/atoms/Button';

export default function Activation() {
  const [searchParams] = useSearchParams();
  
  const code = searchParams.get('code');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Sedang memverifikasi akun Anda...');

  useEffect(() => {
    if (!code) {
      setStatus('error');
      setMessage('Kode aktivasi tidak valid atau tidak ditemukan.');
      return;
    }

    const activateAccount = async () => {
      try {
        await authService.activation(code);
        setStatus('success');
        setMessage('Akun Anda berhasil diaktifkan! Silakan login untuk memulai.');
      } catch (err: any) {
        setStatus('error');
        setMessage(err.response?.data?.message || 'Gagal mengaktifkan akun. Token mungkin sudah kedaluwarsa.');
      }
    };

    activateAccount();
  }, [code]);

  return (
    <AuthLayout 
      title="Aktivasi Akun" 
      subtitle={status === 'loading' ? 'Mohon tunggu sebentar...' : ''}
    >
       <div className="text-center py-6">
        
        <div className="mb-6 flex justify-center">
          {status === 'loading' && (
             <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
          )}
          
          {status === 'success' && (
            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-5xl">
              ✅
            </div>
          )}

          {status === 'error' && (
            <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-5xl">
              ❌
            </div>
          )}
        </div>

        <h3 className={`text-lg font-bold font-lexend mb-2 
          ${status === 'success' ? 'text-gray-800' : status === 'error' ? 'text-red-600' : 'text-gray-600'}`}>
          {status === 'success' ? 'Aktivasi Berhasil!' : status === 'error' ? 'Aktivasi Gagal' : 'Memproses...'}
        </h3>
        
        <p className="text-gray-600 font-lexend mb-8 px-4">
          {message}
        </p>

        {status !== 'loading' && (
          <div className="space-y-3">
            <Link to="/login">
              <Button className="w-full">
                {status === 'success' ? 'Masuk ke Akun' : 'Kembali ke Login'}
              </Button>
            </Link>
            
            {status === 'error' && (
               <Link to="/register" className="block text-sm text-primary hover:underline mt-4 font-lexend">
                 Daftar ulang?
               </Link>
            )}
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
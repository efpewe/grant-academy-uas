import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading, token } = useAuth();

  // 1. Tampilkan Loading Spinner saat sistem sedang mengecek token
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  // 2. Jika tidak ada token atau auth gagal -> Tendang ke Login
  if (!token || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 3. Jika lolos pengecekan -> Render halaman yang diminta
  return <Outlet />;
}
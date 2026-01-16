import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { authService } from '../services/auth.service';

// 1. UPDATE INTERFACE USER (Sesuai Schema Backend Terbaru)
export interface User {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  role: 'student' | 'mentor' | 'admin';
  profilePicture?: string;
  profession?: string;
  bio?: string;
  
  // Tambahan field baru
  skills?: string[]; 
  socials?: {
    linkedin?: string;
    github?: string;
    website?: string;
  };
  enrolledCourses?: string[]; // Array ID Kursus yang sudah dibeli
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
  hasPurchased: (courseId: string) => boolean; // Helper baru untuk cek kepemilikan kursus
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Ambil token awal langsung dari localStorage agar state inisial lebih akurat
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fungsi Fetch User (Digunakan saat init & refresh profile)
  const fetchUser = async () => {
    try {
      if (!token) {
        setIsLoading(false);
        return;
      }
      
      // Jangan set isLoading true jika ini hanya refresh profile (agar tidak flickering)
      // Tapi saat init awal (user null), kita butuh loading.
      if (!user) setIsLoading(true);

      const response = await authService.getMe();
      setUser(response.data); 
    } catch (error: any) {
      console.error("Gagal mengambil session user:", error);
      
      // 2. ERROR HANDLING LEBIH PINTAR
      // Hanya logout jika token expired/invalid (401), jangan logout jika internet mati
      if (error.response && error.response.status === 401) {
        logout();
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Efek dijalankan setiap kali token berubah
  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setUser(null);
      setIsLoading(false);
    }
  }, [token]);

  const login = async (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    // Token berubah akan memicu useEffect di atas untuk fetchUser
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  // 3. HELPER BARU: Cek apakah user sudah beli kursus
  const hasPurchased = (courseId: string): boolean => {
    if (!user || !user.enrolledCourses) return false;
    return user.enrolledCourses.includes(courseId);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      isAuthenticated: !!user,
      isLoading, 
      login, 
      logout,
      refreshProfile: fetchUser,
      hasPurchased 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth harus digunakan di dalam AuthProvider');
  }
  return context;
};
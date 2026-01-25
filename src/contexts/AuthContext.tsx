import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { authService } from '../services/auth.service';

export interface User {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  role: 'student' | 'mentor' | 'admin';
  profilePicture?: string;
  profession?: string;
  bio?: string;
  
  skills?: string[]; 
  socials?: {
    linkedin?: string;
    github?: string;
    website?: string;
  };
  enrolledCourses?: string[]; 
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
  hasPurchased: (courseId: string) => boolean; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    try {
      if (!token) {
        setIsLoading(false);
        return;
      }
      
      if (!user) setIsLoading(true);

      const response = await authService.getMe();
      setUser(response.data); 
    } catch (error: any) {
      console.error("Gagal mengambil session user:", error);
      
      if (error.response && error.response.status === 401) {
        logout();
      }
    } finally {
      setIsLoading(false);
    }
  };

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
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

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
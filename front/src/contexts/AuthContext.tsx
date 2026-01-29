import { createContext, useContext, useEffect, useState } from 'react';
import { Usuario } from '@/types/backend';
import { apiService } from '@/services/api';

interface AuthContextType {
  user: Usuario | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (nombre: string, password: string) => Promise<void>;
  logout: () => void;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  const login = async (nombre: string, password: string) => {
    try {
      const response = await apiService.login({ nombre, password });
      
      // Guardar token en localStorage
      localStorage.setItem('auth_token', response.token);
      
      // Establecer usuario en el estado
      setUser(response.usuario);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  const refetchUser = async () => {
    try {
      const response = await apiService.verifyToken();
      setUser(response.usuario);
    } catch (error) {
      // Token inválido o expirado
      logout();
    }
  };

  // Verificar token al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    
    if (token) {
      refetchUser();
    }
    
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        logout,
        refetchUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
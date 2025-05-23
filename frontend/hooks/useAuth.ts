import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  email: string;
  full_name: string | null;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    error: null,
  });
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check for token in localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          setAuthState(prev => ({ ...prev, isLoading: false }));
          return;
        }

        // Fetch user data
        const response = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        setAuthState({
          user: userData,
          token,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error('Auth initialization error:', error);
        localStorage.removeItem('token');
        setAuthState({
          user: null,
          token: null,
          isLoading: false,
          error: 'Authentication failed',
        });
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Login failed');
      }

      const { access_token } = await response.json();
      localStorage.setItem('token', access_token);

      // Fetch user data after successful login
      const userResponse = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${access_token}`,
        },
      });

      if (!userResponse.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await userResponse.json();
      setAuthState({
        user: userData,
        token: access_token,
        isLoading: false,
        error: null,
      });

      router.push('/dashboard');
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Login failed',
      }));
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({
      user: null,
      token: null,
      isLoading: false,
      error: null,
    });
    router.push('/login');
  };

  const register = async (email: string, password: string, full_name: string) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, full_name }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Registration failed');
      }

      // After successful registration, redirect to login
      router.push('/login?registered=true');
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Registration failed',
      }));
      throw error;
    }
  };

  return {
    user: authState.user,
    token: authState.token,
    isLoading: authState.isLoading,
    error: authState.error,
    login,
    logout,
    register,
  };
} 
import { useState } from 'react';
import { login } from '../../../core/mockApi';
import { setItem as setLocalStorageItem } from '../../../shared/utils/localStorage.util';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const handleLogin = async (username: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await login(username, password);
      setToken(response.token);
      setLocalStorageItem('token', response.token);

    } catch (err: any) {
      setError(err.message || 'Error desconocido');
      
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, token, handleLogin };
}

import { useState } from 'react';
import { api } from '../api/config';

export function useApi<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (endpoint: string) => {
    setLoading(true);
    try {
      const result = await api.get(endpoint);
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
}

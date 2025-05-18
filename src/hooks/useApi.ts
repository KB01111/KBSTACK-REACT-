import { useState, useEffect } from 'react';

/**
 * Custom hook to handle API requests with loading, error, and data states
 * @param url The URL to fetch data from
 * @param options Optional fetch options
 */
export function useApi<T>(url: string, options?: RequestInit) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [refetchIndex, setRefetchIndex] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(url, options);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [url, refetchIndex, options]);

  // Function to manually refetch data
  const refetch = () => setRefetchIndex(prev => prev + 1);

  return { data, loading, error, refetch };
}

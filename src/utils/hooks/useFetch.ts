import { useState, useEffect } from 'react';
import { ArtworkError } from '@utils/class/ArtworkError';

export function useFetch<T>(url: string): {
    data: T | null;
    loading: boolean;
    error: string | null;
} {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new ArtworkError('Network response was not ok');
                }
                const json = await response.json();
                setData(json.data);
            } catch (err) {
                if (err instanceof ArtworkError) {
                    setError(err.message);
                } else {
                    console.error('Unexpected error:', err);
                    setError('An unexpected error occurred.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
}

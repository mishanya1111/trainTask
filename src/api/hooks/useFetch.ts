import { ArtworkError } from '@utils/class/ArtworkError';
import { useCallback, useEffect, useState } from 'react';
export function useFetch<T>(url: string): {
    data: T | null;
    loading: boolean;
    error: string | null;
} {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        const cachedData = sessionStorage.getItem(url); // Проверка кэша
        if (cachedData) {
            setData(JSON.parse(cachedData));
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new ArtworkError('Network response was not ok');
            }
            const json = await response.json();
            setData(json.data);
            sessionStorage.setItem(url, JSON.stringify(json.data)); // Сохранение в кэш
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
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error };
}

import { ArtworkError } from '@utils/class/ArtworkError';
import { useCallback, useEffect, useState } from 'react';

export function usePaginatedArtworks<T>(url: string): {
    data: { artworks: T; totalPages: number } | null;
    loading: boolean;
    error: string | null;
} {
    const [data, setData] = useState<{ artworks: T; totalPages: number } | null>(
        null
    );
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
                throw new ArtworkError('Failed to fetch artworks');
            }

            const json = await response.json();
            const fetchedData = {
                artworks: json.data,
                totalPages: json.pagination.total_pages
            };

            setData(fetchedData);
            sessionStorage.setItem(url, JSON.stringify(fetchedData)); // Сохранение в кэш
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

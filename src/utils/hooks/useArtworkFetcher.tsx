import { fetchArtworks } from '@api/artworks';
import { ARTWORK } from '@constants/types';
import { useCallback, useEffect, useMemo, useState } from 'react';

const useArtworksFetcher = (
    query: string
): { artworks: ARTWORK[]; loading: boolean; error: string | null } => {
    const [artworks, setArtworks] = useState<ARTWORK[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadArtworks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const fetchedArtworks = await fetchArtworks(query);
            setArtworks(fetchedArtworks);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    }, [query]);

    useEffect(() => {
        loadArtworks();
    }, [loadArtworks]);

    const result = useMemo(
        () => ({ artworks, loading, error }),
        [artworks, loading, error]
    );

    return result;
};

export default useArtworksFetcher;

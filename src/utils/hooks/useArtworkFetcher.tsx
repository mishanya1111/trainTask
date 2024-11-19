import { fetchArtworks } from '@api/artworks';
import { ARTWORK } from '@constants/types';
import { useEffect, useState } from 'react';

const useArtworksFetcher = (
    query: string
): { artworks: ARTWORK[]; loading: boolean; error: string | null } => {
    const [artworks, setArtworks] = useState<ARTWORK[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadArtworks = async () => {
            setLoading(true);
            setError(null);
            try {
                const artworks = await fetchArtworks(query);
                setArtworks(artworks);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        loadArtworks();
    }, [query]);

    return { artworks, loading, error };
};

export default useArtworksFetcher;

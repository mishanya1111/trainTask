import { useState, useEffect } from 'react';
import { ARTWORK } from '@constants/types';

const useArtworksFetcher = (
    query: string
): { artworks: ARTWORK[]; loading: boolean; error: string | null } => {
    const [artworks, setArtworks] = useState<ARTWORK[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArtworks = async () => {
            setLoading(true);
            setError(null);
            try {
                const url = query
                    ? `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(query)}&fields=id,artist_title,title,is_public_domain,image_id,fiscal_year`
                    : 'https://api.artic.edu/api/v1/artworks/?fields=id,artist_title,title,is_public_domain,image_id,fiscal_year';

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                const parsedArtworks = data.data.map(
                    (artwork: any): ARTWORK => ({
                        ID: artwork.id,
                        title: artwork.title,
                        author: artwork.artist_title || null,
                        is_public_domain: artwork.is_public_domain,
                        imageId: artwork.image_id || null,
                        year: artwork.fiscal_year ?? undefined
                    })
                );

                setArtworks(parsedArtworks);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArtworks();
    }, [query]);

    return { artworks, loading, error };
};

export default useArtworksFetcher;

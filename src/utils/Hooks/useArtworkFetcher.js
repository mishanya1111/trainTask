import { useState, useEffect } from 'react';

const useArtworksFetcher = query => {
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtworks = async () => {
            setLoading(true);
            setError(null);
            try {
                const url = query
                    ? `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(query)}&fields=id,artist_title,title,is_public_domain,image_id,fiscal_year`
                    : 'https://api.artic.edu/api/v1/artworks/?fields=id,artist_title,title,is_public_domain,image_id,fiscal_year'; //
                //console.log(url);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                //console.log(data)
                const parsedArtworks = data.data.map(artwork => ({
                    ID: artwork.id,
                    title: artwork.title,
                    author: artwork.artist_title,
                    is_public_domain: artwork.is_public_domain,
                    imageId: artwork.image_id,
                    year: artwork.fiscal_year
                }));

                setArtworks(parsedArtworks);
            } catch (err) {
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

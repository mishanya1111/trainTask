import { useState, useEffect } from 'react';
import defaultPage from '../img/maxresdefault.jpg';
import logo from '../img/svg.svg';

function useImageLoader(imageId, size) {
    const [imageSrc, setImageSrc] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!imageId) {
            setImageSrc(logo);
            setLoading(false);
            return;
        }

        const url = `https://www.artic.edu/iiif/2/${imageId}/full/${size},/0/default.jpg`;
        const loadImage = () => {
            setLoading(true);
            setError(null);

            const img = new Image();
            img.src = url;

            img.onload = () => {
                setImageSrc(url);
                setLoading(false);
            };

            img.onerror = () => {
                setError('No Photo');
                setLoading(false);
            };
        };

        loadImage();
    }, [imageId, size]);

    return { imageSrc, loading, error };
}

function ArtworkImage({ imageId, sizes = ['843', '500', '300'], alt = 'Artwork' }) {
    const [currentSizeIndex, setCurrentSizeIndex] = useState(0);
    const { imageSrc, loading, error } = useImageLoader(imageId, sizes[currentSizeIndex]);

    useEffect(() => {
        if (error && currentSizeIndex < sizes.length - 1) {
            setCurrentSizeIndex(currentSizeIndex + 1);
        }
    }, [error, currentSizeIndex, sizes.length]);

    if (loading) return <img src={defaultPage} alt="Loading artwork" />;
    if (error && currentSizeIndex === sizes.length - 1) return <img src={logo} alt="Placeholder logo" />;

    return <img src={imageSrc} alt={alt} />;
}

export default ArtworkImage;

import { useState, useEffect } from 'react';
import defalutPage from '../img/maxresdefault.jpg';
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
                setError('Ошибка при загрузке изображения');
                setLoading(false);
            };
        };

        loadImage();
    }, [imageId]);

    return { imageSrc, loading, error };
}

function ArtworkImage({ imageId, size }) {
    const { imageSrc, loading, error } = useImageLoader(imageId, size);

    if (loading) return <img src={defalutPage} alt="Artwork" />;
    if (error) return <p>{error}</p>;

    return <img src={imageSrc} alt="Artwork" />;
}

export default ArtworkImage;

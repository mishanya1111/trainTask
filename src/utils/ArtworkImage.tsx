import defaultPage from '@assets/img/maxresdefault.jpg';
import logo from '@assets/img/svg.svg';
import { ARTWORK_IMAGE_PROPS } from '@constants/types';
import { useEffect, useState } from 'react';

function ArtworkImage({
    imageId,
    sizes = [843, 500, 300, 200],
    alt = 'Artwork'
}: ARTWORK_IMAGE_PROPS): JSX.Element {
    const [currentSizeIndex, setCurrentSizeIndex] = useState<number>(0);
    const [validSrc, setValidSrc] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const testImageSrc = (size: number) => {
        if (!imageId) return logo; // Если ID отсутствует, возвращаем лого
        return `https://www.artic.edu/iiif/2/${imageId}/full/${size},/0/default.jpg`; //Не вижу смысла выносить эту ссылку
    };

    const loadImage = (url: string) => {
        const img = new Image();
        img.src = url;

        img.onload = () => {
            setValidSrc(url);
            setLoading(false);
        };

        img.onerror = () => {
            setLoading(false);
            setError('Image load failed');
            if (currentSizeIndex < sizes.length - 1) {
                setCurrentSizeIndex(prevIndex => prevIndex + 1);
            }
        };
    };

    useEffect(() => {
        setLoading(true);
        setError(null);
        const url = testImageSrc(sizes[currentSizeIndex]);
        loadImage(url);
    }, [currentSizeIndex, sizes, imageId]);

    if (loading) return <img src={defaultPage} alt="Loading artwork" />;
    if (error && currentSizeIndex === sizes.length - 1) {
        return <img src={logo} alt="Placeholder logo" />;
    }

    return <img src={validSrc!} alt={alt} />;
}

export default ArtworkImage;

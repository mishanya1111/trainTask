import { useState, useEffect } from 'react';
import defaultPage from '@assets/img/maxresdefault.jpg';
import logo from '@assets/img/svg.svg';
import { ARTWORK_IMAGE_PROPS } from '@constants/types';

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
        if (!imageId) return logo;
        return `https://www.artic.edu/iiif/2/${imageId}/full/${size},/0/default.jpg`;
    };

    const loadImage = (url: string) => {
        const img = new Image();
        img.src = url;

        img.onload = () => {
            setValidSrc(url);
            setLoading(false);
        };

        img.onerror = () => {
            // Suppress 403 error logging
            setLoading(false);
            setError('Image load failed');
            if (currentSizeIndex < sizes.length - 1) {
                setCurrentSizeIndex(prevIndex => prevIndex + 1);
            }
        };
    };

    useEffect(() => {
        //Проверка на ошибку 403 (связанно с размером картинки, пример Elements I Nancy Hemenway Barto )
        const originalConsoleError = console.error;
        console.error = (...args) => {
            if (
                args[0]?.toString()?.includes('403') &&
                args[0]?.toString()?.includes('Image load failed')
            ) {
                return;
            }
            originalConsoleError(...args);
        };

        setLoading(true);
        setError(null);
        const url = testImageSrc(sizes[currentSizeIndex]);
        loadImage(url);

        return () => {
            console.error = originalConsoleError;
        };
    }, [currentSizeIndex, sizes, imageId]);

    if (loading) return <img src={defaultPage} alt="Loading artwork" />;
    if (error && currentSizeIndex === sizes.length - 1) {
        return <img src={logo} alt="Placeholder logo" />;
    }

    return <img src={validSrc!} alt={alt} />;
}

export default ArtworkImage;

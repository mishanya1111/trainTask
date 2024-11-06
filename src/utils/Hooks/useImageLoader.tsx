// useImageLoader.ts
import { useState, useEffect } from 'react';
import defaultPage from '@assets/img/maxresdefault.jpg';
import logo from '@assets/img/svg.svg';
import { ArtworkImageProps, UseImageLoaderReturn } from '@constants/types';



function useImageLoader(imageId: string | undefined, size: number): UseImageLoaderReturn {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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

function ArtworkImage({ imageId, sizes = [843, 500, 300], alt = 'Artwork' }: ArtworkImageProps): JSX.Element {
    const [currentSizeIndex, setCurrentSizeIndex] = useState<number>(0);
    const { imageSrc, loading, error } = useImageLoader(
        imageId,
        sizes[currentSizeIndex]
    );

    useEffect(() => {
        if (error && currentSizeIndex < sizes.length - 1) {
            setCurrentSizeIndex(currentSizeIndex + 1);
        }
    }, [error, currentSizeIndex, sizes.length]);

    if (loading) return <img src={defaultPage} alt="Loading artwork" />;
    if (error && currentSizeIndex === sizes.length - 1)
        return <img src={logo} alt="Placeholder logo" />;

    return <img src={imageSrc!} alt={alt} />;
}

export default ArtworkImage;

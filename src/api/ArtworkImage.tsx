import defaultPage from '@assets/img/maxresdefault.jpg';
import logo from '@assets/img/svg.svg';
import { useCallback, useEffect, useMemo, useState } from 'react';
interface ARTWORK_IMAGE_PROPS {
    imageId: string | undefined;
    sizes?: number[];
    alt?: string;
}
function ArtworkImage({
    imageId,
    sizes = [843, 500, 300, 200],
    alt = 'Artwork'
}: ARTWORK_IMAGE_PROPS): JSX.Element {
    const [currentSizeIndex, setCurrentSizeIndex] = useState<number>(0);
    const [validSrc, setValidSrc] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const testImageSrc = useCallback(
        (size: number) =>
            imageId
                ? `https://www.artic.edu/iiif/2/${imageId}/full/${size},/0/default.jpg`
                : logo,
        [imageId]
    );

    const currentImageSrc = useMemo(
        () => testImageSrc(sizes[currentSizeIndex]),
        [currentSizeIndex, sizes, testImageSrc]
    );

    const loadImage = useCallback(
        (url: string) => {
            const img = new Image();
            img.src = url;

            img.onload = () => {
                setValidSrc(url);
                setLoading(false);
                setError(false);
            };

            img.onerror = () => {
                if (currentSizeIndex < sizes.length - 1) {
                    setCurrentSizeIndex(prevIndex => prevIndex + 1);
                } else {
                    setLoading(false);
                    setError(true);
                }
            };
        },
        [currentSizeIndex, sizes]
    );

    useEffect(() => {
        setLoading(true);
        setError(false);
        loadImage(currentImageSrc);
    }, [currentImageSrc, loadImage]);

    if (loading) return <img src={defaultPage} alt="Loading artwork" />;
    if (error) return <img src={logo} alt="Placeholder logo" />;

    return <img src={validSrc!} alt={alt} />;
}

export default ArtworkImage;

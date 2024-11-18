import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '@pages/DetailInfo/DetailInfo.css';
import {
    addToFavorites,
    removeFromFavorites,
    isFavorite
} from '@utils/favoritesUtils';
import Loader from '@components/Loader/Loader';
import ArtworkImage from '@utils/ArtworkImage';
import ReplaceableBookmark from '@pages/DetailInfo/ReplaceableBookmark';

interface Artwork {
    id: number;
    title: string;
    artist_title: string;
    is_public_domain: boolean;
    image_id: string;
    artist_display: string;
    dimensions: string;
    credit_line: string;
    place_of_origin: string;
    date_display: string;
}
//отображает детальую информацию о товаре, также присутствует больше иформации
function DetailInfo(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const [artwork, setArtwork] = useState<Artwork | null>(null);
    const [isFavorited, setIsFavorited] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const sizesImage: number[] = [863, 1686, 600, 400, 200];
    useEffect(() => {
        const fetchArtworkDetails = async (): Promise<void> => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(
                    `https://api.artic.edu/api/v1/artworks/${id}`
                );
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setArtwork(data.data);
                setIsFavorited(isFavorite(data.data.id));
            } catch (error: any) {
                console.error('Error fetching artwork details:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArtworkDetails();
    }, [id]);
    //console.log(id);
    //console.log(id);
    //console.log(id);
    const toggleFavorite = (): void => {
        if (artwork) {
            if (isFavorited) {
                removeFromFavorites(artwork.id);
            } else {
                addToFavorites({
                    ID: artwork.id,
                    /*ID: artwork.id,*/
                    title: artwork.title,
                    author: artwork.artist_title,
                    is_public_domain: artwork.is_public_domain,
                    imageId: artwork.image_id
                });
            }
            setIsFavorited(!isFavorited);
        }
    };

    if (loading) return <Loader />; // отображение Loader при загрузке

    if (error) return <p className="error-message">{error}</p>;

    return (
        <section>
            <div className="detail-info">
                <div className="image-container">
                    <ArtworkImage
                        imageId={artwork?.image_id}
                        sizes={sizesImage}
                        alt={artwork?.title}
                    />
                    <div className="bookmark-icon" onClick={toggleFavorite}>
                        <ReplaceableBookmark isFavorited={isFavorited} />
                    </div>
                </div>
                <div className="info-container">
                    <h1>{artwork?.title}</h1>
                    <h2>
                        <strong>{artwork?.artist_title}</strong>
                    </h2>
                    <p>{artwork?.date_display}</p>
                    <div className="overview">
                        <h3>Overview</h3>
                        <p>
                            <strong>Artist nationality:</strong>{' '}
                            {artwork?.artist_display}
                        </p>
                        <p>
                            <strong>Dimensions:</strong> {artwork?.dimensions}
                        </p>
                        <p>
                            <strong>Credit Line:</strong> {artwork?.credit_line}
                        </p>
                        <p>
                            <strong>Repository:</strong> {artwork?.place_of_origin}
                        </p>
                        <p>{artwork?.is_public_domain ? 'Public' : 'Private'}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DetailInfo;

import '@pages/DetailInfo/DetailInfo.css';

import Loader from '@components/Loader/Loader';
import Overview from '@components/Overview';
import { URL_DETAIL } from '@constants/URL';
import ReplaceableBookmark from '@pages/DetailInfo/ReplaceableBookmark';
import ArtworkImage from '@utils/ArtworkImage';
import LocalStorageManager from '@utils/favoritesUtils';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useFetch } from '../../api/useFetch';

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
    const [isFavorited, setIsFavorited] = useState<boolean>(false);
    const sizesImage: number[] = [863, 1686, 600, 400, 200];
    const { data: artwork, loading, error } = useFetch<Artwork>(URL_DETAIL + id);

    useEffect(() => {
        if (artwork) {
            setIsFavorited(LocalStorageManager.isFavorite(artwork.id));
        }
    }, [artwork]);

    const toggleFavorite = (): void => {
        if (artwork) {
            if (isFavorited) {
                LocalStorageManager.removeFromFavorites(artwork.id);
            } else {
                LocalStorageManager.addToFavorites({
                    ID: artwork.id,
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
                    <Overview
                        artistDisplay={artwork?.artist_display || ''}
                        dimensions={artwork?.dimensions || ''}
                        creditLine={artwork?.credit_line || ''}
                        placeOfOrigin={artwork?.place_of_origin || ''}
                        isPublicDomain={artwork?.is_public_domain || false}
                    />
                </div>
            </div>
        </section>
    );
}

export default DetailInfo;

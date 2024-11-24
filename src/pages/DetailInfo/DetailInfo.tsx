import '@pages/DetailInfo/DetailInfo.css';

import ArtworkImage from '@api/ArtworkImage';
import { useFetch } from '@api/hooks/useFetch';
import bookmarkAdd from '@assets/img/svgBookmark.svg';
import bookmarkRemove from '@assets/img/svgBookmarkIsFavorited.svg';
import Loader from '@components/Loader/Loader';
import Overview from '@components/Overview';
import { URL_ARTWORKS } from '@constants/URL';
import LocalStorageManager from '@utils/favoritesUtils';
import { handleToggleFavorite } from '@utils/handleToggleFavorite';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

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

function DetailInfo(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const [isFavorited, setIsFavorited] = useState<boolean>(false);

    const sizesImage: number[] = useMemo(() => [863, 1686, 600, 400, 200], []);

    const {
        data: artwork,
        loading,
        error
    } = useFetch<Artwork>(URL_ARTWORKS + '/' + id);

    useEffect(() => {
        if (artwork) {
            setIsFavorited(LocalStorageManager.isFavorite(artwork.id));
        }
    }, [artwork]);

    const toggleFavorite = useCallback((): void => {
        if (artwork) {
            setIsFavorited(
                handleToggleFavorite({
                    ID: artwork.id,
                    title: artwork.title,
                    author: artwork.artist_title,
                    is_public_domain: artwork.is_public_domain,
                    imageId: artwork.image_id,
                    isFavorite: true
                })
            );
        }
    }, [artwork]);

    if (loading) return <Loader />;

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
                    <div
                        className={`bookmark-icon ${isFavorited ? 'bookmark-is-favorite' : ''}`}
                        onClick={toggleFavorite}
                    >
                        <img
                            src={isFavorited ? bookmarkRemove : bookmarkAdd}
                            alt="bookmark"
                        />
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

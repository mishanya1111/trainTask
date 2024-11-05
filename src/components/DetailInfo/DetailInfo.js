import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './DetailInfo.css';
import bookmarkAdd from '../../img/bookmark.png';
import bookmarkRemove from '../../img/unbookmark.png';
import {
    addToFavorites,
    removeFromFavorites,
    isFavorite
} from '../Favorites/favoritesUtils';
import Loader from '../Loader';
import ArtworkImage from '../../Hooks/useImageLoader';

function DetailInfo() {
    const { id } = useParams();
    const [artwork, setArtwork] = useState(null);
    const [isFavorited, setIsFavorited] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtworkDetails = async () => {
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
            } catch (error) {
                console.error('Error fetching artwork details:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArtworkDetails();
    }, [id]);

    const toggleFavorite = () => {
        if (isFavorited) {
            removeFromFavorites(artwork.id);
        } else {
            addToFavorites({
                id: artwork.id,
                ID: artwork.id,
                title: artwork.title,
                author: artwork.artist_title,
                is_public_domain: artwork.is_public_domain,
                imageId: artwork.image_id
            });
        }
        setIsFavorited(!isFavorited);
    };

    if (loading) return <Loader />; // отображение Loader при загрузке

    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="detail-info">
            <div className="image-container">
                <ArtworkImage
                    imageId={artwork.image_id}
                    size={['863', '1686', '600', '400', '200']}
                />
                <div className="bookmark-icon" onClick={toggleFavorite}>
                    <img
                        src={isFavorited ? bookmarkRemove : bookmarkAdd}
                        alt={
                            isFavorited
                                ? 'Remove from favorites'
                                : 'Add to favorites'
                        }
                    />
                </div>
            </div>
            <div className="info-container">
                <h1>{artwork.title}</h1>
                <h2>
                    <strong>{artwork.artist_title}</strong>
                </h2>
                <p>{artwork.date_display}</p>
                <div className="overview">
                    <h3>Overview</h3>
                    <p>
                        <strong>Artist nationality:</strong> {artwork.artist_display}
                    </p>
                    <p>
                        <strong>Dimensions:</strong> {artwork.dimensions}
                    </p>
                    <p>
                        <strong>Credit Line:</strong> {artwork.credit_line}
                    </p>
                    <p>
                        <strong>Repository:</strong> {artwork.place_of_origin}
                    </p>
                    <p>{artwork.is_public_domain ? 'Public' : 'Private'}</p>
                </div>
            </div>
        </div>
    );
}

export default DetailInfo;

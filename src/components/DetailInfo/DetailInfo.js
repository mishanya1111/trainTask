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

function DetailInfo() {
    const { id } = useParams();
    const [artwork, setArtwork] = useState(null);
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        const fetchArtworkDetails = async () => {
            try {
                const response = await fetch(
                    `https://api.artic.edu/api/v1/artworks/${id}`
                );
                const data = await response.json();
                setArtwork(data.data);
                setIsFavorited(isFavorite(data.data.id)); // Check if artwork is already in favorites
            } catch (error) {
                console.error('Error fetching artwork details:', error);
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

    if (!artwork) {
        return <p>Loading...</p>;
    }

    return (
        <div className="detail-info">
            <div className="image-container">
                <img
                    src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                    alt={artwork.title}
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

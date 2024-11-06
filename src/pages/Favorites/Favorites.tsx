import React, { useState, useEffect } from 'react';
import { getFavorites, removeFromFavorites } from '@utils/favoritesUtils';
import '@pages/Favorites/favorites.css';
import WorkCard from '@pages/Home/WorkCard';
import bookmark from '@assets/img/bookmark.png';

// Определяем интерфейс для элементов избранного
interface FavoriteItem {
    ID: number;
    title: string;
    author: string;
    is_public_domain: boolean;
    imageId: string;
}

function Favorites():JSX.Element  {
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

    useEffect(() => {
        setFavorites(getFavorites());
    }, []);

    const handleRemoveFavorite = (id: number) => {
        removeFromFavorites(id);
        setFavorites(getFavorites());
    };

    return (
        <div className="favorites">
            <div className="search-screen">
                <h1>Here are your</h1>
                <h2>
                    <img src={bookmark} alt="bookmark" />
                    Favorites
                </h2>
            </div>
            <div className="favorites-intro">
                <h4>Saved by you</h4>
                <p>Your favorites list</p>
            </div>
            <div className="favorites-container">
                {favorites.length > 0 ? (
                    favorites.map((artwork) => (
                        <WorkCard
                            linkID={artwork.ID}
                            key={artwork.ID}
                            title={artwork.title}
                            author={artwork.author}
                            imageId={artwork.imageId}
                            is_public_domain={artwork.is_public_domain}
                            onClickHandler={() => handleRemoveFavorite(artwork.ID)}
                        />
                    ))
                ) : (
                    <h4>No favorites added yet.</h4>
                )}
            </div>
        </div>
    );
}

export default Favorites;

import React, { useState, useEffect } from 'react';
import { getFavorites, removeFromFavorites } from '../../utils/favoritesUtils';
import './favorites.css';
import WorkCard from '../Home/WorkCard';
import bookmark from '../../assets/img/bookmark.png';

function Favorites() {
    const [favorites, setFavorites] = useState([
        {
            ID: 0,
            title: '',
            author: '',
            is_public_domain: false,
            imageId: ''
        }
    ]);

    useEffect(() => {
        setFavorites(getFavorites());
    }, []);

    const handleRemoveFavorite = (id: any) => {
        removeFromFavorites(id);
        setFavorites(getFavorites());
    };

    return (
        <div className="favorites">
            <div className="search-screen">
                <h1>Here are your</h1>
                <h2>
                    <img src={bookmark} alt="bokmark" />
                    Favorites
                </h2>
            </div>
            <div className="favorites-intro">
                <h4>Saved by you</h4>
                <p>Your favorites list</p>
            </div>
            <div className="favorites-container">
                {favorites.length > 0 ? (
                    favorites.map((artwork, index) => (
                        <WorkCard
                            favoritePage={true}
                            linkID={artwork.ID}
                            key={index}
                            title={artwork.title}
                            author={artwork.author}
                            imageId={artwork.imageId}
                            is_public_domain={artwork.is_public_domain}
                            onClickHandler={() => handleRemoveFavorite(artwork.ID)}
                        />
                    ))
                ) : (
                    <p><h4>No favorites added yet.</h4></p>
                )}
            </div>
        </div>
    );
}

export default Favorites;

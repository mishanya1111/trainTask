import '@pages/Favorites/favorites.css';

import bookmark from '@assets/img/svgBookmark.svg';
import WorkCard from '@components/WorkCard';
import { ARTWORK } from '@constants/types';
import LocalStorageManager from '@utils/favoritesUtils';
import { handleToggleFavorite } from '@utils/handleToggleFavorite';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

const Favorites: React.FC = React.memo(() => {
    const [favorites, setFavorites] = useState<ARTWORK[]>([]);

    useEffect(() => {
        setFavorites(LocalStorageManager.getFavorites());
    }, []);

    const handleFavoriteToggle = useCallback((work: ARTWORK) => {
        handleToggleFavorite(work);
        setFavorites(LocalStorageManager.getFavorites());
    }, []);

    const renderWorkCard = useCallback(
        (artwork: ARTWORK) => (
            <WorkCard
                key={artwork.ID}
                linkID={artwork.ID}
                title={artwork.title}
                author={artwork.author}
                imageId={artwork.imageId}
                is_public_domain={artwork.is_public_domain}
                onClickHandler={() => handleFavoriteToggle(artwork)}
                isFavorite={artwork.isFavorite}
            />
        ),
        [handleFavoriteToggle]
    );

    const workCards = useMemo(() => {
        return favorites.length > 0 ? (
            favorites.map(renderWorkCard)
        ) : (
            <h4>No favorites added yet.</h4>
        );
    }, [favorites, renderWorkCard]);

    return (
        <section>
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
                <div className="favorites-container">{workCards}</div>
            </div>
        </section>
    );
});

Favorites.displayName = 'Favorites';
export default Favorites;

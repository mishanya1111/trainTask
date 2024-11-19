import '@pages/Favorites/favorites.css';

import bookmark from '@assets/img/svgBookmark.svg';
import WorkCard from '@components/WorkCard';
import { ARTWORK } from '@constants/types';
import { getFavorites, removeFromFavorites } from '@utils/favoritesUtils';
import { useEffect, useState } from 'react';

//Использует FavoritesUtils для отображения тех кто туда попал, также использует workcrd
function Favorites(): JSX.Element {
    const [favorites, setFavorites] = useState<ARTWORK[]>([]);

    useEffect(() => {
        setFavorites(getFavorites());
    }, []);

    const handleRemoveFavorite = (id: number) => {
        removeFromFavorites(id);
        setFavorites(getFavorites());
    };

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
                <div className="favorites-container">
                    {favorites.length > 0 ? (
                        favorites.map(artwork => (
                            <WorkCard
                                linkID={artwork.ID}
                                key={artwork.ID}
                                title={artwork.title}
                                author={artwork.author}
                                imageId={artwork.imageId}
                                is_public_domain={artwork.is_public_domain}
                                onClickHandler={() =>
                                    handleRemoveFavorite(artwork.ID)
                                }
                                favoritePage={true}
                            />
                        ))
                    ) : (
                        <h4>No favorites added yet.</h4>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Favorites;

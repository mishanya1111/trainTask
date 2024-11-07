import { ARTWORK } from '@constants/types';

export const getFavorites = (): ARTWORK[] => {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
};

export const isFavorite = (ID: number): boolean =>
    getFavorites().some((fav: ARTWORK) => fav.ID === ID);

export const addToFavorites = (artwork: ARTWORK): void => {
    const favorites = getFavorites();
    const isAlreadyFavorite = isFavorite(artwork.ID);

    if (!isAlreadyFavorite) {
        const updatedFavorites = [...favorites, artwork];
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
};

export const removeFromFavorites = (id: number): void => {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter((item: ARTWORK) => item.ID !== id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
};

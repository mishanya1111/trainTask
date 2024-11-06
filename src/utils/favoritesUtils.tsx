import { Artwork } from '@constants/types';

export const getFavorites = (): Artwork[] => {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
};

export const isFavorite = (ID: number): boolean =>
    getFavorites().some((fav: Artwork) => fav.ID === ID);

export const addToFavorites = (artwork: Artwork): void => {
    const favorites = getFavorites();
    const isAlreadyFavorite = isFavorite(artwork.ID);

    if (!isAlreadyFavorite) {
        const updatedFavorites = [...favorites, artwork];
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
};

export const removeFromFavorites = (id: number): void => {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter((item: Artwork) => item.ID !== id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
};

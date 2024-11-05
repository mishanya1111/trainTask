export const getFavorites = () => {
    //localStorage.setItem('favorites', []);
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
};

export const isFavorite = ID => getFavorites().some(fav => fav.ID === ID);

export const addToFavorites = artwork => {
    const favorites = getFavorites();
    //console.log(artwork);
    //console.log(favorites);

    const isAlreadyFavorite = isFavorite(artwork.ID);
    //console.log(isAlreadyFavorite);

    if (!isAlreadyFavorite) {
        const updatedFavorites = [...favorites, artwork];
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
};

export const removeFromFavorites = id => {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(item => item.ID !== id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
};

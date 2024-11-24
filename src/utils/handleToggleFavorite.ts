import { ARTWORK } from '@constants/types';
import LocalStorageManager from '@utils/favoritesUtils';

export const handleToggleFavorite = (work: ARTWORK): boolean => {
    const isFavorite = LocalStorageManager.isFavorite(work.ID);

    if (isFavorite) {
        LocalStorageManager.removeFromFavorites(work.ID);
        return false;
    } else {
        LocalStorageManager.addToFavorites({
            ...work,
            isFavorite: true
        });
        return true;
    }
};

import { ARTWORK } from '@constants/types';

class LocalStorageManager {
    private static readonly KEY = 'favorites';

    // Получить данные из localStorage
    public static getFavorites(): ARTWORK[] {
        const favorites = localStorage.getItem(this.KEY);
        return favorites ? JSON.parse(favorites) : [];
    }

    // Проверить, является ли элемент любимым
    public static isFavorite(ID: number): boolean {
        return this.getFavorites().some((fav: ARTWORK) => fav.ID === ID);
    }

    // Добавить элемент в список любимчиков
    public static addToFavorites(artwork: ARTWORK): void {
        const favorites = this.getFavorites();
        const isAlreadyFavorite = this.isFavorite(artwork.ID);

        if (!isAlreadyFavorite) {
            const updatedFavorites = [...favorites, artwork];
            localStorage.setItem(this.KEY, JSON.stringify(updatedFavorites));
        }
    }

    // Удалить элемент из списка
    public static removeFromFavorites(ID: number): void {
        const favorites = this.getFavorites();
        const updatedFavorites = favorites.filter((item: ARTWORK) => item.ID !== ID);
        localStorage.setItem(this.KEY, JSON.stringify(updatedFavorites));
    }

    // Очистить весь список
    public static clearFavorites(): void {
        localStorage.removeItem(this.KEY);
    }
}

export default LocalStorageManager;

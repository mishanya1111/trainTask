import { addToFavorites, getFavorites } from './favoritesUtils';

describe('Favorites Utilities', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('should add an item to favorites', () => {
        const artwork = {
            ID: 1,
            title: 'Mona Lisa',
            author: 'Leonardo da Vinci',
            is_public_domain: true,
            imageId: 'abc123',
        };

        addToFavorites(artwork);

        const favorites = getFavorites();
        expect(favorites).toHaveLength(1);
        expect(favorites[0]).toEqual(artwork);
    });

    it('should not add duplicate items to favorites', () => {
        const artwork = {
            ID: 1,
            title: 'Mona Lisa',
            author: 'Leonardo da Vinci',
            is_public_domain: true,
            imageId: 'abc123',
        };

        addToFavorites(artwork);
        addToFavorites(artwork);

        const favorites = getFavorites();
        expect(favorites).toHaveLength(1);
    });
});

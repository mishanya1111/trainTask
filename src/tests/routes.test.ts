import { FAVORITES_PAGE_ROUTE, HOME_PAGE_ROUTE } from '../constants/routes';

describe('Routes constants', () => {
    it('should define HOME_PAGE_ROUTE correctly', () => {
        expect(HOME_PAGE_ROUTE).toBe('/trainTask');
    });

    it('should define FAVORITES_PAGE_ROUTE correctly', () => {
        expect(FAVORITES_PAGE_ROUTE).toBe('/trainTask/favorites');
    });
});

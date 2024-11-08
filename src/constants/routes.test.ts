//import { FAVORITES_PAGE_ROUTE, HOME_PAGE_ROUTE } from '@constants/routes'; я так и не смог нормально сработать с алиасами
//первый
import { FAVORITES_PAGE_ROUTE, HOME_PAGE_ROUTE } from './routes';

describe('Routes constants', () => {
    it('should define HOME_PAGE_ROUTE correctly', () => {
        expect(HOME_PAGE_ROUTE).toBe('/trainTask');
    });

    it('should define FAVORITES_PAGE_ROUTE correctly', () => {
        expect(FAVORITES_PAGE_ROUTE).toBe('/trainTask/favorites');
    });
});


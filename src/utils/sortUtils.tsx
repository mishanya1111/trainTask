import { ARTWORK } from '@constants/types';

export function sortArtworks(artworks: ARTWORK[], criterion: string): ARTWORK[] {
    return [...artworks].sort((a, b) => {
        switch (criterion) {
            case 'name':
                return (a.title || '').localeCompare(b.title || '');
            case 'author':
                return (a.author || '').localeCompare(b.author || '');
            case 'year':
                return (a.year ?? Infinity) - (b.year ?? Infinity);
            case 'availability': {
                const aAvailability = a.is_public_domain ?? false;
                const bAvailability = b.is_public_domain ?? false;
                return aAvailability === bAvailability ? 0 : aAvailability ? 1 : -1;
            }
            default:
                return 0;
        }
    });
}

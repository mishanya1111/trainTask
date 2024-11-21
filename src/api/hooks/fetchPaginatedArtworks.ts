import { ARTWORK, ARTWORK_FETCH } from '@constants/types';
import { URL_ARTWORKS } from '@constants/URL';
const cache: Record<string, { artworks: ARTWORK[]; totalPages: number }> = {};

export const fetchPaginatedArtworks = async (
    page: number,
    limit: number
): Promise<{ artworks: ARTWORK[]; totalPages: number }> => {
    const cacheKey = `${page}-${limit}`;
    if (cache[cacheKey]) {
        return cache[cacheKey]; // Возврат данных из кэша
    }

    const response = await fetch(`${URL_ARTWORKS}?page=${page}&limit=${limit}`);

    if (!response.ok) {
        throw new Error('Failed to fetch artworks');
    }

    const data = await response.json();
    const result = {
        artworks: data.data.map(
            (artwork: ARTWORK_FETCH): ARTWORK => ({
                ID: artwork.id,
                title: artwork.title,
                author: artwork.artist_title || null,
                is_public_domain: artwork.is_public_domain,
                imageId: artwork.image_id,
                year: artwork.fiscal_year ?? undefined
            })
        ),
        totalPages: data.pagination.total_pages
    };

    cache[cacheKey] = result; // Сохраняем в кэш
    return result;
};

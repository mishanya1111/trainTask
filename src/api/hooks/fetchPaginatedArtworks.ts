import { ARTWORK, ARTWORK_FETCH } from '@constants/types';
import { API_BASE_URL } from '@constants/URL';

export const fetchPaginatedArtworks = async (
    page: number,
    limit: number
): Promise<{ artworks: ARTWORK[]; totalPages: number }> => {
    const response = await fetch(
        `${API_BASE_URL}/artworks?page=${page}&limit=${limit}`
    );

    if (!response.ok) {
        throw new Error('Failed to fetch artworks');
    }

    const data = await response.json();
    return {
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
};

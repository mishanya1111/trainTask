import { ARTWORK,ARTWORK_FETCH } from '@constants/types';
import { API_BASE_URL, FIELDS, URL_DETAIL } from '@constants/URL';
import { ArtworkError } from '@utils/class/ArtworkError';

export const fetchArtworkDetails = async (id: string): Promise<ARTWORK> => {
    const response = await fetch(`${URL_DETAIL}${id}`);
    if (!response.ok) {
        throw new ArtworkError('Failed to fetch artwork details.');
    }
    const data = await response.json();
    return data.data;
};

export const fetchArtworks = async (query: string): Promise<ARTWORK[]> => {
    const url = query
        ? API_BASE_URL +
          `/artworks/search?q=${encodeURIComponent(query) + '&' + FIELDS}`
        : API_BASE_URL + '/artworks/?' + FIELDS;

    const response = await fetch(url);
    if (!response.ok) {
        throw new ArtworkError('Failed to fetch artworks.');
    }

    const data = await response.json();
    return data.data.map(
        (artwork: ARTWORK_FETCH): ARTWORK => ({
            ID: artwork.id,
            title: artwork.title,
            author: artwork.artist_title || null,
            is_public_domain: artwork.is_public_domain,
            imageId: artwork.image_id,
            year: artwork.fiscal_year ?? undefined
        })
    );
};

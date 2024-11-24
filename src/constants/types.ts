export interface ARTWORK {
    ID: number;
    title: string;
    author: string | null;
    is_public_domain: boolean;
    imageId: string;
    year?: number;
    isFavorite: boolean;
}

export interface ERROR_BOUNDARY_STATE {
    hasError: boolean;
    error: Error | null;
}

export interface ARTWORK_FETCH {
    id: number;
    title: string;
    artist_title: string | null;
    is_public_domain: boolean;
    image_id: string;
    fiscal_year: number | undefined;
}

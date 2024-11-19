export interface ARTWORK {
    ID: number;
    title: string;
    author: string | null;
    is_public_domain: boolean;
    imageId: string;
    year?: number;
    favoritePage?: boolean;
}
export interface ARRAY_ARTWORK {
    works: ARTWORK[];
}

export interface PAGINATED_WORKS_PROPS {
    works: ARTWORK[];
    cardsPerPage: number;
    sortCriterion: string;
    onSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface ERROR_BOUNDARY_STATE {
    hasError: boolean;
    error: Error | null;
}


export interface PAGINATED_CARD_PROPS {
    linkID: number;
    title: string;
    author: string | null;
    imageId: string;
    is_public_domain: boolean;
    onClickHandler: () => void;
}

export interface WORK_CARD_PROPS {
    favoritePage: boolean;
    linkID: number;
    title: string;
    author: string | null;
    imageId: string;
    is_public_domain: boolean;
    onClickHandler: () => void;
}

export
interface ARTWORK_IMAGE_PROPS {
    imageId: string | undefined;
    sizes?: number[];
    alt?: string;
}

export interface ARTWORK_FETCH {
    id: number;
    title: string;
    artist_title: string | null;
    is_public_domain: boolean;
    image_id: string ;
    fiscal_year: number | undefined;
}



export interface SEARCH_FORM_INPUTS {
    query: string;
}

export interface SEARCH_SCREEN_PROPS {
    onSearch: (query: string) => void;
}
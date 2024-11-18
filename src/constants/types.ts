export interface ARTWORK {

    ID: number;
    title: string;
    author: string | null;
    is_public_domain: boolean;
    imageId: string;
    year?: number;
    favoritePage?: boolean;
}

export interface PAGINATED_WORKS_PROPS {
    works: ARTWORK[];
    cardsPerPage: number;
    sortCriterion: string;
    onSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}


export interface PAGINATED_CARD_PROPS {
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
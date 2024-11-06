export interface Artwork {

    ID: number;
    title: string;
    author: string | null;
    is_public_domain: boolean;
    imageId: string;
    year?: number;
    favoritePage?: boolean;
}

export interface PaginatedWorksProps {
    works: Artwork[];
    cardsPerPage: number;
    sortCriterion: string;
    onSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}


export interface PaginatedCardProps {
    linkID: number;
    title: string;
    author: string | null;
    imageId: string;
    is_public_domain: boolean;
    onClickHandler: () => void;
}

export
interface ArtworkImageProps {
    imageId: string | undefined;
    sizes?: number[];
    alt?: string;
}
export interface UseImageLoaderReturn {
    imageSrc: string | null;
    loading: boolean;
    error: string | null;
}
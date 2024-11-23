import { useFetch } from '@api/hooks/useFetch';
import { usePaginatedArtworks } from '@api/hooks/usePaginatedArtworks';
import { ARTWORK, ARTWORK_FETCH } from '@constants/types';
import { FIELDS, LIMITS, URL_ARTWORKS } from '@constants/URL';
import {
    MONITOR_WIDTH,
    SMARTPHONE_WIDTH,
    TABLET_WIDTH
} from '@constants/winowsWidth';
import LocalStorageManager from '@utils/favoritesUtils';
import useDebounce from '@utils/hooks/useDebounce';
import { useWindowWidth } from '@utils/hooks/useWindowWidth';
import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState
} from 'react';

interface ArtworksContextProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    cardsPerPage: number;
    paginatedArtworks: ARTWORK[];
    setPaginatedPage: (page: number) => void;
    totalPaginatedPages: number;
    otherWorks: ARTWORK[];
    toggleFavorite: (id: number) => void;
    setCurrentPaginatedPage: (page: number) => void;
    currentPaginatedPage: number;
    loadingPaginating: boolean;
    errorPaginating: string | null;
    loadingOther: boolean;
    errorOther: string | null;
}

const ArtworksContext = createContext<ArtworksContextProps | undefined>(undefined);

export const ArtworksProvider: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentPaginatedPage, setCurrentPaginatedPage] = useState<number>(1);

    const [paginatedArtworks, setPaginatedArtworks] = useState<ARTWORK[]>([]);
    const [otherWorks, setOtherWorks] = useState<ARTWORK[]>([]);
    const [totalPaginatedPages, setTotalPaginatedPages] = useState(0);
    const windowWidth = useWindowWidth();

    const cardsPerPage = useMemo(() => {
        if (windowWidth <= SMARTPHONE_WIDTH) return 1;
        if (windowWidth <= TABLET_WIDTH) return 2;
        if (windowWidth <= MONITOR_WIDTH) return 3;
        return 4;
    }, [windowWidth]);
    const debouncedQuery = useDebounce(searchQuery, 500);
    // Fetch paginated data
    const paginatedUrl = useMemo(() => {
        const queryParam = searchQuery
            ? `/search?q=${encodeURIComponent(searchQuery)}&`
            : '?';
        return `${URL_ARTWORKS}${queryParam}${FIELDS}&limit=${cardsPerPage}&page=${currentPaginatedPage}`;
    }, [debouncedQuery, currentPaginatedPage, cardsPerPage]);

    const {
        data: paginatedFetchData,
        loading: loadingPaginating,
        error: errorPaginating
    } = usePaginatedArtworks<ARTWORK_FETCH[]>(paginatedUrl);

    useMemo(() => {
        const updatedPaginatedArtworks = (paginatedFetchData?.artworks || []).map(
            artwork => ({
                ID: artwork.id,
                title: artwork.title,
                author: artwork.artist_title || null,
                is_public_domain: artwork.is_public_domain,
                imageId: artwork.image_id,
                year: artwork.fiscal_year ?? undefined,
                isFavorite: LocalStorageManager.isFavorite(artwork.id)
            })
        );
        setPaginatedArtworks(updatedPaginatedArtworks);
        setTotalPaginatedPages(paginatedFetchData?.totalPages || 0);
    }, [paginatedFetchData]);

    const otherWorksUrl = `${URL_ARTWORKS}?${FIELDS}&${LIMITS}`;
    const {
        data: otherWorksFetchData,
        loading: loadingOther,
        error: errorOther
    } = useFetch<ARTWORK_FETCH[]>(otherWorksUrl);
    useMemo(() => {
        const updatedOtherWorks = (otherWorksFetchData || []).map(artwork => ({
            ID: artwork.id,
            title: artwork.title,
            author: artwork.artist_title || null,
            is_public_domain: artwork.is_public_domain,
            imageId: artwork.image_id,
            year: artwork.fiscal_year ?? undefined,
            isFavorite: LocalStorageManager.isFavorite(artwork.id)
        }));
        setOtherWorks(updatedOtherWorks);
    }, [otherWorksFetchData]);

    // Toggle favorite
    const toggleFavorite = useCallback(
        (id: number) => {
            const isCurrentlyFavorite = LocalStorageManager.isFavorite(id);

            if (isCurrentlyFavorite) {
                LocalStorageManager.removeFromFavorites(id);
            } else {
                const artworkToFavorite =
                    paginatedArtworks.find(work => work.ID === id) ||
                    otherWorks.find(work => work.ID === id);

                if (artworkToFavorite) {
                    LocalStorageManager.addToFavorites({
                        ...artworkToFavorite,
                        isFavorite: true
                    });
                }
            }

            // Update both data sets
            const updateFavorites = (works: ARTWORK[]) =>
                works.map(work =>
                    work.ID === id
                        ? { ...work, isFavorite: !isCurrentlyFavorite }
                        : work
                );

            setPaginatedArtworks(prevWorks => updateFavorites(prevWorks));

            setOtherWorks(prevWorks => updateFavorites(prevWorks));
        },
        [paginatedArtworks, otherWorks]
    );

    return (
        <ArtworksContext.Provider
            value={{
                searchQuery,
                setSearchQuery,
                cardsPerPage,
                paginatedArtworks,
                setPaginatedPage: setCurrentPaginatedPage,
                totalPaginatedPages,
                otherWorks,
                toggleFavorite,
                setCurrentPaginatedPage,
                currentPaginatedPage,
                loadingPaginating,
                errorPaginating,
                loadingOther,
                errorOther
            }}
        >
            {children}
        </ArtworksContext.Provider>
    );
};

export const useArtworksContext = () => {
    const context = useContext(ArtworksContext);
    if (!context) {
        throw new Error('useArtworksContext must be used within ArtworksProvider');
    }
    return context;
};

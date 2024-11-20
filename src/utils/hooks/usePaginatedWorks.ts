import { fetchPaginatedArtworks } from '@api/hooks/fetchPaginatedArtworks';
import { ARTWORK } from '@constants/types';
import { useCallback, useEffect, useState } from 'react';

export default function usePaginatedWorks(cardsPerPage: number): {
    currentWorks: ARTWORK[];
    currentPage: number;
    totalPages: number;
    loading: boolean;
    handlePageChange: (page: number) => void;
    handleNextFour: () => void;
    handlePrevFour: () => void;
} {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [currentWorks, setCurrentWorks] = useState<ARTWORK[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const loadPageData = useCallback(
        async (page: number) => {
            setLoading(true);
            try {
                const { artworks, totalPages } = await fetchPaginatedArtworks(
                    page,
                    cardsPerPage
                );
                setCurrentWorks(artworks);
                setTotalPages(totalPages);
            } catch (error) {
                console.error('Failed to load paginated artworks', error);
            } finally {
                setLoading(false);
            }
        },
        [cardsPerPage]
    );

    useEffect(() => {
        loadPageData(currentPage);
    }, [currentPage, loadPageData]);

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

    const handleNextFour = useCallback(() => {
        setCurrentPage(prevPage => Math.min(prevPage + 4, totalPages));
    }, [totalPages]);

    const handlePrevFour = useCallback(() => {
        setCurrentPage(prevPage => Math.max(prevPage - 4, 1));
    }, []);

    return {
        currentWorks,
        currentPage,
        totalPages,
        loading,
        handlePageChange,
        handleNextFour,
        handlePrevFour
    };
}

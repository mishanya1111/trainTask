import { useArtworksContext } from '@utils/ArtworksContext';
import { useCallback } from 'react';

export default function usePaginatedWorks(): {
    handlePageChange: (page: number) => void;
    handleNextFour: () => void;
    handlePrevFour: () => void;
} {
    const { setCurrentPaginatedPage, totalPaginatedPages, currentPaginatedPage } =
        useArtworksContext();

    const handlePageChange = useCallback(
        (page: number) => {
            setCurrentPaginatedPage(page);
        },
        [setCurrentPaginatedPage]
    );

    const handleNextFour = useCallback(() => {
        setCurrentPaginatedPage(
            Math.min(currentPaginatedPage + 4, totalPaginatedPages)
        );
    }, [totalPaginatedPages, currentPaginatedPage, setCurrentPaginatedPage]);

    const handlePrevFour = useCallback(() => {
        setCurrentPaginatedPage(Math.max(currentPaginatedPage - 4, 1));
    }, [currentPaginatedPage, setCurrentPaginatedPage]);

    return {
        handlePageChange,
        handleNextFour,
        handlePrevFour
    };
}

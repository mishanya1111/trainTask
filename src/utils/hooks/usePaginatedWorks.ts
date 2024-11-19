import { PAGINATED_WORKS_PROPS } from '@constants/types';
import { useCallback, useMemo, useState } from 'react';

export default function usePaginatedWorks(
    works: PAGINATED_WORKS_PROPS['works'],
    cardsPerPage: number
) {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const totalPages = useMemo(
        () => Math.ceil(works.length / cardsPerPage),
        [works.length, cardsPerPage]
    );

    const handlePageChange = useCallback((newPage: number) => {
        setCurrentPage(newPage);
    }, []);

    const handleNextFour = useCallback(() => {
        setCurrentPage(prevPage => Math.min(prevPage + 4, totalPages));
    }, [totalPages]);

    const handlePrevFour = useCallback(() => {
        setCurrentPage(prevPage => Math.max(prevPage - 4, 1));
    }, []);

    const indexOfLastCard = useMemo(
        () => currentPage * cardsPerPage,
        [currentPage, cardsPerPage]
    );
    const indexOfFirstCard = useMemo(
        () => indexOfLastCard - cardsPerPage,
        [indexOfLastCard, cardsPerPage]
    );

    const currentWorks = useMemo(
        () => works.slice(indexOfFirstCard, indexOfLastCard),
        [works, indexOfFirstCard, indexOfLastCard]
    );

    const startPage = useMemo(() => Math.max(1, currentPage - 2), [currentPage]);
    const endPage = useMemo(
        () => Math.min(totalPages, startPage + 3),
        [totalPages, startPage]
    );

    return {
        currentWorks,
        currentPage,
        totalPages,
        handlePageChange,
        handleNextFour,
        handlePrevFour,
        startPage,
        endPage
    };
}

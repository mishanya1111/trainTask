import { PAGINATED_WORKS_PROPS } from '@constants/types';
import { useState } from 'react';

//Кастомный хук для управления пагинацией.

export default function usePaginatedWorks(
    works: PAGINATED_WORKS_PROPS['works'],
    cardsPerPage: number
) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalPages = Math.ceil(works.length / cardsPerPage);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleNextFour = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 4, totalPages));
    };

    const handlePrevFour = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 4, 1));
    };

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentWorks = works.slice(indexOfFirstCard, indexOfLastCard);

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 3);

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

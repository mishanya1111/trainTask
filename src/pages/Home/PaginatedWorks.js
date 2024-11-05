import React, { useState } from 'react';
import PaginatedCard from './PaginatedCard';
import { addToFavorites } from '../../utils/favoritesUtils';

const PaginatedWorks = ({ works, cardsPerPage, sortCriterion, onSortChange }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(works.length / cardsPerPage);

    const handlePageChange = newPage => {
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

    // Вычисляем диапазон видимых номеров страниц
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 3);

    return (
        <div className="paginated-works">
            <div className="filter-container">
                <div></div>
                <div></div>
                <h2>Other works for you</h2>
                <div>
                    <label htmlFor="sort-select">Filter: </label>
                    <select
                        id="sort-select"
                        value={sortCriterion}
                        onChange={onSortChange}
                    >
                        <option value="name">By Name</option>
                        <option value="author">By Author</option>
                        <option value="year">By Year</option>
                        <option value="availability">By Availability</option>
                    </select>
                </div>
            </div>
            <div className="paginated-work-card-container">
                {currentWorks.map((work, index) => (
                    <PaginatedCard
                        key={index}
                        linkID={work.ID}
                        title={work.title}
                        author={work.author}
                        imageId={work.imageId}
                        is_public_domain={work.is_public_domain}
                        onClickHandler={() => addToFavorites(work)}
                    />
                ))}
            </div>
            <div className="pagination-controls">
                <button
                    onClick={handlePrevFour}
                    className={currentPage <= 2 ? 'hidden' : 'prev-four'}
                >
                    {'<'}
                </button>
                {Array.from(
                    { length: endPage - startPage + 1 },
                    (_, i) => startPage + i
                ).map(page => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={currentPage === page ? 'active' : ''}
                    >
                        {page}
                    </button>
                ))}
                <button
                    onClick={handleNextFour}
                    className={currentPage > totalPages - 2 ? 'hidden' : 'next-four'}
                >
                    {'>'}
                </button>
            </div>
        </div>
    );
};

export default PaginatedWorks;

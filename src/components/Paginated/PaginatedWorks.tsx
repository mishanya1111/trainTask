import React from 'react';
import PaginatedCard from '@components/Paginated/PaginatedCard';
import { addToFavorites } from '@utils/favoritesUtils';
import { PAGINATED_WORKS_PROPS } from '@constants/types';
import usePaginatedWorks from '@utils/hooks/usePaginatedWorks';

function PaginatedWorks({
    works,
    cardsPerPage,
    sortCriterion,
    onSortChange
}: PAGINATED_WORKS_PROPS): JSX.Element {
    const {
        currentWorks,
        currentPage,
        totalPages,
        handlePageChange,
        handleNextFour,
        handlePrevFour,
        startPage,
        endPage
    } = usePaginatedWorks(works, cardsPerPage);

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
                {currentWorks.map(work => (
                    <PaginatedCard
                        key={work.ID}
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
}

export default PaginatedWorks;

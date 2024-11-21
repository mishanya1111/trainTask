import Loader from '@components/Loader/Loader';
import PaginatedCard from '@components/PaginatedCard';
import LocalStorageManager from '@utils/favoritesUtils';
import usePaginatedWorks from '@utils/hooks/usePaginatedWorks';
import React, { useMemo } from 'react';

function PaginatedWorks({ cardsPerPage }: { cardsPerPage: number }): JSX.Element {
    const {
        currentWorks,
        currentPage,
        totalPages,
        loading,
        handlePageChange,
        handleNextFour,
        handlePrevFour
    } = usePaginatedWorks(cardsPerPage);

    const startPage = useMemo(() => Math.max(1, currentPage - 2), [currentPage]);
    const endPage = useMemo(
        () => Math.min(totalPages, startPage + 3),
        [totalPages, startPage]
    );

    return (
        <div className="paginated-works">
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="paginated-work-card-container">
                        {currentWorks.map(work => (
                            <PaginatedCard
                                key={work.ID}
                                linkID={work.ID}
                                title={work.title}
                                author={work.author}
                                imageId={work.imageId}
                                is_public_domain={work.is_public_domain}
                                onClickHandler={() =>
                                    LocalStorageManager.addToFavorites(work)
                                }
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
                            className={
                                currentPage > totalPages - 2 ? 'hidden' : 'next-four'
                            }
                        >
                            {'>'}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default PaginatedWorks;

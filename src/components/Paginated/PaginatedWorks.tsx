import Loader from '@components/Loader/Loader';
import PaginatedCard from '@components/PaginatedCard';
import { useArtworksContext } from '@utils/ArtworksContext';
import usePaginatedWorks from '@utils/hooks/usePaginatedWorks';
import React, { useMemo } from 'react';

function PaginatedWorks(): JSX.Element {
    const {
        currentPaginatedPage,
        paginatedArtworks,
        totalPaginatedPages,
        loadingPaginating,
        toggleFavorite,
        errorPaginating
    } = useArtworksContext();
    const { handlePageChange, handleNextFour, handlePrevFour } = usePaginatedWorks();

    const startPage = useMemo(
        () => Math.max(1, currentPaginatedPage - 2),
        [currentPaginatedPage]
    );
    const endPage = useMemo(
        () => Math.min(totalPaginatedPages, startPage + 3),
        [totalPaginatedPages, startPage]
    );
    if (errorPaginating) return <h1>{errorPaginating}</h1>;

    return (
        <div className="paginated-works">
            {loadingPaginating ? (
                <Loader />
            ) : (
                <>
                    <div className="paginated-work-card-container">
                        {paginatedArtworks.map(work => (
                            <PaginatedCard
                                key={work.ID}
                                linkID={work.ID}
                                title={work.title}
                                author={work.author}
                                imageId={work.imageId}
                                is_public_domain={work.is_public_domain}
                                isFavorite={work.isFavorite}
                                onClickHandler={() => toggleFavorite(work.ID)}
                            />
                        ))}
                    </div>
                    <div className="pagination-controls">
                        <button
                            onClick={handlePrevFour}
                            className={
                                currentPaginatedPage <= 2 ? 'hidden' : 'prev-four'
                            }
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
                                className={
                                    currentPaginatedPage === page ? 'active' : ''
                                }
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={handleNextFour}
                            className={
                                currentPaginatedPage >= totalPaginatedPages - 2
                                    ? 'hidden'
                                    : 'next-four'
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

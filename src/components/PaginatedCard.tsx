import '@components/Paginated/PaginatedCard.css';

import ArtworkImage from '@api/ArtworkImage';
import bookmark from '@assets/img/svgBookmark.svg';
import unbookmark from '@assets/img/svgBookmarkIsFavorited.svg';
import { DETAILS_PAGE_ROUTE } from '@constants/routes';
import { PAGINATED_CARD_PROPS } from '@constants/types';
import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

const PaginatedCard: React.FC<PAGINATED_CARD_PROPS> = React.memo(
    ({
        linkID,
        title,
        author,
        imageId,
        is_public_domain,
        onClickHandler,
        isFavorite
    }) => {
        const sizesImage = [863, 1686, 600, 400, 200];

        const handleBookmarkClick = useCallback(() => {
            onClickHandler();
        }, [onClickHandler]);

        return (
            <div className="paginated-work-card">
                <div className="paginated-image-placeholder">
                    <Link to={DETAILS_PAGE_ROUTE + `/${linkID}`}>
                        <ArtworkImage
                            sizes={sizesImage}
                            imageId={imageId}
                            alt={title}
                        />
                    </Link>
                </div>
                <div className="overlay-card">
                    <div className="work-info">
                        <Link to={DETAILS_PAGE_ROUTE + `/${linkID}`}>
                            <h3 className="work-title">{title}</h3>
                        </Link>
                        <p className="work-author">{author}</p>
                        <p className="work-access">
                            {is_public_domain ? 'public' : 'private'}
                        </p>
                    </div>
                    <button
                        className={`bookmark-btn ${isFavorite ? 'bookmark-is-favorite' : ''}`}
                        onClick={handleBookmarkClick}
                    >
                        <img
                            src={isFavorite ? unbookmark : bookmark}
                            alt="bookmark"
                        />
                    </button>
                </div>
            </div>
        );
    }
);

PaginatedCard.displayName = 'PaginatedCard';

export default PaginatedCard;

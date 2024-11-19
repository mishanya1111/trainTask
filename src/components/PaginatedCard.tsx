import '@components/Paginated/PaginatedCard.css';

import bookmark from '@assets/img/svgBookmark.svg';
import { DETAILS_PAGE_ROUTE } from '@constants/routes';
import { PAGINATED_CARD_PROPS } from '@constants/types';
import ArtworkImage from '@utils/ArtworkImage';
import React from 'react';
import { Link } from 'react-router-dom';

function PaginatedCard({
    linkID,
    title,
    author,
    imageId,
    is_public_domain,
    onClickHandler
}: PAGINATED_CARD_PROPS): JSX.Element {
    const sizesImage = [863, 1686, 600, 400, 200];

    return (
        <div className="paginated-work-card">
            <div className="paginated-image-placeholder">
                <Link to={DETAILS_PAGE_ROUTE + `/${linkID}`}>
                    <ArtworkImage sizes={sizesImage} imageId={imageId} alt={title} />
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
                <button className="bookmark-btn" onClick={onClickHandler}>
                    <img src={bookmark} alt="bookmark" />
                </button>
            </div>
        </div>
    );
}

export default PaginatedCard;

// PaginatedCard.tsx
import React from 'react';
import ArtworkImage from '@utils/Hooks/useImageLoader';
import '@pages/Home/PaginatedCard.css';
import bookmark from '@assets/img/bookmark.png';
import { Link } from 'react-router-dom';
import { PaginatedCardProps } from '@constants/types';

function PaginatedCard({
    linkID,
    title,
    author,
    imageId,
    is_public_domain,
    onClickHandler
}: PaginatedCardProps): JSX.Element {
    const sizesImage = [863, 1686, 600, 400, 200];

    return (
        <div className="paginated-work-card">
            <div className="paginated-image-placeholder">
                <Link to={`/trainTask/details/${linkID}`}>
                    <ArtworkImage sizes={sizesImage} imageId={imageId} alt={title} />
                </Link>
            </div>
            <div className="overlay-card">
                <div className="work-info">
                    <Link to={`/trainTask/details/${linkID}`}>
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

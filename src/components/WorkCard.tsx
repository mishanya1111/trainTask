import ArtworkImage from '@api/ArtworkImage';
import bookmark from '@assets/img/svgBookmark.svg';
import unbookmark from '@assets/img/svgBookmarkIsFavorited.svg';
import { DETAILS_PAGE_ROUTE } from '@constants/routes';
import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
interface WORK_CARD_PROPS {
    isFavorite: boolean;
    linkID: number;
    title: string;
    author: string | null;
    imageId: string;
    is_public_domain: boolean;
    onClickHandler: () => void;
}
const WorkCard: React.FC<WORK_CARD_PROPS> = React.memo(
    ({
        linkID,
        title,
        author,
        imageId,
        is_public_domain,
        onClickHandler,
        isFavorite
    }) => {
        const sizesImage: number[] = [200, 863, 600, 400, 1686];

        const handleBookmarkClick = useCallback(() => {
            onClickHandler();
        }, [onClickHandler]);

        return (
            <div className="work-card">
                <div className="image-placeholder">
                    <Link to={DETAILS_PAGE_ROUTE + `/${linkID}`}>
                        <ArtworkImage
                            sizes={sizesImage}
                            imageId={imageId}
                            alt={title ? title : 'Without name'}
                        />
                    </Link>
                </div>
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
                    <img src={isFavorite ? unbookmark : bookmark} alt="bookmark" />
                </button>
            </div>
        );
    }
);

WorkCard.displayName = 'WorkCard';

export default WorkCard;

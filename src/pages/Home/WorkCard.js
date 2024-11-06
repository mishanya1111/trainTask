import React from 'react';
import ArtworkImage from '@utils/Hooks/useImageLoader';
import bookmark from '@assets/img/bookmark.png';
import unbookmark from '@assets/img/unbookmark.png';
import { Link } from 'react-router-dom';

function WorkCard({
    favoritePage,
    linkID,
    title,
    author,
    imageId,
    is_public_domain,
    onClickHandler
}) {
    return (
        <div className="work-card">
            <div className="image-placeholder">
                <Link to={`/trainTask/details/${linkID}`}>
                    <ArtworkImage
                        size={['200', '863', '600', '400', '1686']}
                        imageId={imageId}
                        alt={title}
                    />
                </Link>
            </div>
            <div className="work-info">
                <Link to={`/trainTask/details/${linkID}`}>
                    <h3 className="work-title">{title}</h3>
                </Link>

                <p className="work-author">{author}</p>
                <p className="work-access">
                    {!is_public_domain ? 'public' : 'private'}
                </p>
            </div>
            <button className="bookmark-btn" onClick={onClickHandler}>
                <img src={favoritePage ? unbookmark : bookmark} alt="bookmark" />
            </button>
        </div>
    );
}

export default WorkCard;

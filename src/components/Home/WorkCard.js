import React from 'react';
import ArtworkImage from '../../Hooks/useImageLoader';
import bookmark from '../../img/bookmark.png';
import unbookmark from '../../img/unbookmark.png';
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
                <Link to={`/details/${linkID}`}>
                    <ArtworkImage size="200" imageId={imageId} />
                </Link>
            </div>
            <div className="work-info">
                <Link to={`/details/${linkID}`}>
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

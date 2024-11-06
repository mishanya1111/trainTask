import React from 'react';
import ArtworkImage from '@utils/Hooks/useImageLoader';
import bookmark from '@assets/img/bookmark.png';
import unbookmark from '@assets/img/unbookmark.png';
import { Link } from 'react-router-dom';

interface WorkCardProps {
    favoritePage: boolean;
    linkID: number ;
    title: string ;
    author: string | null;
    imageId: string ;
    is_public_domain: boolean;
    onClickHandler: () => void;
}

function WorkCard({
                      linkID,
                      title,
                      author,
                      imageId,
                      is_public_domain,
                      onClickHandler,
                      favoritePage
                  }: WorkCardProps) {
    const sizesImage : number[] = [200, 863, 600, 400, 1686];
    return (
        <div className="work-card">
            <div className="image-placeholder">
                <Link to={`/trainTask/details/${linkID}`}>
                    <ArtworkImage
                        sizes={sizesImage}
                        imageId={imageId}
                        alt={title ? title : 'Without name'}
                    />
                </Link>
            </div>
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
                <img src={favoritePage ? unbookmark : bookmark} alt="bookmark" />
            </button>
        </div>
    );
}

export default WorkCard;

import React from 'react';
import WorkCard from './WorkCard';
import { addToFavorites } from '../Favorites/favoritesUtils';

// @ts-ignore
export default function OtherWorks({ works }) {
    return (
        <div className="other-works">
            <h4> Here some more</h4>
            <h2>Other works for you</h2>
            <div className="work-card-container">
                {works.map((work, index) => (
                    <WorkCard
                        key={index}
                        linkID={work.ID}
                        title={work.title}
                        author={work.author}
                        imageId={work.imageId}
                        is_public_domain={work.is_public_domain}
                        onClickHandler={() => addToFavorites(work)}
                    />
                ))}
            </div>
        </div>
    );
}

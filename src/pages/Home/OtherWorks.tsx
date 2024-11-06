import React from 'react';
import WorkCard from '@pages/Home/WorkCard';
import { addToFavorites } from '@utils/favoritesUtils';
interface Artwork {
    ID: number ;
    title: string;
    author: string | null;
    is_public_domain: boolean;
    imageId: string ;
}


export default function OtherWorks(works : Artwork[]) {
    return (
        <div className="other-works">
            <h4> Here some more</h4>
            <h2>Other works for you</h2>
            <div className="work-card-container">
                {works.map((work : Artwork, index :number ) => (
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

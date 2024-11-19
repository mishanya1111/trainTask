import React from 'react';
import WorkCard from '@components/WorkCard';
import { addToFavorites } from '@utils/favoritesUtils';
import { ARRAY_ARTWORK } from '@constants/types';

//Отображает все карточки которые передаются из Home
function OtherWorks({ works }: ARRAY_ARTWORK) {
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
                        favoritePage={false}
                    />
                ))}
            </div>
        </div>
    );
}

export default OtherWorks;

import WorkCard from '@components/WorkCard';
import { ARRAY_ARTWORK, ARTWORK } from '@constants/types';
import { handleToggleFavorite } from '@utils/handleToggleFavorite';
import React, { useCallback, useState } from 'react';

function OtherWorks({ works }: ARRAY_ARTWORK) {
    const [updatedWorks, setUpdatedWorks] = useState<ARTWORK[]>(works);
    const handleFavoriteToggle = useCallback((work: ARTWORK) => {
        const wasAdded = handleToggleFavorite(work);
        setUpdatedWorks(prevWorks =>
            prevWorks.map(item =>
                item.ID === work.ID ? { ...item, isFavorite: wasAdded } : item
            )
        );
    }, []);

    return (
        <div className="other-works">
            <h4>Here some more</h4>
            <h2>Other works for you</h2>
            <div className="work-card-container">
                {updatedWorks.map(work => (
                    <WorkCard
                        key={work.ID}
                        linkID={work.ID}
                        title={work.title}
                        author={work.author}
                        imageId={work.imageId}
                        is_public_domain={work.is_public_domain}
                        onClickHandler={() => handleFavoriteToggle(work)}
                        isFavorite={work.isFavorite}
                    />
                ))}
            </div>
        </div>
    );
}

export default React.memo(OtherWorks);

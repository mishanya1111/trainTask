import Filter from '@components/Filter';
import WorkCard from '@components/WorkCard';
import { ARRAY_ARTWORK } from '@constants/types';
import { useArtworksContext } from '@utils/ArtworksContext';
import React from 'react';

function OtherWorks({ works }: ARRAY_ARTWORK) {
    const { toggleFavorite } = useArtworksContext();

    return (
        <div className="other-works">
            <Filter />
            <div className="work-card-container">
                {works.map(work => (
                    <WorkCard
                        key={work.ID}
                        linkID={work.ID}
                        title={work.title}
                        author={work.author}
                        imageId={work.imageId}
                        is_public_domain={work.is_public_domain}
                        onClickHandler={() => toggleFavorite(work.ID)}
                        isFavorite={work.isFavorite}
                    />
                ))}
            </div>
        </div>
    );
}

export default React.memo(OtherWorks);

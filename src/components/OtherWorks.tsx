import Filter from '@components/Filter';
import WorkCard from '@components/WorkCard';
import { useArtworksContext } from '@utils/ArtworksContext';
import React from 'react';

function OtherWorks() {
    const { toggleFavorite, otherWorks: works } = useArtworksContext();

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

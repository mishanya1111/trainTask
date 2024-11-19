import WorkCard from '@components/WorkCard';
import { ARRAY_ARTWORK, ARTWORK } from '@constants/types';
import LocalStorageManager from '@utils/favoritesUtils';

//Отображает все карточки которые передаются из Home
function OtherWorks({ works }: ARRAY_ARTWORK) {
    const handleAddToFavorites = (work: ARTWORK) => {
        LocalStorageManager.addToFavorites(work);
    };

    return (
        <div className="other-works">
            <h4> Here some more</h4>
            <h2>Other works for you</h2>
            <div className="work-card-container">
                {works.map(work => (
                    <WorkCard
                        key={work.ID}
                        linkID={work.ID}
                        title={work.title}
                        author={work.author}
                        imageId={work.imageId}
                        is_public_domain={work.is_public_domain}
                        onClickHandler={() => handleAddToFavorites(work)}
                        favoritePage={false}
                    />
                ))}
            </div>
        </div>
    );
}

export default OtherWorks;

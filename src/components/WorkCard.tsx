import bookmark from '@assets/img/svgBookmark.svg';
import unbookmark from '@assets/img/unbookmark.png';
import { DETAILS_PAGE_ROUTE } from '@constants/routes';
import { WORK_CARD_PROPS } from '@constants/types';
import ArtworkImage from '@utils/ArtworkImage';
import { Link } from 'react-router-dom';

//Компонент используюшийся в двух местах, представляет собой блок с небольшой информацией
function WorkCard({
    linkID,
    title,
    author,
    imageId,
    is_public_domain,
    onClickHandler,
    favoritePage
}: WORK_CARD_PROPS) {
    const sizesImage: number[] = [200, 863, 600, 400, 1686];
    return (
        <div className="work-card">
            <div className="image-placeholder">
                <Link to={DETAILS_PAGE_ROUTE + `/${linkID}`}>
                    <ArtworkImage
                        sizes={sizesImage}
                        imageId={imageId}
                        alt={title ? title : 'Without name'}
                    />
                </Link>
            </div>
            <div className="work-info">
                <Link to={DETAILS_PAGE_ROUTE + `/${linkID}`}>
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

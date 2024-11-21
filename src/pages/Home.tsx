import { useFetch } from '@api/hooks/useFetch';
import Loader from '@components/Loader/Loader';
import OtherWorks from '@components/OtherWorks';
import PaginatedWorks from '@components/Paginated/PaginatedWorks';
import SearchScreen from '@components/SearchScreen';
import { ARTWORK, ARTWORK_FETCH } from '@constants/types';
import { FIELDS, LIMITS, URL_ARTWORKS } from '@constants/URL';
import {
    MONITOR_WIDTH,
    SMARTPHONE_WIDTH,
    TABLET_WIDTH
} from '@constants/winowsWidth';
import LocalStorageManager from '@utils/favoritesUtils';
import useDebounce from '@utils/hooks/useDebounce';
import { useWindowWidth } from '@utils/hooks/useWindowWidth';
import { sortArtworks } from '@utils/sortUtils';
import { useMemo, useState } from 'react';

function Home(): JSX.Element {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const debouncedQuery = useDebounce(searchQuery, 500);

    // Формируем URL для запроса
    const queryParam = debouncedQuery
        ? `/search?q=${encodeURIComponent(debouncedQuery)}&`
        : '?';
    const url = `${URL_ARTWORKS}${queryParam}${FIELDS}&${LIMITS}`;

    const { data: artworks, loading, error } = useFetch<ARTWORK_FETCH[]>(url);

    // Обработка данных
    const processedArtworks: ARTWORK[] = useMemo(() => {
        return (artworks || []).map((artwork: ARTWORK_FETCH) => ({
            ID: artwork.id,
            title: artwork.title,
            author: artwork.artist_title || null,
            is_public_domain: artwork.is_public_domain,
            imageId: artwork.image_id,
            year: artwork.fiscal_year ?? undefined,
            isFavorite: LocalStorageManager.isFavorite(artwork.id)
        }));
    }, [artworks]);

    const sortCriterion = 'name';
    const windowWidth = useWindowWidth();

    const cardsPerPage = useMemo(() => {
        if (windowWidth <= SMARTPHONE_WIDTH) return 1;
        if (windowWidth <= TABLET_WIDTH) return 2;
        if (windowWidth <= MONITOR_WIDTH) return 3;
        return 4;
    }, [windowWidth]);

    const handleSearch = (query: string) => setSearchQuery(query);

    const sortedArtworks: ARTWORK[] = useMemo(
        () => sortArtworks(processedArtworks, sortCriterion),
        [processedArtworks, sortCriterion]
    );

    if (error) return <p>Error in home page: {error}</p>;

    return (
        <div>
            <aside>
                <SearchScreen onSearch={handleSearch} />
            </aside>
            <section>
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <PaginatedWorks cardsPerPage={cardsPerPage} />
                        <OtherWorks works={sortedArtworks} />
                    </>
                )}
            </section>
        </div>
    );
}

export default Home;

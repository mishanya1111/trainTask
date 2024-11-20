import Loader from '@components/Loader/Loader';
import OtherWorks from '@components/OtherWorks';
import PaginatedWorks from '@components/Paginated/PaginatedWorks';
import SearchScreen from '@components/SearchScreen';
import { ARTWORK } from '@constants/types';
import {
    MONITOR_WIDTH,
    SMARTPHONE_WIDTH,
    TABLET_WIDTH
} from '@constants/winowsWidth';
import useArtworksFetcher from '@utils/hooks/useArtworkFetcher';
import useDebounce from '@utils/hooks/useDebounce';
import { useWindowWidth } from '@utils/hooks/useWindowWidth';
import { sortArtworks } from '@utils/sortUtils';
import { useMemo, useState } from 'react';

function Home(): JSX.Element {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const debouncedQuery = useDebounce(searchQuery, 500);
    const { artworks, loading, error } = useArtworksFetcher(debouncedQuery);
    //const [sortCriterion, setSortCriterion] = useState<string>('name');
    const sortCriterion = 'name';
    const windowWidth = useWindowWidth();

    const cardsPerPage = useMemo(() => {
        if (windowWidth <= SMARTPHONE_WIDTH) return 1;
        if (windowWidth <= TABLET_WIDTH) return 2;
        if (windowWidth <= MONITOR_WIDTH) return 3;
        return 4;
    }, [windowWidth]);

    const handleSearch = (query: string) => setSearchQuery(query);

    /*const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortCriterion(event.target.value);
    };*/

    const sortedArtworks: ARTWORK[] = useMemo(
        () => sortArtworks(artworks, sortCriterion),
        [artworks, sortCriterion]
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

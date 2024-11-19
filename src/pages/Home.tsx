import Loader from '@components/Loader/Loader';
import OtherWorks from '@components/OtherWorks';
import PaginatedWorks from '@components/Paginated/PaginatedWorks';
import SearchScreen from '@components/SearchScreen';
import { ARTWORK } from '@constants/types';
import useArtworksFetcher from '@utils/hooks/useArtworkFetcher';
import useDebounce from '@utils/hooks/useDebounce';
import { useWindowWidth } from '@utils/hooks/useWindowWidth';
import { sortArtworks } from '@utils/sortUtils';
import { useState } from 'react';

function Home(): JSX.Element {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const debouncedQuery = useDebounce(searchQuery, 500);
    const { artworks, loading, error } = useArtworksFetcher(debouncedQuery);
    const [sortCriterion, setSortCriterion] = useState<string>('name');

    const windowWidth = useWindowWidth();
    const cardsPerPage =
        windowWidth <= 900
            ? 1
            : windowWidth <= 1200
              ? 2
              : windowWidth <= 1920
                ? 3
                : 4;

    const handleSearch = (query: string) => setSearchQuery(query);

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortCriterion(event.target.value);
    };

    const sortedArtworks: ARTWORK[] = sortArtworks(artworks, sortCriterion);

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
                        <PaginatedWorks
                            works={sortedArtworks}
                            cardsPerPage={cardsPerPage}
                            sortCriterion={sortCriterion}
                            onSortChange={handleSortChange}
                        />
                        <OtherWorks works={sortedArtworks} />
                    </>
                )}
            </section>
        </div>
    );
}

export default Home;

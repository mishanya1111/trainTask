import React, { useState, useEffect } from 'react';
import SearchScreen from '@components/SearchScreen';
import OtherWorks from '@components/OtherWorks';
import PaginatedWorks from '@components/Paginated/PaginatedWorks';
import useArtworksFetcher from '@utils/Hooks/useArtworkFetcher';
import useDebounce from '@utils/Hooks/useDebounce';
import Loader from '@components/Loader/Loader';
import { ARTWORK } from '@constants/types';

//function Favorites():JSX.Element
function Home(): JSX.Element {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const debouncedQuery = useDebounce(searchQuery, 500);
    const { artworks, loading, error } = useArtworksFetcher(debouncedQuery);
    const [cardsPerPage, setCardsPerPage] = useState<number>(4);
    const [sortCriterion, setSortCriterion] = useState<string>('name');

    useEffect(() => {
        const handleResize = () => {
            const widthWindow = window.innerWidth;
            setCardsPerPage(
                widthWindow <= 900
                    ? 1
                    : widthWindow <= 1200
                      ? 2
                      : widthWindow <= 1920
                        ? 3
                        : 4
            );
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortCriterion(event.target.value);
    };
    const sortedArtworks: ARTWORK[] = [...artworks].sort(
        (a: ARTWORK, b: ARTWORK) => {
            switch (sortCriterion) {
                case 'name':
                    return (a.title || '').localeCompare(b.title || '');
                case 'author':
                    return (a.author || '').localeCompare(b.author || '');
                case 'year':
                    return (a.year ?? Infinity) - (b.year ?? Infinity);
                case 'availability': {
                    const aAvailability = a.is_public_domain ?? false;
                    const bAvailability = b.is_public_domain ?? false;
                    return aAvailability === bAvailability
                        ? 0
                        : aAvailability
                          ? 1
                          : -1;
                }
                default:
                    return 0;
            }
        }
    );

    if (error) return <p>Error in home page: {error}</p>;
    //console.log(artworks);
    //console.log(sortedArtworks);
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

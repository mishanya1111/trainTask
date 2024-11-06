import React, { useState, useEffect } from 'react';
import SearchScreen from '@pages/Home/SearchScreen';
import OtherWorks from '@pages/Home/OtherWorks';
import PaginatedWorks from '@pages/Home/PaginatedWorks';
import useArtworksFetcher from '@utils/Hooks/useArtworkFetcher';
import useDebounce from '@utils/Hooks/useDebounce';
import Loader from '@components/Loader/Loader';
import { Artwork } from '@constants/types';

//function Favorites():JSX.Element
function Home():JSX.Element{
    const [searchQuery, setSearchQuery] = useState<string>('');
    const debouncedQuery = useDebounce(searchQuery, 500);
    const { artworks, loading, error } = useArtworksFetcher(debouncedQuery);
    const [cardsPerPage, setCardsPerPage] = useState<number>(4);
    const [sortCriterion, setSortCriterion] = useState<string>('name');

    useEffect(() => {
        const handleResize = () => {
            const widthWindow = window.innerWidth;
            setCardsPerPage(
                widthWindow < 900
                    ? 1
                    : widthWindow < 1200
                        ? 2
                        : widthWindow < 1920
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

    const sortedArtworks : Artwork[] = [...artworks].sort((a: Artwork, b: Artwork) => {
        if (sortCriterion === 'name') {
            return (a.title || '').localeCompare(b.title || '');
        } else if (sortCriterion === 'author') {
            return (a.author || '').localeCompare(b.author || '');
        } else if (sortCriterion === 'year') {
            return (a.year ?? Infinity) - (b.year ?? Infinity);
        } else if (sortCriterion === 'availability') {
            const aAvailability = a.is_public_domain ?? false;
            const bAvailability = b.is_public_domain ?? false;
            return aAvailability === bAvailability ? 0 : aAvailability ? 1 : -1;
        }
        return 0;
    });

    if (error) return <p>Error in home page: {error}</p>;
    //console.log(artworks);
    //console.log(sortedArtworks);
    return (
        <div>
            <SearchScreen onSearch={handleSearch} />

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
        </div>
    );
}

export default Home;

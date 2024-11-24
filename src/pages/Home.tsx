import Loader from '@components/Loader/Loader';
import OtherWorks from '@components/OtherWorks';
import PaginatedWorks from '@components/Paginated/PaginatedWorks';
import SearchScreen from '@components/SearchScreen';
import { useArtworksContext } from '@utils/ArtworksContext';
import React from 'react';

const Home: React.FC = () => {
    const { loadingOther, errorOther } = useArtworksContext();

    if (errorOther) {
        return <p>Error in home page: {errorOther}</p>;
    }

    return (
        <div>
            <aside>
                <SearchScreen />
            </aside>
            <PaginatedWorks />
            <section>{loadingOther ? <Loader /> : <OtherWorks />}</section>
        </div>
    );
};

export default Home;

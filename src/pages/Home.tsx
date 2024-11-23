import Loader from '@components/Loader/Loader';
import OtherWorks from '@components/OtherWorks';
import PaginatedWorks from '@components/Paginated/PaginatedWorks';
import SearchScreen from '@components/SearchScreen';
import { useArtworksContext } from '@utils/ArtworksContext';

function Home(): JSX.Element {
    //const sortCriterion = 'name';
    const { otherWorks, loadingOther, errorOther } = useArtworksContext();

    if (errorOther) return <p>Error in home page: {errorOther}</p>;

    return (
        <div>
            <aside>
                <SearchScreen />
            </aside>
            <PaginatedWorks />
            <section>
                {loadingOther ? (
                    <Loader />
                ) : (
                    <>
                        <OtherWorks works={otherWorks} />
                    </>
                )}
            </section>
        </div>
    );
}

export default Home;

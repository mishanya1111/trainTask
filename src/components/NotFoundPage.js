import { useRouteError, Link } from 'react-router-dom';
import { Navbar } from './navbar/Root';

export default function NotFoundPage() {
    const error = useRouteError();
    console.error(error);
    return (
        <>
            <Navbar />
            <div className='errorContainer'>
            {(error.status === 404) ? <>
                <div className='not-found-container'>
                    <h1>404 - Not Found</h1>
                    <p>The page you are looking for does not exist.</p>
                    <Link to='/trainTask'>Go to Home</Link>
                </div>
            </> : <><h1>{error.staus} - {error.statusText}</h1></>
            }
            </div>

        </>
    );
}

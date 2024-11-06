import { useRouteError, Link } from 'react-router-dom';
import { Navbar } from '@components/navbar/Root';

export const ErrorPage: React.FC = () => {
    const error = useRouteError() as { status?: number; statusText?: string };
    console.error(error);
    return (
        <>
            <Navbar />
            <div className="errorContainer">
                {error?.status === 404 ? (
                    <div className="not-found-container">
                        <h1>404 - Not Found</h1>
                        <p>The page you are looking for does not exist.</p>
                        <Link to="/trainTask">Go to Home</Link>
                    </div>
                ) : (
                    <h1>
                        {error?.status} - {error?.statusText}
                    </h1>
                )}
            </div>
        </>
    );
};

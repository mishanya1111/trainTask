import { HOME_PAGE_ROUTE } from '@constants/routes';
import React, { useCallback } from 'react';
import { Link, useRouteError } from 'react-router-dom';

const Navbar = React.lazy(() => import('@components/navbar/Root'));

interface RouteError {
    status?: number;
    statusText?: string;
}

const ErrorPageComponent: React.FC = () => {
    const error = useRouteError() as RouteError;

    const handleError = useCallback(() => {
        console.error(error);
    }, [error]);

    handleError();

    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <div className="errorContainer">
                <Navbar />
                {error?.status === 404 ? (
                    <div className="not-found-container">
                        <h1>404 - Not Found</h1>
                        <p>The page you are looking for does not exist.</p>
                        <Link to={HOME_PAGE_ROUTE}>Go to Home</Link>
                    </div>
                ) : (
                    <h1>
                        {error?.status} - {error?.statusText}
                    </h1>
                )}
            </div>
        </React.Suspense>
    );
};

ErrorPageComponent.displayName = 'ErrorPageComponent';

export const ErrorPage = React.memo(ErrorPageComponent);

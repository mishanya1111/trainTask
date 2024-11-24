import Root from '@components/navbar/Root';
import { FAVORITES_PAGE_ROUTE, HOME_PAGE_ROUTE } from '@constants/routes';
import DetailInfo from '@pages/DetailInfo/DetailInfo';
import { ErrorPage } from '@pages/ErrorPage';
import Favorites from '@pages/Favorites/Favorites';
import Home from '@pages/Home';
import { ArtworksProvider } from '@utils/ArtworksContext';
import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const Router: React.FC = () => {
    const router = createBrowserRouter(
        [
            {
                path: '',
                errorElement: <ErrorPage />,
                children: [
                    {
                        path: '',
                        element: (
                            <Suspense fallback={<div>Loading...</div>}>
                                <Root />
                            </Suspense>
                        ),
                        children: [
                            {
                                index: true,
                                element: (
                                    <ArtworksProvider>
                                        <Home />
                                    </ArtworksProvider>
                                )
                            },
                            {
                                path: FAVORITES_PAGE_ROUTE,
                                element: <Favorites />
                            },
                            {
                                path: 'details/:id',
                                element: <DetailInfo />
                            }
                        ]
                    }
                ]
            }
        ],
        {
            basename: HOME_PAGE_ROUTE
        }
    );

    return <RouterProvider router={router} />;
};

export default Router;

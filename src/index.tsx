import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from '@components/navbar/Root';
import Home from '@pages/Home';
import { ErrorPage } from '@components/ErrorPage';
import Favorites from '@pages/Favorites/Favorites';
import DetailInfo from '@pages/DetailInfo/DetailInfo';
import ErrorBoundary from '@utils/ErrorBoundary';
import { FAVORITES_PAGE_ROUTE, HOME_PAGE_ROUTE } from '@constants/routes';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const router = createBrowserRouter([
    {
        path: HOME_PAGE_ROUTE,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <Root />,
                children: [
                    {
                        index: true,
                        element: <Home />
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
]);
root.render(
    <React.StrictMode>
        <ErrorBoundary>
            <RouterProvider router={router} />
        </ErrorBoundary>
    </React.StrictMode>
);

reportWebVitals();

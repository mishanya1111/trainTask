import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './components/navbar/Root';
import Home from './components/Home/Home';
import NotFoundPage from './components/NotFoundPage';
import Favorites from './components/Favorites/Favorites';
import DetailInfo from './components/DetailInfo/DetailInfo';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <NotFoundPage />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'favorites',
                element: <Favorites />
            },
            {
                path: 'details/:id',
                element: <DetailInfo />
            }
        ]
    }
]);
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

reportWebVitals();

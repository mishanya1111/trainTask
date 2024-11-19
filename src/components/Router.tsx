import { ErrorPage } from '@components/ErrorPage';
import Root from '@components/navbar/Root';
import { FAVORITES_PAGE_ROUTE, HOME_PAGE_ROUTE } from '@constants/routes';
import DetailInfo from '@pages/DetailInfo/DetailInfo';
import Favorites from '@pages/Favorites/Favorites';
import Home from '@pages/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//в Случае ошибки отображается эта страница, в случае неправильного пути очень важно
export const Router: React.FC = () => {
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
    return <RouterProvider router={router} />;
};

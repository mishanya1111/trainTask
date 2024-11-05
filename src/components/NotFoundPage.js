import { useRouteError, Link } from 'react-router-dom';

export default function NotFoundPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="not-found-container">
            <h1>404 - Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link to="/">Go to Home</Link>
        </div>
    );
}

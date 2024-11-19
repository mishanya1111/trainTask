import './index.css';

import ErrorBoundary from '@components/ErrorBoundary';
import Router from '@components/Router';
import React from 'react';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <ErrorBoundary>
            <Router />
        </ErrorBoundary>
    </React.StrictMode>
);

reportWebVitals();

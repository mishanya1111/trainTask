import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ErrorBoundary from '@components/ErrorBoundary';
import { Router } from '@components/Router';

//Главный путь
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <ErrorBoundary>
            <Router />
        </ErrorBoundary>
    </React.StrictMode>
);

reportWebVitals();

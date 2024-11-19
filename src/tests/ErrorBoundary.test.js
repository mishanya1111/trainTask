import ErrorBoundary from '@components/ErrorBoundary';
import { render, screen } from '@testing-library/react';
import React from 'react';

const ProblematicComponent = () => {
    throw new Error('Test error');
};

describe('ErrorBoundary Component', () => {
    it('should render children when no error is thrown', () => {
        render(
            <ErrorBoundary>
                <p>All good here!</p>
            </ErrorBoundary>
        );

        const content = screen.getByText(/All good here!/i);
        expect(content).toBeInTheDocument();
    });

    it('should render error message when an error is thrown', () => {
        render(
            <ErrorBoundary>
                <ProblematicComponent />
            </ErrorBoundary>
        );

        const errorMessage = screen.getByText(/An unknown error occurred/i);
        expect(errorMessage).toBeInTheDocument();
    });
});

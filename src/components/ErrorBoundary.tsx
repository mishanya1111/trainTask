import { ERROR_BOUNDARY_STATE } from '@constants/types';
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends Component<
    { children: ReactNode },
    ERROR_BOUNDARY_STATE
> {
    constructor(props: { children: ReactNode }) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ERROR_BOUNDARY_STATE {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <>
                    <div className="errorContainer">
                        <h1>
                            Error:{' '}
                            {this.state.error?.message ||
                                'An unknown error occurred'}
                        </h1>
                        <h1>
                            {' '}
                            <Link to={''}>Go to Home</Link>
                        </h1>
                    </div>
                </>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

import React, { Component, ReactNode, ErrorInfo } from 'react';
import { Navbar } from '@components/navbar/Root';

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
    constructor(props: { children: ReactNode }) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(_error: Error): ErrorBoundaryState {
        return { hasError: true, error: _error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
        this.setState({ error });
    }

    render() {
        if (this.state.hasError) {
            return (
                <>
                    <Navbar />
                    <div className="errorContainer">
                        <h1>
                            Error: {this.state.error ? this.state.error.message : 'An unknown error occurred'}
                        </h1>
                    </div>
                </>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

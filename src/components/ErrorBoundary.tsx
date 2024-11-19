import { Component, ReactNode, ErrorInfo } from 'react';
import { Navbar } from '@components/navbar/Root';
import { ERROR_BOUNDARY_STATE } from '@constants/types';

class ErrorBoundary extends Component<
    { children: ReactNode },
    ERROR_BOUNDARY_STATE
> {
    constructor(props: { children: ReactNode }) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(_error: Error): ERROR_BOUNDARY_STATE {
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
                            Error:{' '}
                            {this.state.error
                                ? this.state.error.message
                                : 'An unknown error occurred'}
                        </h1>
                    </div>
                </>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

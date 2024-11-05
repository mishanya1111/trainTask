import React, { Component } from 'react';
import { Navbar } from './components/navbar/Root';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(_error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
        this.setState({ error }); // Сохраняем ошибку в state
    }

    render() {
        if (this.state.hasError) {
            return (
                <>
                    <Navbar />
                    <div className="errorContainer">
                        <h1>Error: {this.state.error ? this.state.error.message : "An unknown error occurred"}</h1>
                    </div>
                </>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

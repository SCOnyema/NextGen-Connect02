import React from 'react';

// I use this component to catch errors for within components more like testing to getting actual error in browser console


class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <p>Something went wrong. Please try again later.</p>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
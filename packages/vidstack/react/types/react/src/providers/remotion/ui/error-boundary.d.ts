import * as React from 'react';
export interface ErrorBoundaryProps {
    children: React.ReactNode;
    fallback?: (error: Error) => React.ReactNode;
    onError?: (error: Error) => void;
}
interface ErrorBoundaryState {
    hasError: Error | null;
}
export declare class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    static displayName: string;
    state: {
        hasError: Error | null;
    };
    static getDerivedStateFromError(hasError: Error): {
        hasError: Error;
    };
    componentDidCatch(error: Error): void;
    render(): string | number | boolean | Iterable<React.ReactNode> | React.JSX.Element | null | undefined;
}
export {};

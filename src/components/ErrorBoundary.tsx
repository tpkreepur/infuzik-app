'use client';
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  static defaultProps = {
    fallback: null,
  };
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_error: Error): State {
    void _error;
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('AudioPlayer error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-4 text-red-500 bg-red-100 rounded-lg">
            Something went wrong with the audio player. Please refresh the page.
          </div>
        )
      );
    }

    return this.props.children;
  }
}

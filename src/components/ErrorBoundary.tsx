import { Component, ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { hasError: boolean; error?: Error };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: unknown) {
    console.error('ErrorBoundary caught an error', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="container-desktop">
          <div className="rounded-md border border-red-200 bg-red-50 p-6 text-red-700">
            <h2 className="mb-2 text-xl font-semibold">
              Something went wrong.
            </h2>
            <p className="mb-4 text-sm text-red-800">
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
            <div className="flex gap-2">
              <button
                onClick={this.handleReset}
                className="rounded-md border border-red-300 bg-white px-3 py-2 text-sm hover:bg-red-100"
              >
                Try again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="rounded-md border px-3 py-2 text-sm hover:bg-red-100"
              >
                Reload page
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

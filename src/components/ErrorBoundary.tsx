import * as React from 'react';

interface Props {
  children: JSX.Element | JSX.Element[];
}

class ErrorBoundary extends React.Component<Props> {
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  state = { hasError: false };

  render() {
    const { children } = this.props;
    const { hasError } = this.state;
    if (hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return children;
  }
}

export default ErrorBoundary;

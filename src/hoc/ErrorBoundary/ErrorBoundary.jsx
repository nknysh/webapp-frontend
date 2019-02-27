import React, { Component } from 'react';
import hash from 'object-hash';

import { StyledErrorBoundary, ErrorBoundaryTitle, ErrorBoundaryPre } from './ErrorBoundary.styles';

const errorBoundary = WrappedComponent => {
  return class ErrorBoundary extends Component {
    state = {
      hasError: false,
      error: {},
    };

    static getDerivedStateFromError(error) {
      return { hasError: true, error, id: hash(error.toString()) };
    }

    renderError() {
      const { error, id } = this.state;

      return (
        <StyledErrorBoundary>
          <ErrorBoundaryTitle>Something went wrong</ErrorBoundaryTitle>
          <ErrorBoundaryPre>{error.toString()}</ErrorBoundaryPre>
          <ErrorBoundaryPre>Ref: {id}</ErrorBoundaryPre>
        </StyledErrorBoundary>
      );
    }

    render() {
      const { hasError } = this.state;

      if (hasError) {
        return this.renderError();
      }

      return <WrappedComponent {...this.props} />;
    }
  };
};

export default errorBoundary;

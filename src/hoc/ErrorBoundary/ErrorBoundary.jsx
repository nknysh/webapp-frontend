import React, { Component, Fragment } from 'react';
import { prop } from 'ramda';

const errorBoundary = WrappedComponent => {
  return class ErrorBoundary extends Component {
    state = {
      hasError: false,
      error: {},
    };

    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }

    renderError() {
      const { error } = this.state;
      return (
        <Fragment>
          <h1>Oops!</h1>
          <pre>{JSON.stringify(prop('stack', error))}</pre>
        </Fragment>
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

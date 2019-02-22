import React from 'react';
import { compose } from 'ramda';

import ErrorBoundary from './ErrorBoundary';

const ErrorComponent = () => {
  throw new Error("It doesn't work!");
};

const MockComponent = () => <div>It works!</div>;

describe('ErrorBoundary HOC', () => {
  it('displays component when no error', () => {
    const Component = compose(ErrorBoundary)(MockComponent);
    const mountedComponent = mount(<Component />);
    expect(mountedComponent).toMatchSnapshot();
  });
  it('displays error when component catches', () => {
    const Component = compose(ErrorBoundary)(ErrorComponent);
    const mountedComponent = mount(<Component />);
    expect(mountedComponent).toMatchSnapshot();
  });
});

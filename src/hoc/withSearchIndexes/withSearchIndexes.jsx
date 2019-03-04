import React from 'react';
import { propOr, compose } from 'ramda';
import connect from './withSearchIndexes.state';

const withSearchIndexes = ({ indexes = [] }) => WrappedComponent => {
  const ConnectedWrappedComponent = compose(connect)(WrappedComponent);

  const wrappedDisplayName = propOr(propOr('Component', 'name', WrappedComponent), 'displayName', WrappedComponent);

  const WithSearchIndexes = props => (
    <ConnectedWrappedComponent indexes={propOr(indexes, 'indexes', props)} {...props} />
  );
  WithSearchIndexes.displayName = `withSearchIndexes(${wrappedDisplayName})`;

  return WithSearchIndexes;
};

export default withSearchIndexes;

import React from 'react';

const makeRenderTracker = (label = 'Component', logPropDiff = false) => {
  let count = 0;
  let lastProps = null;

  console.warn(`Render tracker mounted for ${label}`); // eslint-disable-line

  return WrappedComponent => props => {
    count += 1;
    console.log(`Render ${label}: ${count}`); // eslint-disable-line

    if (logPropDiff) {
      if (lastProps) {
        const diff = Object.keys(props).reduce((acc, key) => {
          acc[key] = lastProps[key] && props[key] !== lastProps[key];
          return acc;
        }, {});

        console.table(diff); // eslint-disable-line
      }
      lastProps = props;
    }

    return <WrappedComponent {...props} />;
  };
};

export default makeRenderTracker;

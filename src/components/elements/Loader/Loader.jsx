import React, { useState, Fragment } from 'react';
import { path, prop } from 'ramda';

import config from 'config/ui';
import { useEffectBoundary } from 'effects';

import peLogo from 'public/assets/img/PE_logo.png';

import { propTypes, defaultProps } from './Loader.props';
import { StyledLoader, LoaderImage, LoaderText } from './Loader.styles';

const Loader = ({ isLoading, text, showSpinner, children, showPrev }) => {
  const [prevChildren, setPrevChildren] = useState(children);

  useEffectBoundary(() => {
    setPrevChildren(children);
  }, [isLoading]);

  if (!isLoading) {
    !prevChildren && setPrevChildren(children);
    return children;
  }

  return (
    <Fragment>
      {showPrev && prevChildren}
      <StyledLoader data-prev={showPrev}>
        {showSpinner && <LoaderImage src={peLogo} alt={prop('title', config)} />}
        <LoaderText>{text || path(['messages', 'loading'], config)}</LoaderText>
      </StyledLoader>
    </Fragment>
  );
};

Loader.propTypes = propTypes;
Loader.defaultProps = defaultProps;

export default Loader;

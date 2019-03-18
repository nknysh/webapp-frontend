import React from 'react';
import { path } from 'ramda';

import config from 'config/ui';

import peLogo from 'public/img/PE_logo.png';

import { propTypes, defaultProps } from './Loader.props';
import { StyledLoader, LoaderImage, LoaderText } from './Loader.styles';

const Loader = ({ isLoading, text, showSpinner, children }) => {
  if (!isLoading) return children;

  return isLoading ? (
    <StyledLoader>
      {showSpinner && <LoaderImage src={peLogo} />}
      <LoaderText>{text || path(['messages', 'loading'], config)}</LoaderText>
    </StyledLoader>
  ) : (
    children
  );
};

Loader.propTypes = propTypes;
Loader.defaultProps = defaultProps;

export default Loader;

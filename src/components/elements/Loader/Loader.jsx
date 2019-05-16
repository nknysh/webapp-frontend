import React from 'react';
import { path, prop } from 'ramda';

import config from 'config/ui';

import peLogo from 'public/assets/img/PE_logo.png';

import { propTypes, defaultProps } from './Loader.props';
import { StyledLoader, LoaderImage, LoaderText } from './Loader.styles';

const Loader = ({ isLoading, text, showSpinner, children }) => {
  if (!isLoading) return children;

  return (
    <StyledLoader>
      {showSpinner && <LoaderImage src={peLogo} alt={prop('title', config)} />}
      <LoaderText>{text || path(['messages', 'loading'], config)}</LoaderText>
    </StyledLoader>
  );
};

Loader.propTypes = propTypes;
Loader.defaultProps = defaultProps;

export default Loader;

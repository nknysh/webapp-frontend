import React from 'react';

import peLogo from 'public/img/PE_logo.png';

import { propTypes, defaultProps } from './Loader.props';
import { StyledLoader, LoaderImage, LoaderText } from './Loader.styles';

const Loader = ({ isLoading, text, children }) => {
  if (!isLoading) return children;

  return (
    <StyledLoader>
      <LoaderImage src={peLogo} />
      <LoaderText>{text || 'Loading...'}</LoaderText>
    </StyledLoader>
  );
};

Loader.propTypes = propTypes;
Loader.defaultProps = defaultProps;

export default Loader;

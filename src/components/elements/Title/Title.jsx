import React from 'react';
import { useTranslation } from 'react-i18next';

import peLogo from 'public/assets/img/PE_logo.png';

import { propTypes, defaultProps } from './Title.props';
import { StyledTitle } from './Title.styles';

export const Title = ({ children }) => {
  const { t } = useTranslation();

  return (
    <StyledTitle>
      <img src={peLogo} alt={t('title')} />
      {children}
    </StyledTitle>
  );
};

Title.propTypes = propTypes;
Title.defaultProps = defaultProps;

export default Title;

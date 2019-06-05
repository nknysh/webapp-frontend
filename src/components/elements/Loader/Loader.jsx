import React, { useState, Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import { useEffectBoundary } from 'effects';

import peLogo from 'public/assets/img/PE_logo.png';

import { propTypes, defaultProps } from './Loader.props';
import { StyledLoader, LoaderImage, LoaderText } from './Loader.styles';

const Loader = ({ isLoading, text, showSpinner, children, showPrev }) => {
  const { t } = useTranslation();

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
        {showSpinner && <LoaderImage src={peLogo} alt={t('title')} />}
        <LoaderText>{text || t('messages.loading')}</LoaderText>
      </StyledLoader>
    </Fragment>
  );
};

Loader.propTypes = propTypes;
Loader.defaultProps = defaultProps;

export default Loader;

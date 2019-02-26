import React from 'react';

import peLogo from 'public/img/PE_logo.png';

import { StyledNotFound, NotFoundHeading, NotFoundImage } from './NotFound.styles';

export const NotFound = () => (
  <StyledNotFound>
    <NotFoundImage src={peLogo} />
    <NotFoundHeading>Page not found</NotFoundHeading>
  </StyledNotFound>
);

export default NotFound;

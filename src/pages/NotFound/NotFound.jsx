import React from 'react';

import peLogo from 'public/assets/img/PE_logo.png';

import { StyledNotFound, NotFoundHeading, NotFoundImage } from './NotFound.styles';

export const NotFound = () => (
  <StyledNotFound>
    <NotFoundImage src={peLogo} alt="Not Found" />
    <NotFoundHeading>Page not found</NotFoundHeading>
  </StyledNotFound>
);

export default NotFound;

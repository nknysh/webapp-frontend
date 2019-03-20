import React from 'react';

import { propTypes, defaultProps } from './BackButton.props';
import { Navigation, BackWrapper, Button } from './BackButton.styles';

export const BackButton = ({ to, children, ...props }) => {
  return (
    <Navigation to={to} {...props}>
      <BackWrapper>
        <Button>keyboard_arrow_left</Button>
      </BackWrapper>
      {children}
    </Navigation>
  );
};

BackButton.propTypes = propTypes;
BackButton.defaultProps = defaultProps;

export default BackButton;

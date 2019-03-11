import React from 'react';
import { FormControlLabel } from '@material-ui/core';

import { propTypes, defaultProps } from './Checkbox.props';
import { StyledCheckBox, MaterialCheckbox } from './Checkbox.styles';

export const Checkbox = ({ className, label, children, ...props }) => {
  return (
    <StyledCheckBox className={className}>
      <FormControlLabel control={<MaterialCheckbox {...props} />} label={label} />
      {children}
    </StyledCheckBox>
  );
};

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default Checkbox;

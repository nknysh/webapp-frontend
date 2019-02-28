import React from 'react';
import { FormControlLabel } from '@material-ui/core';

import { propTypes, defaultProps } from './Checkbox.props';
import { StyledCheckBox, MaterialCheckbox } from './Checkbox.styles';

export const Checkbox = ({ label, onSelected, ...props }) => {
  const onChange = e => onSelected(e.currentTarget.checked);

  return (
    <StyledCheckBox>
      <FormControlLabel control={<MaterialCheckbox onChange={onChange} {...props} />} label={label} />
    </StyledCheckBox>
  );
};

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default Checkbox;

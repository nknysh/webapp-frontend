import React from 'react';

import { mapWithIndex } from 'utils';

import { propTypes, defaultProps } from './RadioButton.props';
import { StyledRadioGroup, RadioFormControl, MaterialRadio } from './RadioButton.styles';

const renderOption = (props, i) => <RadioFormControl key={i} {...props} control={<MaterialRadio />} />;

const RadioButton = ({ options, ...props }) => (
  <StyledRadioGroup {...props}>{mapWithIndex(renderOption, options)}</StyledRadioGroup>
);

RadioButton.propTypes = propTypes;
RadioButton.defaultProps = defaultProps;

export default RadioButton;

import React, { useState, useEffect } from 'react';
import { Range as BaseRange, Handle } from 'rc-slider';
import Tooltip from 'rc-tooltip';

import { propTypes, defaultProps } from './Range.props';
import { trackStyle, handleStyle } from './Range.styles';

// eslint-disable-next-line
const renderHandle = ({ value, dragging, index, onChange, ...props }) => {
  return (
    <Tooltip overlay={value} visible={dragging} placement="top" key={index}>
      <Handle value={value} {...props} />
    </Tooltip>
  );
};

export const Range = ({ value, onChange, ...props }) => {
  const [values, setValues] = useState(value);

  useEffect(() => {
    setValues(value);
  }, [value]);

  useEffect(() => {
    onChange(values);
  }, [values]);

  return (
    <BaseRange
      value={values}
      onChange={setValues}
      allowCross={false}
      trackStyle={trackStyle}
      handleStyle={handleStyle}
      handle={renderHandle}
      {...props}
    />
  );
};

Range.propTypes = propTypes;
Range.defaultProps = defaultProps;

export default Range;

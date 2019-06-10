import React, { useState } from 'react';
import { Range as BaseRange, Handle } from 'rc-slider';
import Tooltip from 'rc-tooltip';

import { useEffectBoundary } from 'effects';

import { propTypes, defaultProps } from './Range.props';
import { trackStyle, handleStyle } from './Range.styles';

const renderHandle = ({ value, dragging, index, ...props }) => {
  return (
    <Tooltip overlay={value} visible={dragging} placement="top" key={index}>
      <Handle value={value} {...props} />
    </Tooltip>
  );
};

export const Range = ({ value, onChange, ...props }) => {
  const [values, setValues] = useState(value);

  useEffectBoundary(() => {
    setValues(value);
  }, [value]);

  useEffectBoundary(() => {
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

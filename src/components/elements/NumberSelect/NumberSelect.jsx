import React, { useState } from 'react';
import { equals, lte, gte, gt, dec, inc, ap } from 'ramda';

import { useEffectBoundary } from 'effects';

import {
  StyledNumberSelect,
  NumberSelectDecrease,
  NumberSelectIncrease,
  NumberSelectNumber,
  NumberSelectButtonContainer,
} from './NumberSelect.styles';
import { defaultProps, propTypes } from './NumberSelect.props';

export const NumberSelect = ({
  onChange,
  value,
  className,
  zeroText,
  prevClassName,
  nextClassName,
  countClassName,
  min,
  max,
}) => {
  const [count, setCount] = useState(value);

  useEffectBoundary(() => {
    setCount(value);
  }, [value]);

  const canDecrease = gt(count, 0);
  const canIncrease = max ? !gte(count, max) : true;

  const onDescrease = () => {
    const newCount = canDecrease || !lte(count, min) ? dec(count) : count;
    ap([setCount, onChange], [newCount]);
  };
  const onIncrease = () => {
    const newCount = canIncrease ? inc(count) : count;
    ap([setCount, onChange], [newCount]);
  };

  return (
    <StyledNumberSelect className={className}>
      <NumberSelectButtonContainer className={nextClassName}>
        <NumberSelectIncrease data-disabled={!canIncrease} onClick={onIncrease}>
          add
        </NumberSelectIncrease>
      </NumberSelectButtonContainer>

      <NumberSelectNumber className={countClassName}>{(equals(0, count) && zeroText) || count}</NumberSelectNumber>
      <NumberSelectButtonContainer className={prevClassName}>
        <NumberSelectDecrease data-disabled={!canDecrease} onClick={onDescrease}>
          remove
        </NumberSelectDecrease>
      </NumberSelectButtonContainer>
    </StyledNumberSelect>
  );
};

NumberSelect.propTypes = propTypes;
NumberSelect.defaultProps = defaultProps;

export default NumberSelect;

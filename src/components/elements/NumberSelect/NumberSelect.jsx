import React, { useState, useCallback } from 'react';
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
  onAdd,
  onRemove,
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

  const canDecrease = min ? !lte(count, min) : gt(count, 0);
  const canIncrease = max ? !gte(count, max) : true;

  const onDescrease = useCallback(() => {
    const newCount = canDecrease || !lte(count, min) ? dec(count) : count;
    ap([setCount, onRemove, onChange], [newCount]);
  }, [canDecrease, count, min, onChange, onRemove]);

  const onIncrease = useCallback(() => {
    const newCount = canIncrease ? inc(count) : count;
    ap([setCount, onAdd, onChange], [newCount]);
  }, [canIncrease, count, onAdd, onChange]);

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

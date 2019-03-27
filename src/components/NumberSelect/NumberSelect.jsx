import React, { useState } from 'react';
import { equals, lte, gte, dec, inc } from 'ramda';

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
  startAt,
  className,
  zeroText,
  prevClassName,
  nextClassName,
  countClassName,
  min,
  max,
}) => {
  const [count, setCount] = useState(startAt);

  useEffectBoundary(() => {
    onChange(count);
  }, [count, startAt]);

  const canDecrease = count > 0;

  const onDescrease = () => setCount(canDecrease || !lte(min, count) ? dec(count) : count);
  const onIncrease = () => setCount(max && gte(max, count) ? count : inc(count));

  return (
    <StyledNumberSelect className={className}>
      <NumberSelectButtonContainer className={nextClassName}>
        <NumberSelectIncrease onClick={onIncrease}>add</NumberSelectIncrease>
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

import React, { useState, useEffect } from 'react';

import {
  StyledNumberSelect,
  NumberSelectDecrease,
  NumberSelectIncrease,
  NumberSelectNumber,
  NumberSelectButtonContainer,
} from './NumberSelect.styles';
import { defaultProps, propTypes } from './NumberSelect.props';

export const NumberSelect = ({ onChange, startAt, className }) => {
  const [count, setCount] = useState(startAt);

  useEffect(() => {
    onChange && onChange(count);
  }, [count, startAt]);

  const canDecrease = count > 0;

  const onDescrease = () => setCount(canDecrease ? count - 1 : count);
  const onIncrease = () => setCount(count + 1);

  return (
    <StyledNumberSelect className={className}>
      <NumberSelectButtonContainer>
        <NumberSelectIncrease onClick={onIncrease}>add</NumberSelectIncrease>
      </NumberSelectButtonContainer>

      <NumberSelectNumber>{count}</NumberSelectNumber>
      <NumberSelectButtonContainer>
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

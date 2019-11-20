import React, { useCallback, FormEvent, HTMLProps } from 'react';
import styled from 'styled-components';
import { RoundedIconButton } from '../Buttons/index';
import { Icon } from '@material-ui/core';

export interface StepperProps extends HTMLProps<HTMLDivElement> {
  value: number;
  max?: number;
  onIncrement: (step: number) => void;
}

const Stepper = (props: StepperProps) => {
  const handleClick = useCallback(
    (step: number) => () => {
      props.onIncrement(step);
    },
    [props.onIncrement]
  );
  return (
    <div className={props.className}>
      <RoundedIconButton title="decrease" disabled={props.value === 0} onClick={handleClick(-1)}>
        <Icon>remove</Icon>
      </RoundedIconButton>
      {props.value}
      <RoundedIconButton title="increase" disabled={props.value === props.max} onClick={handleClick(1)}>
        <Icon>add</Icon>
      </RoundedIconButton>
    </div>
  );
};

export default styled(Stepper)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-width: 75px;
`;

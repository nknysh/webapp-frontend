import React, { EventHandler, FormEvent } from 'react';
import styled from 'styled-components';
import { pureUiTheme } from 'pureUi/pureUiTheme';

export interface CheckboxProps extends React.HTMLProps<HTMLInputElement> {}

const Checkbox = (props: CheckboxProps) => {
  const { className, ...checkboxProps } = props;
  return (
    <span className={className}>
      <input type="checkbox" {...checkboxProps} />
      <span className="surrogate" />
    </span>
  );
};

export default styled(Checkbox)`
  position: relative;
  width: ${pureUiTheme.measurements.checkboxSize}px;
  height: ${pureUiTheme.measurements.checkboxSize}px;
  display: inline-block;
  vertical-align: middle;
  margin: 1px;

  & > input {
    position: absolute;
    appearance: none;
    width: ${pureUiTheme.measurements.checkboxSize}px;
    height: ${pureUiTheme.measurements.checkboxSize}px;
    opacity: 0;
    margin: 0;
    padding: 0;
    cursor: pointer;
    z-index: 1;

    &:disabled {
      cursor: default;
    }
  }

  .surrogate {
    transition: all 0.15s ease-out;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 0;
    border: ${pureUiTheme.colorRoles.lightGreyBorder} 1px solid;
    background-color: ${pureUiTheme.colors.white};
    box-shadow: 0 0 0 5px transparent;
  }

  & > input:checked ~ .surrogate {
    border: ${pureUiTheme.colors.gold} 1px solid;
    background-color: ${pureUiTheme.colors.gold};
  }

  & > input:focus ~ .surrogate,
  & > input:active ~ .surrogate {
    box-shadow: 0 0 0 2px ${pureUiTheme.colors.marine};
  }

  & > input ~ .surrogate:after {
    content: '';
    display: block;
    position: absolute;
    transition: all 0.15s ease-out;
    background-color: transparent;
    top: 1px;
    left: 1px;
    width: ${pureUiTheme.measurements.checkboxSize - 2}px;
    height: ${pureUiTheme.measurements.checkboxSize - 2}px;
  }

  & > input:checked ~ .surrogate:after {
    border-radius: ${pureUiTheme.measurements.checkboxTittleSize}px;
    top: ${pureUiTheme.measurements.controlDottOffset}px;
    left: ${pureUiTheme.measurements.controlDottOffset}px;
    width: ${pureUiTheme.measurements.checkboxTittleSize}px;
    height: ${pureUiTheme.measurements.checkboxTittleSize}px;
    background-color: ${pureUiTheme.colors.white};
  }
`;

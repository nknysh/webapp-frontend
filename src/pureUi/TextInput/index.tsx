import React from 'react';
import styled from 'styled-components';
import { pureUiTheme } from 'pureUi/pureUiTheme';

export interface TextInputProps extends React.HTMLProps<HTMLInputElement> {
  children?: JSX.Element | JSX.Element[] | null | undefined;
}
const TextInput = (props: TextInputProps) => {
  const { className, children, type, ...inputProps } = props;
  return (
    <div className={className}>
      <input type="text" {...inputProps} />
      <div className="children">{children}</div>
      <span className="surrogate" />
    </div>
  );
};

export default styled(TextInput)`
  position: relative;
  display: flex;
  flex-direction: row;

  input {
    flex-grow: 1;
    flex-shrink: 1;
    padding: 10px;
    font-family: 'HurmeGeometricSans2';
    font-size: 14px;
    width: 100%;
    color: ${pureUiTheme.colors.black};
  }

  input::placeholder {
    color: ${pureUiTheme.colors.gray};
    text-transform: uppercase;
  }

  input:focus,
  input:active {
    outline: none;
  }

  .children {
    flex-shrink: 1;
  }

  .surrogate {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: all 0.15s ease-out;
    box-shadow: 0 0 0 5px transparent;
    pointer-events: none;
  }

  input:focus ~ .surrogate,
  input:active ~ .surrogate {
    box-shadow: 0 0 0 2px ${pureUiTheme.colors.marine};
  }
`;

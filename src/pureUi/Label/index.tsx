import React from 'react';
import styled from 'styled-components';
import { pureUiTheme } from 'pureUi/pureUiTheme';

interface ILabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  text?: string;
  inline?: boolean;
  reverse?: boolean;
}

const LabelComponent = (props: ILabelProps) => {
  const { text, children, inline, reverse, ...labelProps } = props;
  return (
    <label {...labelProps}>
      {text && !reverse && <span className="labelText">{text}</span>}
      {children}
      {text && reverse && <span className="labelText">{text}</span>}
    </label>
  );
};

export const Label = styled(LabelComponent)<ILabelProps>`
  display: block;
  text-transform: uppercase;
  color: ${pureUiTheme.colorRoles.grayLabel};
  font-size: 12px;

  span.labelText {
    display: ${props => (props.inline ? 'inline' : 'block')};
    margin-bottom: ${props => (props.inline ? '0' : '10px')};
    margin-left: ${props => (props.inline ? '5px' : '0')};
    margin-right: ${props => (props.inline ? '5px' : '0')};
  }
`;

export default Label;

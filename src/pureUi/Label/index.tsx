import React from 'react';
import styled from 'styled-components';
import { pureUiTheme } from 'pureUi/pureUiTheme';

interface ILabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  text?: string;
  inline?: boolean;
  reverse?: boolean;
  disabled?: boolean;
  // I'd like to get rid of all this upper case test in the design.
  // For now, this will be a default prop set to true, so I don't
  // have to update the rest of the UI, and when we remove it, then
  // Typescirpt will help us remove it from the newer instances.
  uppercase?: boolean;
}

const LabelComponent = (props: ILabelProps) => {
  const { text, children, inline, reverse, ...labelProps } = props;
  return (
    <label {...labelProps}>
      {text && !reverse && (
        <span title={text} className="labelText">
          {text}
        </span>
      )}
      {children}
      {text && reverse && (
        <span title={text} className="labelText">
          {text}
        </span>
      )}
    </label>
  );
};

export const Label = styled(LabelComponent)<ILabelProps>`
  display: ${props => (props.inline ? 'inline-flex' : 'block')};
  align-items: center;
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'none')};
  color: ${props => (props.disabled ? pureUiTheme.colors.grayDepth1 : pureUiTheme.colorRoles.grayLabel)};
  font-size: 12px;

  span.labelText {
    flex-grow: 0;
    display: ${props => (props.inline ? 'inline' : 'block')};
    margin-bottom: ${props => (props.inline ? '0' : '10px')};
    margin-left: ${props => (props.inline ? '5px' : '0')};
    margin-right: ${props => (props.inline ? '5px' : '0')};

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

Label.defaultProps = {
  uppercase: true,
};

export default Label;

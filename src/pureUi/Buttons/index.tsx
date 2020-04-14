import React from 'react';
import styled, { css } from 'styled-components';
import { pureUiTheme } from '../pureUiTheme';
import { Link, LinkProps } from 'react-router-dom';
import { IconButtonProps } from '@material-ui/core/IconButton';
import { Add, Remove, Close, Edit, ControlPointDuplicate, NavigateNext, NavigateBefore } from '@material-ui/icons';

export const buttonStates = css`
  transition: all 0.15s ease-out;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${pureUiTheme.colors.marine};
  }

  &:active {
    background-color: ${pureUiTheme.colors.black};
    box-shadow: 0 0 0 8px ${pureUiTheme.colors.lightBlue};
  }
`;

export const baseButtonStyles = css`
  position: relative;
  display: block;
  line-height: 35px;
  font-family: 'HurmeGeometricSans2';
  font-size: 14px;
  font-weight: 600;
  background-color: ${pureUiTheme.colors.gold};
  color: ${pureUiTheme.colors.white};
  border: none;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 0 0 5px transparent;
  flex-shrink: 1;
  flex-grow: 1;

  &:hover:enabled {
    background-color: ${pureUiTheme.colors.teal};
  }

  &:disabled {
    cursor: default;
    opacity: 0.75;
    background-color: ${pureUiTheme.colors.goldOpacity};
    border-color: ${pureUiTheme.colors.goldDark};
  }

  ${buttonStates}
`;

export const PrimaryButton = styled.button`
  ${baseButtonStyles}
`;

export const SecondaryButton = styled.button`
  ${baseButtonStyles}
  background-color: transparent;
  border: ${pureUiTheme.colors.goldBorder} 1px solid;
  color: ${pureUiTheme.colors.goldBorder};

  &:hover {
    color: ${pureUiTheme.colors.white};
  }
`;

export const PrimaryButtonTall = styled.button`
  ${baseButtonStyles}
  height: 70px;
`;

export const PrimaryButtonTallAltColor = styled(PrimaryButtonTall)`
  background-color: ${pureUiTheme.colors.grayDarker};

  &:disabled {
    cursor: default;
    opacity: 0.75;
    background-color: ${pureUiTheme.colors.grayDarker};
    border-color: ${pureUiTheme.colors.grayDarker};
  }
`;

export const RoundedIconButton = styled(PrimaryButton)`
  display: inline-block;
  width: 24px;
  height: 24px;
  padding: 0;
  border-radius: 100px;

  .material-icons {
    top: 0;
    bottom: 0;
    height: 100%;
  }
`;

export const AddButton = (props: IconButtonProps) => (
  <RoundedIconButton {...props}>
    <Add />
  </RoundedIconButton>
);

export const RemoveButton = (props: IconButtonProps) => (
  <RoundedIconButton {...props}>
    <Remove />
  </RoundedIconButton>
);

export const CloseButton = (props: IconButtonProps) => (
  <RoundedIconButton {...props}>
    <Close />
  </RoundedIconButton>
);

export const IconButton = styled.button`
  transition: all 0.15s ease-out;
  font-size: 0; /* Fixes flash of text bug in material UI */
  border: none;
  background: transparent;
  color: ${pureUiTheme.colors.gold};
  box-shadow: 0 0 0 5px transparent;

  &:hover {
    color: ${pureUiTheme.colors.goldDark};
  }

  ${buttonStates}
`;

export const Tab = styled.button`
  background-color: transparent;
  border: none;
  line-height: 35px;
  font-family: 'HurmeGeometricSans2';
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  display: block;
  flex-grow: 1;
  text-transform: uppercase;
`;

export const LinkButton = styled(Link)<LinkProps>`
  ${baseButtonStyles};
  text-align: center;
  color: ${pureUiTheme.colors.white} !important; /* Something somewhere is leaking styles for link colors */
`;

export const ButtonBar = styled.div`
  display: flex;
  flex-direction: row;

  button {
    margin-right: 10px;
  }

  button:last-of-type {
    margin-right: 0;
  }
`;

export const ButtonSpacer = styled.div.attrs(() => ({
  'aria-hidden': 'true',
}))`
  flex-grow: 1;
`;

export interface IActionButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  action: 'add' | 'remove' | 'close' | 'edit' | 'duplicate' | 'forward' | 'back';
  disabled?: boolean;
}

export const ActionButtonComponent = (props: IActionButtonProps) => {
  return (
    <button {...props}>
      <span>
        {props.action === 'add' && <Add className="icon" />}
        {props.action === 'remove' && <Remove className="icon" />}
        {props.action === 'close' && <Close className="icon" />}
        {props.action === 'edit' && <Edit className="icon" />}
        {props.action === 'duplicate' && <ControlPointDuplicate className="icon" />}
        {props.action === 'forward' && <NavigateNext className="icon" />}
        {props.action === 'back' && <NavigateBefore className="icon" />}
        <span className="children">{props.children}</span>
      </span>
    </button>
  );
};

const actionButtonStyles = `
  display: inline-block;
  color: ${pureUiTheme.colors.gold};
  border: 1px solid ${pureUiTheme.colors.gold};
  border-radius: 100px;
  box-shadow: 0 0 0 5px transparent;
  cursor: pointer;
  background: white;

  & > span {
    display: flex;
    align-items: center;
  }

  .children {
    flex-grow: 1;
  }

  .icon {
    top: 0;
    bottom: 0;
    height: 100%;
    margin: 0 8px 0 0;
  }

  &:focus,
  &:active {
    outline: none;
    box-shadow: 0 0 0 2px ${pureUiTheme.colors.teal};
  }

  &:disabled {
    opacity: 0.5;
  }

  &:active {
    color: ${pureUiTheme.colors.teal};
    border-color: ${pureUiTheme.colors.teal};
  }
`;

export const ActionButton = styled(ActionButtonComponent)`
  ${actionButtonStyles}
`;

export interface IActionLinkButtonProps extends IActionButtonProps {
  to: string;
}

export const ActionLinkButtonComponent = (props: IActionLinkButtonProps) => {
  const { to, className } = props;

  return (
    <a href={to} className={className}>
      <span>
        {props.action === 'add' && <Add className="icon" />}
        {props.action === 'remove' && <Remove className="icon" />}
        {props.action === 'close' && <Close className="icon" />}
        {props.action === 'edit' && <Edit className="icon" />}
        {props.action === 'duplicate' && <ControlPointDuplicate className="icon" />}
        {props.action === 'forward' && <NavigateNext className="icon" />}
        {props.action === 'back' && <NavigateBefore className="icon" />}
        <span className="children">{props.children}</span>
      </span>
    </a>
  );
};

export const ActionLinkButton = styled(ActionLinkButtonComponent)`
  ${actionButtonStyles}

  font-size: 13px;
  padding-right: 16px;
  span svg.icon {
    margin-left: 8px;
  }
`;

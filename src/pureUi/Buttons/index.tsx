import React from 'react';
import styled, { css } from 'styled-components';
import { pureUiTheme } from '../pureUiTheme';
import { Link, LinkProps } from 'react-router-dom';

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
  border: ${pureUiTheme.colors.goldBorder} 1px solid;
  color: ${pureUiTheme.colors.white};
  border: none;
  text-transform: uppercase;
  width: 100%;
  cursor: pointer;
  box-shadow: 0 0 0 5px transparent;

  &:hover {
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

export const SummaryFormPrimaryButton = styled.button`
  ${baseButtonStyles}
  height: 70px;

  &:hover {
    background-color: ${pureUiTheme.colors.teal} !important;
  }
`;

export const SummaryFormSecondaryButton = styled(SummaryFormPrimaryButton)`
  background-color: ${pureUiTheme.colors.grayDarker} !important;
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

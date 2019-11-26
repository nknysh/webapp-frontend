import styled from 'styled-components';
import { pureUiTheme } from '../pureUiTheme';

/* TODO: Try to remove the duplication in this file */

export const PrimaryButton = styled.button`
  position: relative;
  transition: all 0.15s ease-out;
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

  &:disabled {
    cursor: default;
    opacity: 0.75;
    background-color: ${pureUiTheme.colors.goldOpacity};
    border-color: ${pureUiTheme.colors.goldDark};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${pureUiTheme.colors.marine};
  }

  &:hover {
    background-color: ${pureUiTheme.colors.goldDark};
  }
  &:active {
    background-color: ${pureUiTheme.colors.black};
    box-shadow: 0 0 0 8px ${pureUiTheme.colors.lightBlue};
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

export const IconButton = styled.button`
  transition: all 0.15s ease-out;
  font-size: 0; /* Fixes flash of text bug in material UI */
  border: none;
  background: transparent;
  color: ${pureUiTheme.colors.gold};
  box-shadow: 0 0 0 5px transparent;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${pureUiTheme.colors.marine};
  }

  &:hover {
    color: ${pureUiTheme.colors.goldDark};
  }
  &:active {
    color: ${pureUiTheme.colors.black};
    box-shadow: 0 0 0 8px ${pureUiTheme.colors.lightBlue};
  }
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

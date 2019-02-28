import styled, { css } from 'styled-components';

import theme from './theme';
import breakpoints from './breakpoints';

export const Link = styled.a`
  color: ${theme.secondary};

  :active,
  :visited,
  :hover {
    color: ${theme.secondary};
  }
`;

export const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;

  ${breakpoints.tablet`max-width: ${theme.breakpoints.desktop}px`}
`;

export const inputStyles = css`
  background: ${theme.backgroundColor};
  margin-top: ${theme.gutter / 2}px;
  display: block;
  border: 1px solid ${theme.borderColor};
  color: ${theme.colors.black};
  width: 100%;
  box-sizing: border-box;
  padding: ${theme.gutter}px;
`;

export const Input = styled.input`
  ${inputStyles}
`;

export const Button = styled.button`
  width: 100%;
  font-size: 18px;
  text-transform: uppercase;
  font-weight: bold;
  font-family: ${theme.defaultFont};
  color: ${theme.colors.white};
  background: ${theme.primary}
  outline: none;
  border: 0;
  padding: ${theme.gutter}px ${theme.gutter}px;
  cursor: pointer;

  &:hover {
    background: ${theme.secondary};
  }
`;

export const Image = styled.img``;

export const Pre = styled.pre``;

export default { Link, Container, Input, Button, Image, Pre };

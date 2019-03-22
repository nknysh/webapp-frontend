import styled, { css } from 'styled-components';

import theme from './theme';
import breakpoints from './breakpoints';
import { Heading1 } from './typography';

export const linkStyles = css`
  cursor: pointer;
  color: ${theme.secondary};

  &:active {
    color: ${theme.primary};
  }

  padding: ${theme.gutter}px 0;

  ${breakpoints.tablet`
    ${({ spaced }) =>
      spaced &&
      css`
        padding: ${theme.gutter / 2}px ${theme.gutter}px;
        margin: ${theme.gutter / 2}px ${theme.gutter}px;
      `}

    ${({ inverse }) =>
      inverse &&
      css`
        color: ${theme.colors.white};
        background: ${theme.primary};
        border-radius: ${theme.borderRadius}px;
      `}


      ${({ bold }) =>
        bold &&
        css`
          font-weight: ${theme.bold};
        `}
    `}
`;
export const Link = styled.a`
  ${linkStyles}
`;

export const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;

  ${breakpoints.tablet`width: ${theme.breakpoints.desktop}px`}
`;

export const inputStyles = css`
  font-family: ${theme.defaultFont};
  background: ${theme.backgroundColor};
  margin-top: ${theme.gutter / 2}px;
  display: block;
  border: 1px solid ${theme.borderColor};
  color: ${theme.colors.black};
  width: 100%;
  box-sizing: border-box;
  padding: ${theme.gutter}px;

  ${({ disabled }) =>
    disabled &&
    css`
      background: ${theme.colors['gray-light']};
    `}

  ::placeholder {
    color: ${theme.colors.gray};
  }
`;

export const Input = styled.input`
  ${inputStyles}
`;

export const InputError = styled.div`
  color: ${theme.error};
  font-size: 12px;
  margin: ${theme.gutter}px 0;
  display: block;
  font-weight: ${theme.bold};
`;

export const buttonStyles = css`
width: 100%;
font-size: 18px;
text-transform: uppercase;
font-weight: ${theme.bold};
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
export const Button = styled.button`
  ${buttonStyles}
`;

export const Image = styled.img``;

export const Pre = styled.pre``;

export const Title = styled(Heading1)`
  text-align: center;
  margin-top: 0;

  img {
    display: block;
    margin: ${theme.gutter * 2.5}px auto;
  }
`;

export const Hr = styled.hr`
  border: 0;
  background: 0;
  border-bottom: 1px solid ${theme.borderColor};
`;

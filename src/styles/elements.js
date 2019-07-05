import styled, { css } from 'styled-components';
import { Icon } from '@material-ui/core';

import i18n from 'config/i18n';

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
          font-weight: ${theme.fonts.bold};
        `}
    `}
`;
export const Link = styled.a`
  ${linkStyles}
`;

export const Container = styled.div`
  width: 100%;

  ${breakpoints.tablet`
    max-width: 100%;
    margin: 0 auto;
    width: ${theme.breakpoints.desktop}px
  `}
`;

export const inputStyles = css`
  font-family: ${theme.fonts.defaultFont};
  background: ${theme.backgrounds.default};
  margin-top: ${theme.gutter / 2}px;
  display: block;
  border: 1px solid ${theme.borders.default};
  color: ${theme.colors.black};
  width: 100%;
  box-sizing: border-box;
  padding: ${theme.gutter}px;

  ${({ disabled }) =>
    disabled &&
    css`
      background: ${theme.backgrounds.light};
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
  font-size: ${theme.fonts.sizes.normal}px;
  margin: ${theme.gutter}px 0;
  display: block;
  font-weight: ${theme.fonts.bold};
`;

export const buttonStyles = css`
  width: 100%;
  font-size: ${theme.fonts.sizes.big}px;
  text-transform: uppercase;
  font-weight: ${theme.fonts.bold};
  font-family: ${theme.fonts.defaultFont};
  color: ${theme.colors.white};
  background: ${theme.primary};
  outline: none;
  border: 0;
  padding: ${theme.gutter}px ${theme.gutter}px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &:hover {
    background: ${theme.secondary};
  }
`;
export const Button = styled.button`
  ${buttonStyles}

  ${({ ['data-secondary']: secondary }) =>
    secondary &&
    css`
      background: ${theme.light};
    `}
`;

export const Image = styled.img``;

export const Pre = styled.pre``;

export const Title = styled(Heading1)`
  text-align: center;
  margin-top: 0;
  margin-bottom: ${theme.gutter * 4.7}px;
  color: ${theme.secondary};

  img {
    display: block;
    margin: ${theme.gutter * 2.5}px auto;
  }
`;

export const Hr = styled.hr`
  border: 0;
  background: 0;
  border-bottom: 1px solid ${theme.borders.default};
`;

export const withCurrency = css`
  :before {
    content: '${i18n.t('currency.symbol')}';
  }
`;

export const MenuIcon = styled(Icon)`
    font-size: ${theme.fonts.sizes.mid}px !important;
    font-weight: ${theme.fonts.bold};
    line-height: 24px
    overflow: visible !important;
    padding-top: 4px;
  cursor: pointer;
`;

export const withDiscountStyles = css`
  ${({ ['data-discounted']: discounted }) =>
    discounted &&
    css`
      color: ${theme.light};
      text-decoration: line-through;
    `}

  ${({ ['data-discount']: discount }) =>
    discount &&
    css`
      color: ${theme.colors['red-fade']};
    `}
`;

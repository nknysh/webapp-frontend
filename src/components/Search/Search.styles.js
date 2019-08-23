import styled, { css } from 'styled-components';

import { theme } from 'styles';
import IndexSearch from 'components/IndexSearch';

export const SearchBarSection = styled.div`
  flex: 1;
  margin: ${theme.spacing.gutter}px;
  position: relative;

  ${({ ['data-vertical']: vertical }) =>
    vertical &&
    css`
      margin: ${theme.spacing.gutter}px 0 ${theme.spacing.gutter * 2}px;

      :last-child {
        margin-bottom: 0;
      }
    `}

  ${({ ['data-constrain']: constrain }) =>
    constrain &&
    css`
      flex: 0 1;
    `}

  ${({ ['data-large']: large }) =>
    large &&
    css`
      flex: 1 0 10%;
    `}

  label,
  label > span {
    color: ${theme.palette.neutral};
    font-size: ${theme.fonts.sizes.normal}px;
    text-transform: uppercase;
  }
`;

export const SearchBarIndexSearch = styled(IndexSearch)`
  font-size: ${theme.fonts.sizes.normal}px;
  position: relative;
`;

export const SearchBarResults = styled.div`
  position: absolute;
  overflow-y: auto;
  box-shadow: ${theme.boxShadows.default};
  width: 100%;
  z-index: 400;
  background: ${theme.backgrounds.default};
`;

export const SearchBarHits = styled.div`
  color: ${theme.palette.primary};
  background: ${theme.backgrounds.default};
  border-bottom: 1px solid ${theme.palette.primary};
  text-transform: uppercase;

  :first-child {
    border-top: 0;
  }

  :last-child {
    border-bottom: 0;
  }
`;

export const SearchBarHit = styled.div`
  cursor: pointer;
  transition: ${theme.defaultTransition};
  padding: 0 ${theme.spacing.gutter}px;

  :last-child {
    border-bottom: 0;
  }

  :hover,
  :active {
    background: ${theme.colors.aqua};
  }
`;

export const SearchBarHitContent = styled.div`
  padding: ${theme.spacing.gutter * 2}px;
  color: ${theme.colors.black};
  border-bottom: 1px solid ${theme.borders.medium};
`;

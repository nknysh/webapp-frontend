import styled, { css } from 'styled-components';

import theme from 'styles/theme';
import { Button } from 'styles/elements';
import breakpoints from 'styles/breakpoints';

import { IndexSearch } from 'components';

export const StyledSearchBar = styled.div`
  color: ${theme.primary};
  background: ${theme.colors['white-opacity-1']};
  padding: ${theme.gutter * 2}px;
  margin: ${theme.gutter * 10}px 0 0;
  max-width: none;
  text-align: left;
  display: flex;
  flex-direction: column;

  ${breakpoints.desktop`
    flex-direction: row;
    align-items: flex-end;
    margin-left: ${theme.gutter * 4}px;
    margin-right: ${theme.gutter * 4}px;
  `}
`;

export const SearchBarSection = styled.div`
  flex: 1;
  margin: ${theme.gutter}px;
  position: relative;

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
    color: ${theme.colors['gold-neutral']};
    font-size: 12px;
    text-transform: uppercase;
  }
`;

export const SearchBarIndexSearch = styled(IndexSearch)`
  font-size: 14px;
  position: relative;
`;

export const SearchBarResults = styled.div`
  position: absolute;
  overflow-y: auto;
  box-shadow: ${theme.boxShadow};
  width: 100%;
  z-index: 400;
  background: ${theme.backgroundColor};
`;

export const SearchBarHits = styled.div`
  color: ${theme.primary};
  background: ${theme.backgroundColor};
  border-bottom: 1px solid ${theme.primary};
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
  padding: 0 ${theme.gutter}px;

  :last-child {
    border-bottom: 0;
  }

  :hover,
  :active {
    background: ${theme.colors.aqua};
  }
`;

export const SearchBarHitContent = styled.div`
  padding: ${theme.gutter * 2}px;
  color: ${theme.colors.black};
  border-bottom: 1px solid ${theme.colors['gray-medium']};
`;

export const SearchBarButton = styled(Button)``;

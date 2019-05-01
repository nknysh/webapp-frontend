import styled from 'styled-components';

import Label from 'components/elements/Label';

import theme from 'styles/theme';
import { Input } from 'styles/elements';

export const StyledIndexSearch = styled.div`
  position: relative;
`;

export const IndexSearchLabel = styled(Label)`
  text-transform: uppercase;
`;

export const IndexSearchInput = styled(Input)`
  font-family: ${theme.fonts.defaultFont};
  text-transform: uppercase;
`;

export const IndexSearchResults = styled.div`
  position: absolute;
  overflow-y: auto;
  box-shadow: ${theme.boxShadows.default};
  border-radius: ${theme.borderRadius}px;
  border: 1px solid ${theme.borders.default};
  width: 100%;
  z-index: 400;
  background: ${theme.backgrounds.default};
`;

export const IndexSearchHits = styled.div`
  color: ${theme.primary};
  background: ${theme.backgrounds.default};
  border-bottom: 1px solid ${theme.borders.default};
  text-transform: uppercase;

  :first-child {
    border-top: 0;
  }

  :last-child {
    border-bottom: 0;
  }
`;

export const IndexSearchHit = styled.div`
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

export const IndexSearchHitContent = styled.div`
  padding: ${theme.gutter * 2}px;
  color: ${theme.colors.black};
  border-bottom: 1px solid ${theme.borders.medium};

  &:last-child {
    border: 0;
  }
`;

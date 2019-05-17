import styled from 'styled-components';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';

import { Container as BaseContainer } from 'styles/elements';
import { SearchBar as BaseSearchBar } from 'containers';

export const Container = styled(BaseContainer)``;

export const SearchArea = styled.div`
  background: ${theme.backgrounds.defaultOpacity};
`;

export const SearchBar = styled(BaseSearchBar)`
  margin: 0;

  ${breakpoints.tablet`
        padding: 0;
    `}
`;

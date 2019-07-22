import styled from 'styled-components';

import { SearchBar as BaseSearchBar } from 'containers';
import { theme, breakpoints } from 'styles';

export const SearchArea = styled.div`
  background: ${theme.backgrounds.defaultOpacity};
`;

export const SearchBar = styled(BaseSearchBar)`
  margin: 0;

  ${breakpoints.tablet`
        padding: 0;
    `}
`;

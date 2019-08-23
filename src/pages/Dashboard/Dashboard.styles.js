import styled from 'styled-components';

import { SearchBar as BaseSearchBar } from 'containers';
import { theme } from 'styles';

export const SearchArea = styled.div`
  background: ${theme.backgrounds.defaultOpacity};
`;

export const SearchBar = styled(BaseSearchBar)`
  margin: 0;

  ${props => props.theme.breakpoints.tablet`
        padding: 0;
    `}
`;

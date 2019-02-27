import styled from 'styled-components';

import { Hero } from 'components';

export const StyledSearch = styled.div`
  width: 100%;
`;

export const SearchHero = styled(Hero)`
  > * {
    max-width: 685px;
  }
`;

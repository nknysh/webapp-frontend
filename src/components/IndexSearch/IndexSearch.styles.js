import styled from 'styled-components';

import { Label } from 'components';

import theme from 'styles/theme';
import { Input } from 'styles/elements';

export const StyledIndexSearch = styled.div``;

export const IndexSearchLabel = styled(Label)`
  text-transform: uppercase;
`;

export const IndexSearchInput = styled(Input)`
  font-family: ${theme.defaultFont};
  text-transform: uppercase;
`;

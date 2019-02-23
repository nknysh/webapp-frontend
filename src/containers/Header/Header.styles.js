import styled from 'styled-components';

import theme from 'styles/theme';
import { Container } from 'styles/elements';

export const HeaderContainer = styled(Container)`
  display: flex;
  width: 100%;
  height: 120px;
  align-items: center;
`;

export const StyledHeader = styled.div`
  background: ${theme.backgroundColor}
  border-bottom: 1px solid #e1e1e1;
`;

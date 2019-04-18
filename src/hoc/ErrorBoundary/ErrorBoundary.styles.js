import styled from 'styled-components';

import { Pre } from 'styles/elements';
import { Heading1 } from 'styles/typography';

export const StyledErrorBoundary = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
`;

export const ErrorBoundaryTitle = styled(Heading1)``;

export const ErrorBoundaryPre = styled(Pre)`
  max-height: 300px;
  overflow: auto;
`;

import styled from 'styled-components';

import { Heading1 } from 'styles';

export const StyledErrorBoundary = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
`;

export const ErrorBoundaryTitle = styled(Heading1)``;

export const ErrorBoundaryPre = styled.pre`
  max-height: 300px;
  overflow: auto;
`;

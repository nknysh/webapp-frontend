import styled from 'styled-components';

import { Header, Footer } from 'containers';

export const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

export const LayoutHeader = styled(Header)``;
export const LayoutFooter = styled(Footer)`
  flex: 0 1;
`;

export const LayoutChildren = styled.div`
  flex: 1 1 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const LayoutContent = styled.div`
  flex: 1;
`;

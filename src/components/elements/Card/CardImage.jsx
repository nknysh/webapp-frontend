import styled from 'styled-components';

import theme from 'styles/theme';

export const CardImage = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  height: 300px;
  display: flex;
  align-items: flex-end;
  padding: ${theme.gutter * 2}px;
`;

export default CardImage;

import styled from 'styled-components';

import { theme, withDiscountStyles } from 'styles';

export const CardPrice = styled.span`
  ${withDiscountStyles};
  font-size: ${theme.fonts.sizes.big}px;
`;

export default CardPrice;

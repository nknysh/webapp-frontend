import styled from 'styled-components';

import { theme, withCurrency, withDiscountStyles } from 'styles';

export const CardPrice = styled.span`
  ${withCurrency};
  ${withDiscountStyles};
  font-size: ${theme.fonts.sizes.big}px;
`;

export default CardPrice;

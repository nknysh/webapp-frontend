import styled from 'styled-components';

import theme from 'styles/theme';
import { withCurrency, withDiscountStyles } from 'styles/elements';

export const CardPrice = styled.span`
  ${withCurrency};
  ${withDiscountStyles};
  font-size: ${theme.fonts.sizes.big}px;
`;

export default CardPrice;

import styled from 'styled-components';

import { theme, withCurrency, withDiscountStyles } from 'styles';

export const StyledSummary = styled.div`
  position: relative;
  display: flex;
  font-size: ${theme.fonts.sizes.default}px;
  text-transform: uppercase;
  letter-spacing: 0.46px;
  line-height: 20px;
  border-bottom: 1px solid ${theme.borders.default};
  padding: ${theme.gutter * 2}px 0;
`;

export const Title = styled.div`
  font-weight: ${theme.fonts.bold};
  flex: 0 0 100px;

  &:after {
    content: ':';
  }
`;

export const Products = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Product = styled.div`
  flex: 1 1 100%;
  margin: 0 ${theme.gutter}px;
`;

export const Totals = styled.div`
  flex: 1;
`;

export const Total = styled.div`
  ${withCurrency};
  ${withDiscountStyles};
  display: block;
  text-align: right;
`;

export const Details = styled.div`
  display: flex;
  margin-bottom: ${theme.gutter * 2}px;
`;

export const Offer = styled.span`
  display: block;
  ${withDiscountStyles};
`;

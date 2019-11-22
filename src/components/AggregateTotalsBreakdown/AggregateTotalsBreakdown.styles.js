import styled from 'styled-components';

import { theme } from 'styles';

export const OfferSpan = styled.span`
  color: ${theme.colors['red-fade']} !important;
  font-size: 13px;
`;

export const TotalBreakdownSpan = styled.span`
  color: ${theme.palette.secondary};
  text-transform: uppercase;
  font-size: 13px;
`;

export const Price = styled.span`
  font-size: 16px;
  letter-spacing: 1.62px;
  display: block;
  color: ${theme.palette.secondary};
  ${props => props.discount && `color: ${theme.colors['red-fade']} !important;`}
  ${props => props.preDiscount && `text-decoration: line-through;`}
`;

export const TotalSection = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

export const TotalSectionColumn = styled.div`
  ${props =>
    props.isLeft &&
    `
&:first-child {
  flex: 1;
}`}

  ${props => `
  margin-left: ${props.nestingLevel * 10}px;
`}
`;

export const GrandTotalLabel = styled.label``;

import styled from 'styled-components';

import { theme } from 'styles';
import { pureUiTheme } from '../../pureUi/pureUiTheme';

export const OfferSpan = styled.span`
  color: ${theme.colors['red-fade']} !important;
  font-size: 13px;
`;

export const TotalBreakdownSpan = styled.span`
  color: ${theme.palette.secondary};
  text-transform: uppercase;
  font-size: 13px;
`;

interface IPrice {
  discount?: any;
  preDiscount?: any;
}

export const Price = styled.span<IPrice>`
  font-size: 16px !important;
  letter-spacing: 1.62px;
  display: block;
  text-align: right;
  font-weight: bold;
  color: ${theme.palette.secondary};
  ${props => props.discount && `color: ${theme.colors['red-fade']} !important;`}
  ${props => props.preDiscount && `color: ${pureUiTheme.colors.blackLight}; text-decoration: line-through;`}
`;

export const TotalSection = styled.div`
  display: flex;
  flex-direction: row;
`;

export const LabelRed = styled.span`
  text-transform: uppercase;
  color: ${theme.colors['red-fade']} !important;
  font-size: 13px;
`;

interface ITotalSectionColumn {
  isLeft?: boolean;
  nestingLevel?: number;
}

export const TotalSectionColumn = styled.div<ITotalSectionColumn>`
  ${props =>
    props.isLeft &&
    `
&:first-child {
  flex: 1;
}`}

  ${props => `
  margin-left: ${props.nestingLevel ? props.nestingLevel * 10 : 0}px;
`}
`;

export const GrandTotalLabel = styled.label``;

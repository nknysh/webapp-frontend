import styled, { css } from 'styled-components';
import { theme } from 'styles';
import { Text, Total } from '../SummaryForm/SummaryForm.styles';

export const LodgingSummaryCard = styled.div`
  border-bottom: 1px solid ${theme.borders.default};
  padding-bottom: 10px;
  margin-top: 15px;

  &:first-child {
    margin-top: 0px;
  }

  &:last-child {
    margin-bottom: 0px;
    border-bottom: none;
  }
`;

export const CollapseButton = styled.button`
  float: right;
  display: inline-block;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
`;

export const CollapseHeader = styled(Text)`
  height: 30px;
`;

export const LodgingTotal = styled(Total)`
  margin: 0;
  font-size: 16px;
  line-height: auto;

  ${({ ['data-secondary']: secondary }) =>
    secondary &&
    css`
      font-size: 14px;
    `}

  ${({ ['data-discounted']: secondary }) =>
    secondary &&
    css`
      font-size: 14px;
    `}
`;

export const LodgingSummaryTitle = styled(Text)`
  height: 48px;
`;

export const LodgingTotalWrapper = styled.div`
  float: right;
`;

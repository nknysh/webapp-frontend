import styled, { css } from 'styled-components';
import { Text, Total } from '../SummaryForm/SummaryForm.styles';
import { Select, Button } from '@pure-escapes/webapp-ui-components';

export const LodgingSummaryCard = styled.div``;

export const CollapseButton = styled.button`
  float: right;
  display: inline-block;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
`;

export const CollapseHeader = styled(Text)`
  min-height: 40px;
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

export const ChildAgeSelect = styled(Select)``;

export const CollapsibleSection = styled.div``;

export const ButtonSmall = styled(Button)`
  font-size: 14px;
  padding: 10px;
  width: 200px;
`;

import styled from 'styled-components';
import { theme } from 'styles';

export const LodgingSummaryCard = styled.div`
  border-bottom: 1px solid ${theme.borders.default};
  padding-bottom: 10px;

  &:last-child {
    margin-bottom: 0px;
    border-bottom: none;
  }
`;

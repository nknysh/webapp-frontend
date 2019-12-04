import React from 'react';
import { formatPrice, calculatePercentage } from 'utils';
import styled from 'styled-components';
import { theme, Heading2 } from 'styles';

const Label = styled.span`
  display: block;
  text-transform: uppercase;
  color: ${theme.palette.light};
  font-size: 13px;
`;

const CommissionSummary = ({
  total,
  currencyCode,
  marginType,
  marginAmount,
}: {
  total: string;
  currencyCode: string;
  marginType: 'percentage' | 'flat';
  marginAmount: string;
}) => {
  if (!marginAmount || marginAmount === '0') {
    return <Label>No commission applied</Label>;
  }

  if (marginType === 'percentage') {
    return (
      <Label>
        Your commission:{' '}
        <strong>
          {currencyCode}
          {formatPrice(calculatePercentage(total, marginAmount))}
        </strong>
        , {marginAmount}% of the total cost shown above.
      </Label>
    );
  }

  if (marginType === 'flat') {
    return (
      <Label>
        Your commission is{' '}
        <strong>
          {currencyCode}
          {formatPrice(marginAmount)}
        </strong>
      </Label>
    );
  }
};

export default CommissionSummary;

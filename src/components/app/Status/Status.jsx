import styled, { css } from 'styled-components';

import theme from 'styles/theme';
import { BookingStatusTypes } from 'config/enums';

const statusStyles = type => {
  switch (type) {
    case BookingStatusTypes.CANCELLED:
      return css`
        background-color: ${theme.cancelled};
      `;

    case BookingStatusTypes.REQUESTED:
      return css`
        background-color: ${theme.requested};
      `;

    case BookingStatusTypes.CONFIRMED:
      return css`
        background-color: ${theme.confirmed};
      `;

    default:
      return css`
        background-color: ${theme.pending};
      `;
  }
};

export const Status = styled.span`
  text-transform: capitalize;
  font-size: ${theme.fonts.sizes.normal}px;

  :before {
    ${({ ['data-status']: status }) => statusStyles(status)}
    content: '';
    width: ${theme.gutter}px;
    height: ${theme.gutter}px;
    border-radius: 50%;
    margin: 0 ${theme.gutter}px 0 ${theme.gutter / 2}px;
    display: inline-flex;
  }
`;

export default Status;
import styled, { css } from 'styled-components';
import { Countdown } from '@pure-escapes/webapp-ui-components';

import { theme, withCurrency, withDiscountStyles } from 'styles';

export const Room = styled.article`
  position: relative;
  font-size: ${theme.fonts.sizes.default}px;
  color: ${theme.palette.secondary};
  text-transform: uppercase;
  border-bottom: 1px solid ${theme.borders.default};
  padding: ${theme.spacing.gutter * 2}px 0;
  letter-spacing: ${theme.fonts.letterSpacing.mid}px;
  line-height: 24px;
  display: flex;
  align-items: flex-start;

  :first-child {
    padding-top: 0;
  }

  :last-child {
    border-bottom: 0;
    padding-bottom: 0;
  }
`;

export const RoomRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  ${withDiscountStyles};
`;

export const RoomColumn = styled.div`
  flex: ${({ ['data-shrink']: shrink }) => (shrink ? '0 1' : '1 0')};
  padding: 0 ${theme.spacing.gutter / 2}px;

  :first-child {
    padding-left: 0;
  }

  :last-child {
    padding-right: 0;
  }
`;

export const RoomP = styled.p`
  margin: 0;
  padding: 0;
`;

export const RoomName = styled(RoomP)`
  font-weight: ${theme.fonts.bold};

  ${({ ['data-errors']: hasErrors }) =>
    hasErrors &&
    css`
      color: ${theme.error};
    `}
`;

export const RoomDetail = styled(RoomP)``;

export const RoomPrice = styled.span`
  ${withCurrency};
  ${withDiscountStyles};
  display: block;
  line-height: 1;
  margin-top: ${theme.spacing.gutter / 2}px;
`;

export const ExtraSupplement = styled.div`
  display: block;
  width: 100%;
`;

export const ExtraSupplementRate = styled.span`
  ${withCurrency}
`;

export const RoomDetails = styled.div`
  flex: 1;
`;

export const RoomImages = styled.div`
  display: block;
  width: 150px;
  position: relative;
  padding-right: ${theme.spacing.gutter}px;
  align-self: flex-start;
`;

export const RoomImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Error = styled(RoomRow)`
  color: ${theme.error};
`;

export const Hold = styled.div`
  color: ${theme.palette.error};
  font-size: 10px;
`;

export const HoldLabel = styled.p`
  font-weight: bold;
  padding: 0;
  margin: 0;
`;

export const HoldCountdown = styled(Countdown)`
  color: ${theme.palette.error};
`;

import styled, { css } from 'styled-components';

import theme from 'styles/theme';
import { withCurrency } from 'styles/elements';

export const Room = styled.article`
  position: relative;
  font-size: ${theme.fonts.sizes.default}px;
  color: ${theme.secondary};
  text-transform: uppercase;
  border-bottom: 1px solid ${theme.borders.default};
  padding: ${theme.gutter * 2}px 0;
  letter-spacing: ${theme.fonts.letterSpacing.mid}px;
  line-height: 24px;
  display: flex;
  align-items: center;

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
`;

export const RoomColumn = styled.div`
  flex: ${({ ['data-shrink']: shrink }) => (shrink ? '0 1' : '1 0')};
  padding: 0 ${theme.gutter / 2}px;

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
  width: 25%;
  position: relative;
  padding-right: ${theme.gutter}px;
`;

export const RoomImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Error = styled(RoomRow)`
  color: ${theme.error};
`;

export const ExtraSummary = styled.div`
  display: flex;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.46px;
  line-height: 20px;
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 0;
`;

export const ExtraSummaryTitle = styled.div`
  width: 23%;
  font-weight: bold;
  flex: 1 0 23%;
`;

export const ExtraSummaryProduct = styled.div`
  flex: 1 1 100%;
  margin: 0 10px;
`;

export const ExtraSummaryTotal = styled.div`
  ${withCurrency};
  flex: 1;
  text-align: right;
`;

export const AddonSummaries = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AddonSummary = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

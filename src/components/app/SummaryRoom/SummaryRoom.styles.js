import styled from 'styled-components';
import { Icon } from '@material-ui/core';

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
`;

export const RoomDetail = styled(RoomP)``;

export const RoomPrice = styled.span`
  ${withCurrency};
`;

export const RoomMenu = styled(Icon)`
    font-size: ${theme.fonts.sizes.mid}px !important;
    font-weight: ${theme.fonts.bold};
    line-height: 24px
    overflow: visible !important;
    padding-top: 4px;
  cursor: pointer;
`;

export const ExtraSupplement = styled.div``;
export const ExtraSupplementRate = styled.span`
  ${withCurrency}
`;

export const RoomDetails = styled.div`
  flex: 1;
`;

export const RoomImage = styled.div`
  width: 25%;
  display: block;
`;

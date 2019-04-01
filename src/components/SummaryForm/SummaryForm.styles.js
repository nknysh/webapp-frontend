import styled from 'styled-components';
import { Icon } from '@material-ui/core';

import uiConfig from 'config/ui';

import theme from 'styles/theme';
import { Heading2 } from 'styles/typography';

export const StyledSummary = styled.aside`
  background: ${theme.colors.whiteish};
  padding: ${theme.gutter * 2}px;
`;

export const Title = styled.h3`
  font-size: 12px;
  padding: 0 0 ${theme.gutter * 1.5}px;
  text-transform: uppercase;
  font-weight: ${theme.bold};
  letter-spacing: 0.5px;
  line-height: 14px;
  color: ${theme.colors['gold-neutral']};
  border-bottom: 1px solid ${theme.borderColor};
`;

export const Section = styled.div`
  padding: ${theme.gutter * 3}px 0;
`;

export const Total = styled.p`
    color: ${theme.colors['gold-dark']};	
    font-size: 42px;	
    letter-spacing: 1.62px;	
    line-height: 20px;
    padding: 0;
    margin: 0 0 ${theme.gutter * 2.5}px;
    
    :before {
        content: '${uiConfig.currency.symbol}';
      }
`;

export const Text = styled.p`
  color: ${theme.colors['gold-dark']};
  font-size: 12px;
  line-height: 20px;
  text-transform: uppercase;
  margin: 0;
  padding: 0;
`;

export const Saving = styled.span`
    font-weight: ${theme.bold};
    
:before {
    content: '${uiConfig.currency.symbol}';
  }
`;

export const HotelName = styled(Heading2)`
  font-size: 20px;
  font-weight: ${theme.normal};
  line-height: 26px;
  padding: ${theme.gutter * 2}px 0;
  margin: 0;
  border-bottom: 1px solid ${theme.borderColor};
  border-top: 1px solid ${theme.borderColor};
`;

export const Rooms = styled.div`
  :not(:empty) {
    padding: ${theme.gutter * 2}px 0;
    border-bottom: 1px solid ${theme.borderColor};
  }
`;

export const Room = styled.article`
  position: relative;
  font-size: 12px;
  color: ${theme.colors['gold-dark']};
  text-transform: uppercase;
  display: flex;
  border-bottom: 1px solid ${theme.borderColor};
  padding: ${theme.gutter * 2}px 0;
  letter-spacing: 0.46px;
  line-height: 24px

  :first-child {
    padding-top: 0;
  }

  :last-child {
    border-bottom: 0;
    padding-bottom: 0;
  }
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
  font-weight: ${theme.bold};
`;

export const RoomDetail = styled(RoomP)``;

export const RoomPrice = styled.span`    
  :before {
    content: '${uiConfig.currency.symbol}';
  }
`;

export const RoomMenu = styled(Icon)`
    font-size: 16px !important;
    font-weight: ${theme.bold};
    line-height: 24px
    overflow: visible !important;
    padding-top: 4px;
  cursor: pointer;
`;

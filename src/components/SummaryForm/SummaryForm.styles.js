import styled from 'styled-components';
import { Icon } from '@material-ui/core';

import DatePicker from 'components/DatePicker';
import Modal from 'components/Modal';
import Checkbox from 'components/Checkbox';

import uiConfig from 'config/ui';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';
import { Button } from 'styles/elements';
import { Heading2, Heading3 } from 'styles/typography';

export const StyledSummary = styled.div`
  background: ${theme.colors.whiteish};
  padding: ${theme.gutter * 2}px;
  margin-bottom: ${theme.gutter * 2}px;
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

export const DatePrice = styled.div`
  color: ${theme.colors.black};
  font-weight: ${theme.normal};
  margin-top: ${theme.gutter / 2}px;

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

export const RoomRow = styled.div`
  display: flex;
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

export const EditForm = styled.section`
  padding: ${theme.gutter * 2}px;
  position: relative;

  ${breakpoints.tablet`
    padding: ${theme.gutter * 8}px ${theme.gutter * 10}px;
    min-width: 600px;
  `}
`;

export const EditFormTitle = styled(Heading3)`
  font-family: ${theme.headingFont};
  color: ${theme.colors['gold-dark']};
  text-transform: capitalize;
  letter-spacing: 0.5px;
  line-height: 29px;
  padding: 0;
  margin: 0 0 ${theme.gutter * 5}px;
  font-size: 22px;
`;

export const EditFormSection = styled.div`
  margin: 0 0 ${theme.gutter * 5}px;

  :last-child {
    margin: 0;
  }
`;

export const StyledDatePicker = styled(DatePicker)`
  position: relative;

  .date-picker {
    margin: ${theme.gutter}px 0;

    .date-picker__day {
      min-height: 55px !important;
    }
  }
`;

export const StyledModal = styled(Modal)`
  .room-summary-form {
    ${breakpoints.tablet`
      overflow: visible;
    `}
  }
`;

export const SummaryFormActions = styled.div`
  margin-top: ${theme.gutter}px;
  padding-top: ${theme.gutter}px;
`;

export const SummaryFormButton = styled(Button)``;

export const Margin = styled.div``;

export const MarginCheckbox = styled(Checkbox)`
  label {
    margin: 0 !important;

    > span {
      padding-left: 0 !important;
      font-size: 12px !important;
      line-height: 14px !important;
      text-transform: uppercase;
      color: ${theme.primary} !important;
    }
  }
`;

export const MarginInputs = styled.div`
  ${breakpoints.tablet`

display: flex;

> * {
  flex: 1;
  margin: ${theme.gutter / 2}px;

  :first-child {
    margin-left: 0;
  }

  :last-child {
    margin-right: 0;
  }
}
`}
`;

export const MarginTotal = styled.div`
  color: ${theme.colors['gold-dark']};
  margin: ${theme.gutter}px 0;
  font-size: 12px;
  line-height: 18px;
`;

export const MarginTotalAmount = styled.span`
  font-weight: ${theme.bold};

  :before {
    content: '${uiConfig.currency.symbol}';
  }
`;

export const MarginPercentSuffix = styled.span`
  :after {
    content: '%';
  }
`;

import styled from 'styled-components';

import { Modal } from 'components/elements';

import uiConfig from 'config/ui';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';
import { Button, withCurrency } from 'styles/elements';
import { Heading2 } from 'styles/typography';

export const StyledSummary = styled.div`
  background: ${theme.colors.whiteish};
  padding: ${theme.gutter * 2}px;
  margin-bottom: ${theme.gutter * 2}px;

  label,
  label > span {
    color: ${theme.colors['gold-neutral']} !important;
    font-size: 13px !important;
    text-transform: uppercase;
  }
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
  ${withCurrency};
  font-weight: ${theme.bold};
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
  margin-bottom: ${theme.gutter * 4}px;

  :not(:empty) {
    padding: ${theme.gutter * 2}px 0;
    border-bottom: 1px solid ${theme.borderColor};
  }
`;

export const StyledModal = styled(Modal)`
  .room-summary-form {
    ${breakpoints.tablet`
      max-width: 600px;
      overflow: visible;
    `}
  }
`;

export const SummaryFormActions = styled.div`
  margin-top: ${theme.gutter}px;
  padding-top: ${theme.gutter}px;
`;

export const SummaryFormButton = styled(Button)``;

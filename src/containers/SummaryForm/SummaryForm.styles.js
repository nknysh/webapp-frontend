import styled, { css } from 'styled-components';

import { Modal } from 'components/elements';
import { SummaryFormMargin } from 'components/app';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';
import { Button, withCurrency } from 'styles/elements';
import { Heading2 } from 'styles/typography';

export const StyledSummary = styled.div`
  background: ${theme.backgrounds.secondary};
  padding: ${theme.gutter * 2}px;
  margin-bottom: ${theme.gutter * 3.5}px;
  position: relative;

  label,
  label > span {
    color: ${theme.neutral} !important;
    font-size: ${theme.fonts.sizes.less}px !important;
    text-transform: uppercase;
  }
`;

export const Title = styled.h3`
  font-size: ${theme.fonts.sizes.default}px;
  padding: 0 0 ${theme.gutter * 1.5}px;
  text-transform: uppercase;
  font-weight: ${theme.fonts.bold};
  letter-spacing: ${theme.fonts.letterSpacing.medium}px;
  line-height: 14px;
  color: ${theme.neutral};
  border-bottom: 1px solid ${theme.borders.default};
`;

export const Section = styled.div`
  padding: ${theme.gutter * 3}px 0;
`;

export const Total = styled.p`
  ${({ ['data-request']: onRequest }) =>
    !onRequest &&
    css`
      ${withCurrency}
    `} 
    color: ${theme.secondary};	
    font-size: 42px;	
    letter-spacing: 1.62px;	
    line-height: 20px;
    padding: 0;
    margin: 0 0 ${theme.gutter * 2.5}px;
`;

export const Text = styled.p`
  color: ${theme.secondary};
  font-size: ${theme.fonts.sizes.default}px;
  line-height: 20px;
  text-transform: uppercase;
  margin: 0;
  padding: 0;
`;

export const Saving = styled.span`
  ${withCurrency};
  font-weight: ${theme.fonts.bold};
`;

export const Rooms = styled.div`
  ${({ ['data-summary']: summaryOnly, ['data-compact']: compact }) =>
    !summaryOnly &&
    !compact &&
    css`
      margin-bottom: ${theme.gutter * 4}px;
    `}

  :not(:empty) {
    padding: ${theme.gutter * 2}px 0;
    border-bottom: 1px solid ${theme.borders.default};
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
  display: flex;
`;

export const SummaryFormButton = styled(Button)`
  flex: 1;

  margin: 0 ${theme.gutter}px;

  :last-child {
    margin-right: 0;
  }

  :first-child {
    margin-left: 0;
  }
`;

export const Errors = styled.div`
  text-align: center;
  color: ${theme.backgrounds.secondary};
`;

export const Error = styled.p`
  background: ${theme.error};
  display: block;
  margin: 0 0 ${theme.gutter / 2}px;
  padding: ${theme.gutter}px;
  text-transform: uppercase;
  font-weight: ${theme.fonts.bold};
`;

export const Hotel = styled.div`
  padding: ${theme.gutter * 1.5}px 0;
  border-bottom: 1px solid ${theme.borders.default};
  border-top: 1px solid ${theme.borders.default};

  ${({ ['data-compact']: compact }) =>
    compact &&
    css`
      display: flex;
      align-items: center;
      border-top: 0;

      h2 {
        flex: 1;
      }

      p {
        margin: 0;
        flex: 1;
        font-size: 20px;
        letter-spacing: 0.5px;
        text-align: right;
      }
    `})}
`;

export const HotelName = styled(Heading2)`
  font-size: 20px;
  font-weight: ${theme.fonts.normal};
  margin: 0;
  padding: 0;
`;

export const TotalMargin = styled(SummaryFormMargin)`
  margin-top: 20px;
`;

export const EditGuard = styled.div`
  max-width: 600px;
  padding: ${theme.gutter * 6}px;
`;

export const ModalContent = styled.div`
  padding: ${theme.gutter * 6}px;
  max-width: 600px;
  text-align: center;
`;

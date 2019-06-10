import styled, { css } from 'styled-components';
import { Icon } from '@material-ui/core';

import { default as BaseBookingForm } from 'components/app/BookingForm';
import { Markdown, Modal } from 'components/elements';
import SummaryForm from 'containers/SummaryForm';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';
import { Button, withCurrency } from 'styles/elements';
import { Heading2 } from 'styles/typography';

import {
  StyledBreadcrumbs as BaseStyledBreadcrumbs,
  Back as BaseBack,
  Aside as BaseAside,
  StyledHotelContainer as BaseStyledHotelContainer,
} from 'containers/HotelContainer/HotelContainer.styles';

export const StyledHotelContainer = styled(BaseStyledHotelContainer)``;

export const StyledSummary = styled(SummaryForm)``;

export const StyledBreadcrumbs = styled(BaseStyledBreadcrumbs)``;

export const Back = styled(BaseBack)``;

export const Main = styled.main`
  ${breakpoints.tablet`  
    display: flex;
    margin: ${theme.gutter * 6}px ${theme.gutter}px 0;
  `}
`;

export const Aside = styled(BaseAside)``;

export const BookingForm = styled(BaseBookingForm)``;

export const SubmitButton = styled(Button)``;

export const BookingPath = styled.div`
  background: ${theme.backgrounds.secondary};
  color: ${theme.colors['gold-light']};
  padding: ${theme.gutter * 2}px;
  border-bottom: 1px solid ${theme.primary};
  font-size: ${theme.fonts.sizes.normal}px;
  line-height: 14px;
  font-weight: ${theme.fonts.bold};
  text-transform: uppercase;
  display: flex;
  align-items: center;
`;

export const Chevron = styled(Icon)`
  margin: 0 ${theme.gutter * 1.5}px;
  font-size: ${theme.fonts.sizes.normal}px !important;
  height: auto !important;
`;

export const BookingPathSegment = styled.span`
  font-size: ${theme.fonts.sizes.default}px;

  ${({ ['data-active']: active }) =>
    active &&
    css`
      color: ${theme.secondary};
    `}
`;

export const PaymentMethod = styled.div`
  padding: ${theme.gutter * 4}px 0;
`;

export const StyledModal = styled(Modal)`
  .pay-by {
    padding: ${theme.gutter * 4}px ${theme.gutter * 2}px;

    ${breakpoints.tablet`
      padding: ${theme.gutter * 8.5}px ${theme.gutter * 10}px;
      width: 600px;
    `}
  }
`;

export const ModalTitle = styled(Heading2)`
  color: ${theme.secondary};
  font-size: ${theme.fonts.sizes.bigger}px;
  font-weight: 500;
  letter-spacing: ${theme.fonts.letterSpacing.medium}px;
  line-height: 29px;
`;

export const ModalBody = styled.div`
  max-width: 600px;
  padding: ${theme.gutter * 8.4}px ${theme.gutter * 10}px;
`;
export const ModalContent = styled(Markdown)`
  margin-bottom: ${theme.gutter * 6}px;
`;

export const Total = styled.span`
  ${withCurrency};
`;

export const FormWrapper = styled.div`
  margin: ${theme.gutter * 5}px ${theme.gutter * 2}px;

  ${breakpoints.tablet`
    flex: 1;
    margin-top: 0;
    margin-right: ${theme.gutter * 15}px;
  `}

  ${({ ['data-hidden']: hidden }) =>
    hidden &&
    css`
      display: none;
    `}
`;

export const Confirmation = styled(FormWrapper)``;

export const ConfirmationContent = styled(Markdown)`
  font-size: ${theme.fonts.sizes.mid}px;
  line-height: 24px;
`;

import styled, { css } from 'styled-components';

import { default as BaseBookingForm } from 'components/app/BookingForm';
import { Markdown, Modal } from 'components/elements';
import { Summary } from 'components/app';

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
import { Icon } from '@material-ui/core';

export const StyledHotelContainer = styled(BaseStyledHotelContainer)``;

export const StyledSummary = styled(Summary)``;

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
  background: ${theme.colors.whiteish};
  color: ${theme.colors['gold-light']};
  padding: ${theme.gutter * 2}px;
  border-bottom: 1px solid ${theme.primary};
  font-size: 12px;
  line-height: 14px;
  font-weight: ${theme.bold};
  text-transform: uppercase;
  display: flex;
  align-items: center;
`;

export const Chevron = styled(Icon)`
  margin: 0 ${theme.gutter * 1.5}px;
  font-size: 14px !important;
  height: auto !important;
`;

export const BookingPathSegment = styled.span`
  ${({ ['data-active']: active }) =>
    active &&
    css`
      color: ${theme.colors['gold-dark']};
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
  color: ${theme.colors['gold-dark']};
  font-size: 22px;
  font-weight: 500;
  letter-spacing: 0.5px;
  line-height: 29px;
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
  font-size: 16px;
  line-height: 24px;
`;

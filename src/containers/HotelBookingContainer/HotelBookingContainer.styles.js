import styled, { css } from 'styled-components';
import { Icon } from '@material-ui/core';
import { Markdown, Modal } from '@pure-escapes/webapp-ui-components';

import { default as BaseBookingForm } from 'components/BookingForm';
import SummaryForm from 'containers/SummaryForm';

import { theme, Heading2 } from 'styles';

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
  ${props => props.theme.breakpoints.tablet`  
    display: flex;
    margin: ${theme.spacing.gutter * 6}px ${theme.spacing.gutter}px 0;
  `}
`;

export const Aside = styled(BaseAside)``;

export const BookingForm = styled(BaseBookingForm)``;

export const BookingPath = styled.div`
  background: ${theme.backgrounds.secondary};
  color: ${theme.colors['gold-light']};
  padding: ${theme.spacing.gutter * 2}px;
  border-bottom: 1px solid ${theme.palette.primary};
  font-size: ${theme.fonts.sizes.normal}px;
  line-height: 14px;
  font-weight: ${theme.fonts.bold};
  text-transform: uppercase;
  display: flex;
  align-items: center;
`;

export const Chevron = styled(Icon)`
  margin: 0 ${theme.spacing.gutter * 1.5}px;
  font-size: ${theme.fonts.sizes.normal}px !important;
  height: auto !important;
`;

export const BookingPathSegment = styled.span`
  font-size: ${theme.fonts.sizes.default}px;

  ${({ ['data-active']: active }) =>
    active &&
    css`
      color: ${theme.palette.secondary};
    `}
`;

export const PaymentMethod = styled.div`
  padding: ${theme.spacing.gutter * 4}px 0;
`;

export const StyledModal = styled(Modal)`
  .pay-by {
    padding: ${theme.spacing.gutter * 4}px ${theme.spacing.gutter * 2}px;

    ${props => props.theme.breakpoints.tablet`
      padding: ${theme.spacing.gutter * 8.5}px ${theme.spacing.gutter * 10}px;
      width: 600px;
    `}
  }
`;

export const ModalTitle = styled(Heading2)`
  color: ${theme.palette.secondary};
  font-size: ${theme.fonts.sizes.bigger}px;
  font-weight: 500;
  letter-spacing: ${theme.fonts.letterSpacing.medium}px;
  line-height: 29px;
`;

export const ModalBody = styled.div`
  max-width: 600px;
  padding: ${theme.spacing.gutter * 8.4}px ${theme.spacing.gutter * 2}px;

  ${props => props.theme.breakpoints.tablet`
    padding-left: ${theme.spacing.gutter * 10}px;
    padding-right: ${theme.spacing.gutter * 10}px;
  `}
`;
export const ModalContent = styled(Markdown)`
  margin-bottom: ${theme.spacing.gutter * 6}px;
`;

export const Total = styled.span``;

export const FormWrapper = styled.div`
  margin: ${theme.spacing.gutter * 5}px ${theme.spacing.gutter * 2}px;

  ${props => props.theme.breakpoints.tablet`
    flex: 1;
    margin-top: 0;
    margin-right: ${theme.spacing.gutter * 15}px;
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

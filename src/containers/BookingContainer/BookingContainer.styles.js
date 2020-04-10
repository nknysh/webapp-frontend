import styled from 'styled-components';
import { theme, Heading2 } from 'styles';

import { Main as BaseMain, Aside as BaseAside } from 'containers/HotelBookingContainer/HotelBookingContainer.styles';
import {
  StatusStrip as BaseStatusStrip,
  StatusStripDate as BaseStatusStripDate,
} from 'containers/ProposalContainer/ProposalContainer.styles';
import BookingStatus from 'pureUi/BookingStatus';

export { Back } from 'containers/HotelBookingContainer/HotelBookingContainer.styles';

export const Booking = styled.div`
  ${props => props.theme.breakpoints.tablet`
    margin: ${theme.spacing.gutter * 8.5}px ${theme.spacing.gutter * 2}px ${theme.spacing.gutter * 2}px;
  `}
`;

export const Aside = styled(BaseAside)`
  ${props => props.theme.breakpoints.tablet`
    margin-top: 0;
  `}
`;

export const StatusStrip = styled(BaseStatusStrip)`
  display: flex;
  position: relative;

  ${props => props.theme.breakpoints.tablet`
    margin: 0;
  `}
`;

export const StatusStripDate = styled(BaseStatusStripDate)`
  flex: 1;
  font-weight: ${theme.fonts.normal};
`;

export const StatusStripStatus = styled(BookingStatus)`
  flex: 0 0 auto;
  position: relative;
  font-size: 14px;
  text-transform: none;
`;

export const Main = styled(BaseMain)`
  padding: ${theme.spacing.gutter * 2}px;
  margin-top: ${theme.spacing.gutter * 2}px !important;

  ${props => props.theme.breakpoints.tablet`
    padding: 0;
    flex: 1;
    display: flex;
  `}
`;

export const BookingContent = styled.article`
  ${props => props.theme.breakpoints.tablet`
    margin: 0;
    padding: 0;
    flex: 1;
    margin-right: ${theme.spacing.gutter * 14.5}px;

    .booking-status {
      margin: 20px 20px 50px 20px;
    }

  `}
`;

export const BookingTitle = styled.h1`
  font-family: ${theme.fonts.headingFont};
  margin: 0;
  padding: 0;
  font-size: 22px;
  color: ${theme.palette.neutral};
  line-height: 29px;
  margin: ${theme.spacing.gutter * 3}px ${theme.spacing.gutter * 2}px;
`;
export const GuestDetails = styled.div`
  margin: ${theme.spacing.gutter * 2}px;

  ${props => props.theme.breakpoints.tablet`
    margin: ${theme.spacing.gutter * 4}px 0;
  `}
`;

export const GuestName = styled.p`
  padding: 0;
  text-transform: uppercase;
  font-weight: ${theme.fonts.bold};
  color: ${theme.dark};
  margin-bottom: ${theme.spacing.gutter}px;
`;

export const FlightInfoList = styled.ul`
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const Bolded = styled.span`
  font-weight: ${theme.fonts.bold};
  letter-spacing: 0.5px;
  line-height: 17px;
  text-transform: uppercase;

  span {
    font-weight: ${theme.fonts.bold};
    letter-spacing: 0.5px;
    line-height: 17px;
    text-transform: uppercase;
  }
`;

export const FlightInfo = styled.li`
  position: relative;
  padding: ${theme.spacing.gutter}px 0 ${theme.spacing.gutter * 2.5}px ${theme.spacing.gutter * 3.5}px;

  &:first-child {
    padding-top: ${theme.spacing.gutter}px;
  }

  &:last-child {
    padding-bottom: ${theme.spacing.gutter}px;
  }

  &:before {
    position: absolute;
    left: 13px;
    top: 0;
    content: '';
    height: 100%;
    width: 0;
    border-left: 1px dotted;
  }
`;

export const Dot = styled.span`
  background-color: #736a65;
  display: block;
  width: ${theme.spacing.gutter}px;
  height: ${theme.spacing.gutter}px;
  border-radius: 50%;
  position: absolute;
  left: 8px;
  top: 13px;
`;

export const FlightRow = styled.span`
  display: block;
  color: ${theme.dark};
  letter-spacing: 0.5px;
  line-height: 17px;
  margin-bottom: ${theme.spacing.gutter}px;
  text-transform: uppercase;

  &:last-child {
    margin: 0;
  }
`;

export const Tag = styled.p`
  margin: 0;
  font-size: ${theme.fonts.sizes.default}px;
  text-transform: uppercase;
  color: ${theme.palette.neutral};
  padding: 0 0 ${theme.spacing.gutter}px ${theme.spacing.gutter * 1.5}px;

  &:last-child {
    padding-bottom: 0;
  }
  :before {
    content: '';
    border-color: transparent #111;
    border-style: solid;
    border-width: 3px 0 3px 4px;
    display: block;
    height: 0;
    width: 0;
    left: -${theme.spacing.gutter}px;
    top: ${theme.spacing.gutter}px;
    position: relative;
  }
`;

export const ModalTitle = styled(Heading2)`
  color: ${theme.palette.secondary};
  font-size: ${theme.fonts.sizes.bigger}px;
  font-weight: 500;
  letter-spacing: ${theme.fonts.letterSpacing.medium}px;
  line-height: 29px;
`;

export const ModalContent = styled.div`
  margin: ${theme.spacing.gutter * 6}px ${theme.spacing.gutter}px;

  ${props => props.theme.breakpoints.tablet`
    margin-right: ${theme.spacing.gutter * 6}px;
    margin-left: ${theme.spacing.gutter * 6}px;
    min-width: 600px;
  `}
`;

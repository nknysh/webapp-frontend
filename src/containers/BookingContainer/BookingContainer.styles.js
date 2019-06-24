import styled from 'styled-components';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';
import { Container } from 'styles/elements';

import { Status } from 'components';

import { Main as BaseMain, Aside as BaseAside } from 'containers/HotelBookingContainer/HotelBookingContainer.styles';
import {
  StatusStrip as BaseStatusStrip,
  StatusStripDate as BaseStatusStripDate,
} from 'containers/ProposalContainer/ProposalContainer.styles';

export { Back } from 'containers/HotelBookingContainer/HotelBookingContainer.styles';

export const StyledBookingContainer = styled(Container)``;

export const Booking = styled.div`
  ${breakpoints.tablet`
    margin: ${theme.gutter * 8.5}px ${theme.gutter * 2}px ${theme.gutter * 2}px;
  `}
`;

export const Aside = styled(BaseAside)`
  ${breakpoints.tablet`
    margin-top: 0;
  `}
`;

export const StatusStrip = styled(BaseStatusStrip)`
  display: flex;
  position: relative;

  ${breakpoints.tablet`
    margin: 0;
  `}
`;

export const StatusStripDate = styled(BaseStatusStripDate)`
  flex: 1;
  font-weight: ${theme.fonts.normal};
`;

export const StatusStripStatus = styled(Status)`
  flex: 0 0 auto;
  position: relative;
`;

export const Main = styled(BaseMain)`
  padding: ${theme.gutter * 2}px;
  margin-top: ${theme.gutter * 2}px !important;

  ${breakpoints.tablet`
    padding: 0;
    flex: 1;
    display: flex;
  `}
`;

export const BookingContent = styled.article`
  ${breakpoints.tablet`
    margin: 0;
    padding: 0;
    flex: 1;
    margin-right: ${theme.gutter * 14.5}px;
  `}
`;

export const BookingTitle = styled.h1`
  font-family: ${theme.fonts.headingFont};
  margin: 0;
  padding: 0;
  font-size: 22px;
  color: ${theme.neutral};
  line-height: 29px;
  margin: ${theme.gutter * 3}px ${theme.gutter * 2}px;
`;
export const GuestDetails = styled.div`
  margin: ${theme.gutter * 2}px;

  ${breakpoints.tablet`
    margin: ${theme.gutter * 4}px 0;
  `}
`;

export const GuestName = styled.p`
  padding: 0;
  text-transform: uppercase;
  font-weight: ${theme.fonts.bold};
  color: ${theme.dark};
  margin-bottom: ${theme.gutter}px;
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
  padding: ${theme.gutter}px 0 ${theme.gutter * 2.5}px ${theme.gutter * 3.5}px;

  &:first-child {
    padding-top: ${theme.gutter}px;
  }

  &:last-child {
    padding-bottom: ${theme.gutter}px;
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
  width: ${theme.gutter}px;
  height: ${theme.gutter}px;
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
  margin-bottom: ${theme.gutter}px;
  text-transform: uppercase;

  &:last-child {
    margin: 0;
  }
`;

export const Tag = styled.p`
  margin: 0;
  font-size: ${theme.fonts.sizes.default}px;
  text-transform: uppercase;
  color: ${theme.neutral};
  padding: 0 0 ${theme.gutter}px ${theme.gutter * 1.5}px;

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
    left: -${theme.gutter}px;
    top: ${theme.gutter}px;
    position: relative;
  }
`;

import styled from 'styled-components';
import { Icon } from '@material-ui/core';
import { Button } from '@pure-escapes/webapp-ui-components';

import { theme } from 'styles';

import {
  StyledBreadcrumbs as BaseStyledBreadcrumbs,
  Back as BaseBack,
  StyledHotelContainer as BaseStyledHotelContainer,
} from 'containers/HotelContainer/HotelContainer.styles';

import { HotelName as BaseHotelName } from 'containers/SummaryForm/SummaryForm.styles';

export {
  BookingPath,
  BookingPathSegment,
  Chevron,
} from 'containers/HotelBookingContainer/HotelBookingContainer.styles';

export { Brochure } from 'containers/HotelContainer/HotelContainer.styles';

export const StyledProposalContainer = styled(BaseStyledHotelContainer)``;

export const StyledBreadcrumbs = styled(BaseStyledBreadcrumbs)``;

export const Back = styled(BaseBack)``;

export const ProposalsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Proposal = styled.div`
  ${props => props.theme.breakpoints.tablet`
    margin: ${theme.spacing.gutter * 6.1}px ${theme.spacing.gutter * 2}px ${theme.spacing.gutter * 2}px;
    display: flex;
  `}
`;

export const ProposalSummary = styled.div`
  margin: ${theme.spacing.gutter * 2}px;

  ${props => props.theme.breakpoints.tablet`
    margin: 0;
    flex: 1 1 50%;
    margin-right: ${theme.spacing.gutter * 2.5}px;
    max-width: 50%;
  `}
`;

export const ProposalGuestForm = styled.div`
  margin: ${theme.spacing.gutter * 2}px;

  ${props => props.theme.breakpoints.tablet`
    margin-top: ${theme.spacing.gutter}px;
    padding-left: ${theme.spacing.gutter * 8.2}px;
    flex: 1 1 50%;
    max-width: 50%;
  `}
`;

export const ProposalGuestFormNotes = styled.div`
  font-size: ${theme.fonts.sizes.normal}px;
  margin-top: ${theme.spacing.gutter * 3}px;

  ol {
    padding-left: 1em;

    li {
      margin-bottom: 10px;
    }
  }
`;

export const Title = styled.h3`
  font-size: ${theme.fonts.sizes.default}px;
  padding: 0 0 ${theme.spacing.gutter * 1.5}px;
  text-transform: uppercase;
  font-weight: ${theme.fonts.bold};
  letter-spacing: ${theme.fonts.letterSpacing.medium}px;
  line-height: 14px;
  color: ${theme.palette.neutral};
  border-bottom: 1px solid ${theme.borders.medium};
  margin-bottom: ${theme.spacing.gutter * 2.4}px;
`;

export const HotelName = styled(BaseHotelName)`
  flex: none;
  width: 100%;
  padding: 0 0 ${theme.spacing.gutter * 2}px;
  margin-bottom: ${theme.spacing.gutter * 2}px;
  border: 0;
  border-bottom: 1px solid ${theme.borders.default};

  ${props => props.theme.breakpoints.tablet`
    flex: 1 1 50%;
    margin-bottom: 0;
    border: 0;
    padding: 0;
  `}
`;

export const HotelTotal = styled.div`
  flex: 1 1 50%;
  font-size: 20px;
  padding: 0 0 ${theme.spacing.gutter * 2}px;
  border-bottom: 1px solid ${theme.borders.default};
  display: flex;
  align-items: center;
  color: ${theme.palette.secondary};

  ${props => props.theme.breakpoints.tablet`
    padding: 0;
    margin: 0;
    border: 0;
    text-align: right;
  `}
`;

export const StatusStrip = styled.div`
  background: ${theme.backgrounds.secondary};
  padding: ${theme.spacing.gutter * 2}px;
  text-transform: uppercase;
  font-size: ${theme.fonts.sizes.default}px;

  ${props => props.theme.breakpoints.tablet`
    margin: 0 ${theme.spacing.gutter * 2}px; 
  `}
`;

export const StatusStripDate = styled.span`
  font-weight: ${theme.fonts.bold};
`;

export const ProposalId = styled.h1`
  font-family: ${theme.fonts.headingFont};
  margin: ${theme.spacing.gutter * 3}px ${theme.spacing.gutter * 2}px;
  line-height: 29px;
  color: ${theme.palette.neutral};
  font-size: ${theme.fonts.sizes.bigger}px;
`;

export const ProposalGuestInfo = styled.div`
  margin: ${theme.spacing.gutter * 2}px;

  ${props => props.theme.breakpoints.tablet`
    margin: 0;
    margin-top: ${theme.spacing.gutter}px;
    padding-left: ${theme.spacing.gutter * 8.2}px;
    flex: 1 1 50%;
    max-width: 50%;
  `}
`;

export const GuestName = styled.span`
  font-weight: ${theme.fonts.bold};
  font-size: ${theme.fonts.sizes.normal};
`;

export const ProposalActionsWrapper = styled.div`
  position: absolute;
  top: ${theme.spacing.gutter}px;
  right: ${theme.spacing.gutter}px;
`;

export const ProposalActions = styled.div`
  position: relative;
`;

export const Menu = styled(Icon)`
    font-size: ${theme.fonts.sizes.mid}px !important;
    font-weight: ${theme.fonts.bold};
    line-height: 24px
    overflow: visible !important;
    padding-top: 4px;
  cursor: pointer;
`;

export const BookingFormActions = styled.div`
  display: flex;
`;

export const BookingFormAction = styled(Button)`
  flex: 1 1 50%;
  margin: 0 ${theme.spacing.gutter}px;

  :first-child {
    margin-left: 0;
  }

  :last-child {
    margin-right: 0;
  }
`;

export const PDFFrame = styled.div`
  height: 100%;

  iframe {
    min-height: 768px;
    min-width: 600px;
    border: 0;
    outline: 0;
  }
`;

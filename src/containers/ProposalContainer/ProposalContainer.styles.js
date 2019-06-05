import styled from 'styled-components';
import { Icon } from '@material-ui/core';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';

export { Button } from 'styles/elements';

export {
  BookingPath,
  BookingPathSegment,
  Chevron,
} from 'containers/HotelBookingContainer/HotelBookingContainer.styles';

import {
  StyledBreadcrumbs as BaseStyledBreadcrumbs,
  Back as BaseBack,
  StyledHotelContainer as BaseStyledHotelContainer,
} from 'containers/HotelContainer/HotelContainer.styles';

import { HotelName as BaseHotelName } from 'containers/SummaryForm/SummaryForm.styles';

export const StyledProposalContainer = styled(BaseStyledHotelContainer)``;

export const StyledBreadcrumbs = styled(BaseStyledBreadcrumbs)``;

export const Back = styled(BaseBack)``;

export const Proposal = styled.div`
  ${breakpoints.tablet`
    margin: ${theme.gutter * 6.1}px ${theme.gutter * 2}px ${theme.gutter * 2}px;
    display: flex;
  `}
`;

export const ProposalSummary = styled.div`
  margin: ${theme.gutter * 2}px;

  ${breakpoints.tablet`
    margin: 0;
    flex: 1 1 50%;
    margin-right: ${theme.gutter * 2.5}px;
    max-width: 50%;
  `}
`;

export const ProposalGuestForm = styled.div`
  margin: ${theme.gutter * 2}px;

  ${breakpoints.tablet`
    margin-top: ${theme.gutter}px;
    padding-left: ${theme.gutter * 8.2}px;
    flex: 1 1 50%;
    max-width: 50%;
  `}
`;

export const Title = styled.h3`
  font-size: ${theme.fonts.sizes.default}px;
  padding: 0 0 ${theme.gutter * 1.5}px;
  text-transform: uppercase;
  font-weight: ${theme.fonts.bold};
  letter-spacing: ${theme.fonts.letterSpacing.medium}px;
  line-height: 14px;
  color: ${theme.neutral};
  border-bottom: 1px solid ${theme.borders.medium};
  margin-bottom: ${theme.gutter * 2.4}px;
`;

export const HotelName = styled(BaseHotelName)`
  flex: none;
  width: 100%;
  padding: 0 0 ${theme.gutter * 2}px;
  margin-bottom: ${theme.gutter * 2}px;
  border: 0;
  border-bottom: 1px solid ${theme.borders.default};

  ${breakpoints.tablet`
    flex: 1 1 50%;
    margin-bottom: 0;
    border: 0;
    padding: 0;
  `}
`;

export const HotelTotal = styled.div`
  flex: 1 1 50%;
  font-size: 20px;
  padding: 0 0 ${theme.gutter * 2}px;
  border-bottom: 1px solid ${theme.borders.default};
  display: flex;
  align-items: center;
  color: ${theme.secondary};

  ${breakpoints.tablet`
    padding: 0;
    margin: 0;
    border: 0;
    text-align: right;
  `}
`;

export const StatusStrip = styled.div`
  background: ${theme.backgrounds.secondary};
  padding: ${theme.gutter * 2}px;
  text-transform: uppercase;
  font-size: ${theme.fonts.sizes.default}px;

  ${breakpoints.tablet`
    margin: 0 ${theme.gutter * 2}px; 
  `}
`;

export const StatusStripDate = styled.span`
  font-weight: ${theme.fonts.bold};
`;

export const ProposalId = styled.h1`
  font-family: ${theme.fonts.headingFont};
  margin: ${theme.gutter * 3}px ${theme.gutter * 2}px;
  line-height: 29px;
  color: ${theme.neutral};
  font-size: ${theme.fonts.sizes.bigger}px;
`;

export const ProposalGuestInfo = styled.div`
  margin: ${theme.gutter * 2}px;

  ${breakpoints.tablet`
    margin: 0;
    margin-top: ${theme.gutter}px;
    padding-left: ${theme.gutter * 8.2}px;
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
  top: ${theme.gutter}px;
  right: ${theme.gutter}px;
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

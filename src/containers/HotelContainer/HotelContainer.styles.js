import styled from 'styled-components';
import { Container, BackButton, Modal, Button } from '@pure-escapes/webapp-ui-components';

import { Breadcrumbs, Hotel } from 'components';
import SummaryForm from 'containers/SummaryForm';

import { theme } from 'styles';

export const StyledHotelContainer = styled(Container)`
  margin-bottom: ${theme.spacing.gutter * 2}px;

  ${props => props.theme.breakpoints.tablet`
    padding-top: ${theme.spacing.gutter * 6.5}px;
  `}
`;

export const StyledHotel = styled(Hotel)`
  ${props => props.theme.breakpoints.tablet`
        flex: 1;
        max-width: 64%;
        padding: 0;
        margin-top: ${theme.spacing.gutter * 2}px;
    `}
`;

export const StyledSummary = styled(SummaryForm)``;

export const StyledBreadcrumbs = styled(Breadcrumbs)`
  margin-left: ${theme.spacing.gutter}px;
  margin-right: ${theme.spacing.gutter}px;
`;

export const Full = styled.div`
  display: flex;
`;

export const Back = styled(BackButton)`
  display: flex;
  padding ${theme.spacing.gutter * 2}px !important;
`;

export const Aside = styled.aside`
  position: relative;

  ${props => props.theme.breakpoints.tablet`
    flex: 1;
    max-width: 36%;
    margin-top: ${theme.spacing.gutter * 2}px;
  `}
`;

export const Title = styled.h3`
  font-size: ${theme.fonts.sizes.default}px;
  padding: 0 0 ${theme.spacing.gutter * 1.45}px;
  text-transform: uppercase;
  font-weight: ${theme.fonts.bold};
  letter-spacing: ${theme.fonts.letterSpacing.medium}px;
  line-height: 14px;
  color: ${theme.palette.neutral};
  border-bottom: 1px solid ${theme.borders.default};
`;

export const AsideDetails = styled.div`
  margin: 0 ${theme.spacing.gutter * 2}px ${theme.spacing.gutter * 3.5}px;

  ${props => props.theme.breakpoints.tablet`
    margin-left: 0;
    margin-right: 0;
  `}
`;

export const Brochure = styled.a`
  display: block;
  cursor: pointer;
  color: ${theme.palette.primary};
  font-size: ${theme.fonts.sizes.default}px;
  font-weight: ${theme.fonts.bold};
  text-transform: uppercase;
  line-height: 14px;
  letter-spacing: 0.38px;
  padding: ${theme.spacing.gutter * 0.75}px 0;

  :before {
    content: '+ ';
  }
`;

export const StyledModal = styled(Modal)``;

export const SummaryActions = styled.div`
  display: flex;
  margin: ${theme.spacing.gutter * 1.5}px 0;
`;

export const SummaryAction = styled(Button)`
  background: ${theme.palette.light};
  flex: 1 1 50%;
  margin: 0 ${theme.spacing.gutter}px;

  :first-child {
    margin-left: 0;
  }

  :last-child {
    margin-right: 0;
  }
`;

export const Text = styled.p`
  color: ${theme.palette.secondary};
  font-size: ${theme.fonts.sizes.normal}px;
`;

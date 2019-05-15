import styled from 'styled-components';

import { BackButton, Breadcrumbs, Hotel, SummaryForm } from 'components';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';
import { Container } from 'styles/elements';

export const StyledHotelContainer = styled(Container)`
  width: 100%;
  margin-bottom: ${theme.gutter * 2}px;

  ${breakpoints.tablet`
    padding-top: ${theme.gutter * 6.5}px;
  `}
`;

export const StyledHotel = styled(Hotel)`
  ${breakpoints.tablet`
        flex: 1;
        max-width: 64%;
        padding: 0;
        margin-top: ${theme.gutter * 2}px;
    `}
`;

export const StyledSummary = styled(SummaryForm)``;

export const StyledBreadcrumbs = styled(Breadcrumbs)`
  margin-left: ${theme.gutter}px;
  margin-right: ${theme.gutter}px;
`;

export const Full = styled.div`
  display: flex;
`;

export const Back = styled(BackButton)`
  display: flex;
  padding ${theme.gutter * 2}px !important;
`;

export const Aside = styled.aside`
  ${breakpoints.tablet`
    flex: 1;
    max-width: 36%;
    margin-top: ${theme.gutter * 2}px;
  `}
`;

export const Title = styled.h3`
  font-size: ${theme.fonts.sizes.default}px;
  padding: 0 0 ${theme.gutter * 1.45}px;
  text-transform: uppercase;
  font-weight: ${theme.fonts.bold};
  letter-spacing: ${theme.fonts.letterSpacing.medium}px;
  line-height: 14px;
  color: ${theme.neutral};
  border-bottom: 1px solid ${theme.borders.default};
`;

export const AsideDetails = styled.div`
  margin: 0 ${theme.gutter * 2}px ${theme.gutter * 3.5}px;

  ${breakpoints.tablet`
    margin-left: 0;
    margin-right: 0;
  `}
`;

export const Brochure = styled.a`
  display: block;
  cursor: pointer;
  color: ${theme.primary};
  font-size: ${theme.fonts.sizes.default}px;
  font-weight: ${theme.fonts.bold};
  text-transform: uppercase;
  line-height: 14px;
  letter-spacing: 0.38px;
  padding: ${theme.gutter * 0.75}px 0;

  :before {
    content: '+ ';
  }
`;

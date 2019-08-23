import styled from 'styled-components';

import { theme } from 'styles';

import { Title as BaseTitle } from 'components/SearchFilters/SearchFilters.styles';

const headerSpacing = theme.spacing.gutter * 2 - theme.spacing.gutter / 2;

export const Section = styled.div`
  background: ${theme.palette.navigation};
  padding: ${theme.spacing.gutter * 2.6}px ${theme.spacing.gutter * 2.1}px;
  margin: 0 0 ${headerSpacing * 2}px;

  label,
  label > span {
    color: ${theme.palette.neutral};
    font-size: ${theme.fonts.sizes.default}px !important;
    text-transform: uppercase;
  }

  p {
    font-size: ${theme.fonts.sizes.default}px;
    margin: 0 0 ${theme.spacing.gutter}px;
    color: ${theme.palette.neutral};
  }
`;

export const Title = styled(BaseTitle)``;

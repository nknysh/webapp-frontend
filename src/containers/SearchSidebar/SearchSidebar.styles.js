import styled from 'styled-components';

import theme from 'styles/theme';

import { Title as BaseTitle } from 'components/app/SearchFilters/SearchFilters.styles';

const headerSpacing = theme.gutter * 2 - theme.gutter / 2;

export const Section = styled.div`
  background: ${theme.navigation};
  padding: ${theme.gutter * 2.6}px ${theme.gutter * 2.1}px;
  margin: 0 0 ${headerSpacing * 2}px;

  label,
  label > span {
    color: ${theme.neutral};
    font-size: ${theme.fonts.sizes.default}px !important;
    text-transform: uppercase;
  }

  p {
    font-size: ${theme.fonts.sizes.default}px;
    margin: 0 0 ${theme.gutter}px;
    color: ${theme.neutral};
  }
`;

export const Title = styled(BaseTitle)``;

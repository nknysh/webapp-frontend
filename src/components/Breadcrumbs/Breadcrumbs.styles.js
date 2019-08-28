import styled, { css } from 'styled-components';
import { Link } from '@pure-escapes/webapp-ui-components';

import { theme } from 'styles';

export const StyledBreadcrumbs = styled.div`
  padding: ${theme.spacing.gutter}px 0;
  margin: ${theme.spacing.gutter * 2}px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

export const Crumb = styled.div`
    padding: 0 ${theme.spacing.gutter * 2.5}px;

    a {
        padding: 0 ${theme.spacing.gutter / 2}px !important;
    }

    :not(span){
        line-height: 20px; !important;
    }

    :not(:first-child) {
        border-left: 1px solid ${theme.borders.default};
    }

    :first-child {
        padding-left: 0;
    }
`;

export const CrumbLink = styled(Link)`
  color: ${theme.palette.primary} !important;
  font-weight: ${theme.fonts.bold};
  text-transform: uppercase;
  font-size: ${theme.fonts.sizes.default}px;
  letter-spacing: ${theme.fonts.letterSpacing.medium}px;

  padding-top: 8px !important;

  ${({ ['data-active']: active }) =>
    active &&
    css`
      color: ${theme.palette.neutral} !important;
    `}
`;

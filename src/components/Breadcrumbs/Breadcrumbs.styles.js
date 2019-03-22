import styled, { css } from 'styled-components';

import { Link } from 'components';

import theme from 'styles/theme';

export const StyledBreadcrumbs = styled.div`
  padding: ${theme.gutter}px 0;
  margin: ${theme.gutter * 2}px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

export const Crumb = styled.div`
    padding: 0 ${theme.gutter * 2.5}px;

    a {
        padding: 0 ${theme.gutter / 2}px !important;
    }

    :not(span){
        line-height: 20px; !important;
    }

    :not(:first-child) {
        border-left: 1px solid ${theme.borderColor};
    }

    :first-child {
        padding-left: 0;
    }
`;

export const CrumbLink = styled(Link)`
  color: ${theme.primary} !important;
  font-weight: ${theme.bold};
  text-transform: uppercase;
  font-size: 12px;

  padding-top: 8px !important;

  ${({ ['data-active']: active }) =>
    active &&
    css`
      color: ${theme.colors['gold-neutral']} !important;
    `}
`;

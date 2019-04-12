import styled from 'styled-components';
import { __, prop } from 'ramda';

import breakpoints from 'styles/breakpoints';
import theme from 'styles/theme';

import Link from 'components/Link';

const alignMap = {
  start: 'flex-start',
  middle: 'center',
  end: 'flex-end',
};

const getAlignment = prop(__, alignMap);

export const Links = styled.div`
  > div {
    border-bottom: 1px solid ${theme.borderColor};
    padding: ${theme.gutter / 2}px;

    ${breakpoints.tablet`
      padding: 0;
      border: 0;
    `}

    :first-child {
      padding-top: 0;
    }

    :last-child {
      border: 0;
      padding-bottom: 0;
    }
  }
  ${breakpoints.tablet`
    display: flex;
    justify-content: ${({ align }) => getAlignment(align)};
  `}
`;

export const MenuLink = styled(Link)`
  font-weight: ${({ ['data-active']: isActive }) => isActive && 'bold'};
  display: block;
  transition: ${theme.defaultTransition};
  text-transform: uppercase;

  a {
    padding: 0;
    margin: 0;
  }

  ${breakpoints.tablet`
    font-size: ${theme.linkSize}px;
    text-align: center;
    height: auto;
    transition: ${theme.defaultTransition};
    width: auto;
  `}
`;

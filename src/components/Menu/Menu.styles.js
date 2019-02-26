import styled from 'styled-components';
import { __, prop } from 'ramda';

import breakpoints from 'styles/breakpoints';
import theme from 'styles/theme';

import { Link } from 'components';

const alignMap = {
  start: 'flex-start',
  middle: 'center',
  end: 'flex-end',
};

const getAlignment = prop(__, alignMap);

export const Links = styled.div`
  > div {
    border-bottom: 1${theme.unit} solid ${theme.colors['gray-darker']};
    padding: ${theme.gutter / 2}${theme.unit};

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
  display: block;
  transition: ease-in-out 0.25s all;
  text-transform: uppercase;

  a {
    padding: 0;
    margin: 0;
  }

  ${breakpoints.tablet`
    font-size: ${theme.linkSize}${theme.unit};
    text-align: center;
    height: auto;
    transition: ease-in-out 0.25s all;
    width: auto;
  `}
`;

import styled from 'styled-components';
import { __, prop } from 'ramda';

import { theme, breakpoints } from 'styles';

import Link from 'components/elements/Link';

const alignMap = {
  start: 'flex-start',
  middle: 'center',
  end: 'flex-end',
};

const getAlignment = prop(__, alignMap);

export const Links = styled.div`
  ${breakpoints.tablet`
    display: flex;
    justify-content: ${({ align }) => getAlignment(align)};
  `}
`;

export const MenuLink = styled(Link)`
  border-bottom: 1px solid ${theme.borders.default};
  display: block;
  font-weight: ${({ ['data-active']: isActive }) => isActive && 'bold'};
  margin: 0 ${theme.gutter}px;
  padding: ${theme.gutter * 2}px 0;
  text-transform: uppercase;
  transition: ${theme.defaultTransition};

  &:last-child {
    border: 0;
  }

  ${breakpoints.tablet`
    border: 0;
    flex: 1;
    font-size: ${theme.fonts.sizes.link}px;
    height: auto;
    padding: ${theme.gutter}px;
    text-align: center;
    transition: ${theme.defaultTransition};
    width: auto;
  `}
`;

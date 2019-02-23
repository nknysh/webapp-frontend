import styled from 'styled-components';
import { __, prop } from 'ramda';

import { Link } from 'components/Link';

const alignMap = {
  start: 'flex-start',
  middle: 'center',
  end: 'flex-end',
};

const getAlignment = prop(__, alignMap);

export const MenuLink = styled(Link)`
  display: block;
  font-size: 11px;
  text-transform: uppercase;
  text-align: center;
  height: auto;
  transition: ease-in-out 0.25s all;
`;

export const Links = styled.div`
  display: flex;
  width: 100%;
  justify-content: ${({ align }) => getAlignment(align)};
`;

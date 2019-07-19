import styled from 'styled-components';

import theme from 'styles/theme';

export const Ul = styled.ul`
  list-style: none;
  padding: 0 ${theme.gutter / 2}px 0 0;
  margin: 0;
`;
export const Ol = styled.ol``;
export const Li = styled.li`
  margin: 0;
  font-size: ${theme.fonts.sizes.default}px;
  text-transform: uppercase;
  color: ${theme.neutral};
  padding: 0 0 ${theme.gutter}px ${theme.gutter * 1.5}px;

  &:last-child {
    padding-bottom: 0;
  }

  :before {
    content: '';
    border-color: transparent #111;
    border-style: solid;
    border-width: 3px 0 3px 4px;
    display: block;
    height: 0;
    width: 0;
    left: -${theme.gutter}px;
    top: ${theme.gutter}px;
    position: relative;
  }
`;

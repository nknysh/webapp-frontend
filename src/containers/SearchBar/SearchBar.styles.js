import styled from 'styled-components';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';

export const StyledSearchBar = styled.div`
  color: ${theme.primary};
  background: ${theme.backgrounds.defaultOpacity};
  padding: ${theme.gutter}px;
  margin: ${theme.gutter * 10}px 0 0;
  max-width: none;
  text-align: left;
  display: flex;
  flex-direction: column;

  label,
  label > span {
    font-size: ${theme.fonts.sizes.default}px;
    letter-spacing: 0.46px;
    line-height: ${theme.fonts.sizes.normal}px;
  }

  ${breakpoints.desktop`
    flex-direction: row;
    align-items: flex-end;
    margin-left: ${theme.gutter * 4}px;
    margin-right: ${theme.gutter * 4}px;
  `}
`;

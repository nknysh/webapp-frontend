import styled from 'styled-components';

import { theme } from 'styles';

export const StyledSearchBar = styled.div`
  color: ${theme.palette.primary};
  background: ${theme.backgrounds.defaultOpacity};
  padding: ${theme.spacing.gutter}px;
  margin: ${theme.spacing.gutter * 10}px 0 0;
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

  ${props => props.theme.breakpoints.desktop`
    flex-direction: row;
    align-items: flex-end;
    margin-left: ${theme.spacing.gutter * 4}px;
    margin-right: ${theme.spacing.gutter * 4}px;
  `}
`;

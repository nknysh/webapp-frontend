import styled from 'styled-components';
import { Menu } from '@pure-escapes/webapp-ui-components';

import { theme, P } from 'styles';

export const StyledFooter = styled.div`
  display: block;
  background: ${theme.backgrounds.light};
  padding: ${theme.spacing.gutter * 3}px ${theme.spacing.gutter * 2}px ${theme.spacing.gutter}px;
`;

export const FooterMenu = styled(Menu)`
  text-align: center;
  padding-bottom: ${theme.spacing.gutter * 2}px;
  font-size: ${theme.fonts.sizes.normal}px;

  ${props => props.theme.breakpoints.desktop`
    padding-top: ${theme.spacing.gutter / 2}px;
    margin-top: ${theme.spacing.gutter * 2.3}px;
    width: 100%;
  `}

  > div {
    border: 0;

    a,
    a:visited {
      color: ${theme.palette.neutral} !important;
      padding: ${theme.spacing.gutter / 2}px;
      font-size: ${theme.fonts.sizes.default}px;
      letter-spacing: 0.5px;
      line-height: 13px;

      ${props => props.theme.breakpoints.desktop`
        padding: 0;
        font-size: ${theme.fonts.sizes.link}px;
      `}
    }
  }
`;

export const FooterColumns = styled.div`
  display: flex;
  padding: ${theme.spacing.gutter}px;
  border-top: 2px solid ${theme.borders.medium};

  ${props => props.theme.breakpoints.desktop`
    align-items: flex-start;
  `}
`;

export const FooterColumn = styled.div`
  display: ${({ flex }) => flex && 'flex'};
  justify-content: ${({ align }) => align};
  flex: 0 1 50%;
  font-size: ${theme.fonts.sizes.default}px;
  color: ${theme.colors['gold-light']};
  width: 100%;

  ${props => props.theme.breakpoints.desktop`
    flex: 0 1 25%;
    margin-top: ${theme.spacing.gutter * 2.3}px;
    font-size: ${theme.fonts.sizes.link}px;
  `}
`;

export const FooterText = styled.div`
  p {
    margin: ${theme.spacing.gutter / 2}px 0;
    padding: 0;
    line-height: ${theme.fonts.sizes.default * 2}px;
  }
`;

export const FooterCopyright = styled.div`
  text-align: center;
  margin-top: ${theme.spacing.gutter}px;

  img {
    margin: 0 0 ${theme.spacing.gutter * 1.86}px;
    padding: 0;
  }

  p {
    padding: 0;
    margin: 0;
  }
`;

export const FooterCopyrightText = styled(P)`
  margin: ${theme.spacing.gutter}px 0;
  text-transform: uppercase;
`;

import styled from 'styled-components';

import breakpoints from 'styles/breakpoints';
import theme from 'styles/theme';
import { P } from 'styles/typography';

import { Menu } from 'components';

export const StyledFooter = styled.div`
  display: block;
  background: ${theme.backgrounds.light};
  padding: ${theme.gutter * 3}px ${theme.gutter * 2}px ${theme.gutter}px;
`;

export const FooterMenu = styled(Menu)`
  text-align: center;
  padding-bottom: ${theme.gutter * 2}px;
  font-size: ${theme.fonts.sizes.normal}px;

  ${breakpoints.desktop`
    padding-top: ${theme.gutter / 2}px;
    margin-top: ${theme.gutter * 2.3}px;
    width: 100%;
  `}

  > div {
    border: 0;

    a,
    a:visited {
      color: ${theme.neutral} !important;
      padding: ${theme.gutter / 2}px;
      font-size: ${theme.fonts.sizes.default}px;
      letter-spacing: 0.5px;
      line-height: 13px;

      ${breakpoints.desktop`
        padding: 0;
        font-size: ${theme.fonts.sizes.link}px;
      `}
    }
  }
`;

export const FooterColumns = styled.div`
  display: flex;
  padding: ${theme.gutter}px;
  border-top: 2px solid ${theme.borders.medium};

  ${breakpoints.desktop`
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

  ${breakpoints.desktop`
    flex: 0 1 25%;
    margin-top: ${theme.gutter * 2.3}px;
    font-size: ${theme.fonts.sizes.link}px;
  `}
`;

export const FooterText = styled.div`
  p {
    margin: ${theme.gutter / 2}px 0;
    padding: 0;
    line-height: ${theme.fonts.sizes.default * 2}px;
  }
`;

export const FooterCopyright = styled.div`
  text-align: center;
  margin-top: ${theme.gutter}px;

  img {
    margin: 0 0 ${theme.gutter * 1.86}px;
    padding: 0;
  }

  p {
    padding: 0;
    margin: 0;
  }
`;

export const FooterCopyrightText = styled(P)`
  margin: ${theme.gutter}px 0;
  text-transform: uppercase;
`;

import styled from 'styled-components';

import breakpoints from 'styles/breakpoints';
import theme from 'styles/theme';
import { Container } from 'styles/elements';
import { P } from 'styles/typography';

import { Menu } from 'components';

export const StyledFooter = styled.div`
  display: block;
  background: ${theme.backgrounds.light};
  padding: ${theme.gutter * 3}px;
`;

export const FooterContainer = styled(Container)``;

export const FooterMenu = styled(Menu)`
  text-align: center;
  padding-bottom: ${theme.gutter * 3}px;
  font-size: ${theme.fonts.sizes.normal}px;

  ${breakpoints.tablet`
    padding-top: ${theme.gutter}px;
    width: 100%;
  `}

  > div {
    border: 0;

    a,
    a:visited {
      color: ${theme.neutral} !important;

      ${breakpoints.tablet`
        padding: 0;
      `}
    }
  }
`;

export const FooterColumns = styled.div`
  display: flex;
  padding: ${theme.gutter}px;
  border-top: 1px solid ${theme.borders.normal};
`;

export const FooterColumn = styled.div`
  display: ${({ flex }) => flex && 'flex'};
  justify-content: ${({ align }) => align};
  flex: 0 1 50%
  padding-top: ${theme.gutter}px;
  font-size: ${theme.fonts.sizes.link}px;
  color: ${theme.colors['gold-light']}
  width: 100%;

  ${breakpoints.tablet`
    flex: 0 1 25%;
  `}
`;

export const FooterText = styled.div`
  p {
    margin: ${theme.gutter / 2}px 0;
    padding: 0;
  }
`;

export const FooterCopyright = styled.div`
  text-align: center;
`;

export const FooterCopyrightText = styled(P)`
  margin: ${theme.gutter}px 0;
`;

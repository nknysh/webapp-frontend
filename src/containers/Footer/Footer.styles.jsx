import styled from 'styled-components';
import PropTypes from 'prop-types';

import theme from 'styles/theme';
import { Container } from 'styles/elements';

import { Menu } from 'components/Menu';

export const StyledFooter = styled.div`
  display: block;
  background: ${theme.colors['gray-light']};
  padding: ${theme.gutter * 3}px;
`;

export const FooterContainer = styled(Container)`
  display: flex;
  padding: ${theme.gutter}px;
  border-top: 1px solid ${theme.colors.gray};
`;

export const FooterMenu = styled(Menu)``;

export const FooterColumn = styled.div`
  display: ${({ flex }) => flex && 'flex'};
  justify-content: ${({ align }) => align};
  flex: 0 1 25%
  padding-top: ${theme.gutter}px;
  text-transform: uppercase;
  font-size: 11px;
  color: ${theme.colors['gold-light']}
  width: 100%;
`;

export const FooterText = styled.p`
  margin: ${theme.gutter / 2}px 0;
`;

export const FooterCopyright = styled.div`
  text-align: center;
`;

export const FooterCopyrightText = styled.p`
  margin: ${theme.gutter}px 0;
`;

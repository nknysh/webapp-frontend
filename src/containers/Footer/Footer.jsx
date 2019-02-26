import React from 'react';
import { compose } from 'ramda';

import footerText from 'config/data/footer.md';

import logo from './assets/footer-logo.png';

import { propTypes } from './Footer.props';
import {
  StyledFooter,
  FooterContainer,
  FooterColumn,
  FooterMenu,
  FooterText,
  FooterCopyright,
  FooterCopyrightText,
} from './Footer.styles';
import connect from './Footer.state';
import Markdown from '../../components/Markdown/Markdown';

const currentDate = new Date();

export const Footer = ({ menu, className }) => (
  <StyledFooter className={className}>
    <FooterContainer>
      <FooterColumn>
        <FooterText>
          <Markdown>{footerText}</Markdown>
        </FooterText>
      </FooterColumn>

      <FooterMenu links={menu} />

      <FooterColumn flex align="flex-end">
        <FooterCopyright>
          {logo && <img src={logo} />}
          <FooterCopyrightText>&copy; {currentDate.getFullYear()} Pure Escapes</FooterCopyrightText>
        </FooterCopyright>
      </FooterColumn>
    </FooterContainer>
  </StyledFooter>
);

Footer.propTypes = propTypes;

export default compose(connect)(Footer);

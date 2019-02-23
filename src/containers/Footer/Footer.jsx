import React from 'react';
import { compose } from 'ramda';

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

const currentDate = new Date();

export const Footer = ({ menu, className }) => (
  <StyledFooter className={className}>
    <FooterContainer>
      <FooterColumn>
        <FooterText>DUBAI: +971(0) 43933100</FooterText>
        <FooterText>SEYCHELLES: +248 224 811</FooterText>
        <FooterText>UK: +44 (0)8447 365 985</FooterText>
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

import React from 'react';
import { compose } from 'ramda';

import footerText from 'config/data/footer.md';
import { renderMarkdown } from 'utils/markdown';

import logo from './assets/footer-logo.png';

console.log(footerText);

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

const footerAddress = renderMarkdown(footerText);

export const Footer = ({ menu, className }) => (
  <StyledFooter className={className}>
    <FooterContainer>
      <FooterColumn>
        <FooterText dangerouslySetInnerHTML={{__html: footerAddress}} />
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

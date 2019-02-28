import React from 'react';
import { compose } from 'ramda';

import theme from 'styles/theme';
import { Markdown } from 'components';
import { useCurrentWidth } from 'effects';

import footerText from 'config/ui/footer.md';
import logo from 'public/img/footer-logo.png';

import { propTypes, defaultProps } from './Footer.props';
import {
  FooterColumn,
  FooterColumns,
  FooterContainer,
  FooterCopyright,
  FooterCopyrightText,
  FooterMenu,
  FooterText,
  StyledFooter,
} from './Footer.styles';
import connect from './Footer.state';

const currentDate = new Date();

export const Footer = ({ menu, className }) => {
  const currentWidth = useCurrentWidth();
  const isMobile = currentWidth <= theme.breakpoints.tablet;

  const footerMenu = <FooterMenu links={menu} />;

  return (
    <StyledFooter className={className}>
      <FooterContainer>
        {isMobile && footerMenu}

        <FooterColumns>
          <FooterColumn>
            <FooterText>
              <Markdown>{footerText}</Markdown>
            </FooterText>
          </FooterColumn>

          {!isMobile && footerMenu}

          <FooterColumn flex align="flex-end">
            <FooterCopyright>
              {logo && <img src={logo} />}
              <FooterCopyrightText>&copy; {currentDate.getFullYear()} Pure Escapes</FooterCopyrightText>
            </FooterCopyright>
          </FooterColumn>
        </FooterColumns>
      </FooterContainer>
    </StyledFooter>
  );
};

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default compose(connect)(Footer);

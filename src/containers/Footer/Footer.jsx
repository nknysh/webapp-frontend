import React, { useEffect, useState } from 'react';
import { compose } from 'ramda';

import footerText from 'config/data/footer.md';
import { Markdown } from 'components';
import { windowExists } from 'utils/window';

import theme from 'styles/theme';

import logo from './assets/footer-logo.png';

import { propTypes } from './Footer.props';
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
  // eslint-disable-next-line
  const [currentWidth, setCurrentWidth] = useState(windowExists.innerWidth);
  const updateWidth = () => setCurrentWidth(windowExists.innerWidth || 0);

  useEffect(() => {
    if (windowExists.addEventListener) {
      windowExists.addEventListener('resize', updateWidth);
    }

    () => {
      if (windowExists.addEventListener) {
        windowExists.addEventListener('resize', updateWidth);
      }
    };
  });

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

export default compose(connect)(Footer);

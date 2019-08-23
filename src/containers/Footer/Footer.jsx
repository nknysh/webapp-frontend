import React from 'react';
import { compose } from 'ramda';
import { useTranslation } from 'react-i18next';
import { Markdown, Container } from '@pure-escapes/webapp-ui-components';

import { useCurrentWidth } from 'effects';
import { toDate } from 'utils';

import footerText from 'config/ui/footer.md';
import logo from 'public/assets/img/footer-logo.png';

import { propTypes, defaultProps } from './Footer.props';
import {
  FooterColumn,
  FooterColumns,
  FooterCopyright,
  FooterCopyrightText,
  FooterMenu,
  FooterText,
  StyledFooter,
} from './Footer.styles';
import connect from './Footer.state';

const renderFooterMenu = ({ menu }) => <FooterMenu links={menu} />;

export const Footer = ({ menu, className }) => {
  const { t } = useTranslation();
  const { isMobile } = useCurrentWidth();

  return (
    <StyledFooter className={className}>
      <Container>
        {isMobile && renderFooterMenu({ menu })}

        <FooterColumns>
          <FooterColumn>
            <FooterText>
              <Markdown>{footerText}</Markdown>
            </FooterText>
          </FooterColumn>

          {!isMobile && renderFooterMenu({ menu })}

          <FooterColumn flex align="flex-end">
            <FooterCopyright>
              {logo && <img src={logo} alt={t('title')} />}
              <FooterCopyrightText>&copy; {toDate().getFullYear()} Pure Escapes</FooterCopyrightText>
            </FooterCopyright>
          </FooterColumn>
        </FooterColumns>
      </Container>
    </StyledFooter>
  );
};

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default compose(connect)(Footer);

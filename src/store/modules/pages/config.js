import aboutData from 'config/pages/about';
import contactData from 'config/pages/contact';
import privacyData from 'config/pages/privacy';
import termsData from 'config/pages/terms';

export const PageIds = Object.freeze({
  ABOUT: 'about-us',
  CONTACT: 'contact-us',
  PRIVACY: 'privacy-policy',
  TERMS: 'terms-and-conditions',
});

export const PageData = Object.freeze({
  [PageIds.ABOUT]: {
    title: 'About Us',
    ...aboutData,
  },
  [PageIds.CONTACT]: {
    title: 'Contact Us',
    ...contactData,
  },
  [PageIds.PRIVACY]: {
    title: 'Privacy Policy',
    ...privacyData,
  },
  [PageIds.TERMS]: {
    title: 'Terms & Conditions',
    ...termsData,
  },
});

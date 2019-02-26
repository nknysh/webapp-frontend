import aboutData from './data/about';
import contactData from './data/contact';
import privacyData from './data/privacy';
import termsData from './data/terms';

export const PageIds = Object.freeze({
  ABOUT: 'about-us',
  CONTACT: 'contact-us',
  PRIVACY: 'privacy-policy',
  TERMS: 'terms-and-conditions',
});

export const PageData = Object.freeze({
  [PageIds.ABOUT]: {
    title: 'Who We Are',
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

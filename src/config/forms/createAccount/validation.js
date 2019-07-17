import validators from 'config/forms/validators';

export default validators.shape({
  title: validators.text(),
  firstName: validators.text(2),
  lastName: validators.text(2),
  email: validators.email(),
  companySignupInfo: validators.shape({
    name: validators.text(5),
    countryCode: validators.text(2, 2),
  }),
  phoneNumber: validators.match(/^\+?\d*$/, 'phone'),
  mobileNumber: validators.match(/^\+?\d*$/, 'phone'),
  agreeToTerms: validators.boolean(),
});

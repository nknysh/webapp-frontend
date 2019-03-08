import validators from 'config/forms/validators';

export default validators.shape({
  firstName: validators.text(2),
  lastName: validators.text(2),
  email: validators.email(),
  companySignupInfo: validators.shape({
    name: validators.text(5),
    country: validators.text(2, 2),
  }),
  phoneNumber: validators.match(/^\+?\d*$/, 'phone'),
  mobileNumber: validators.match(/^\+?\d*$/, 'phone'),
  agreeToTerms: validators.boolean(),
});

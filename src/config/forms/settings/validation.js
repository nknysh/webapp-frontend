import validators from 'config/forms/validators';

export default validators.shape({
  firstName: validators.text(2),
  lastName: validators.text(2),
  email: validators.email(),
});

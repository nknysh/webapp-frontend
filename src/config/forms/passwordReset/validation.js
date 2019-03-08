import validators from 'config/forms/validators';

export default validators.shape({
  email: validators.email(),
});

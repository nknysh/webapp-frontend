import validators from '../validators';

export default validators.shape({
  firstName: validators.text(2),
  lastName: validators.text(2),
  email: validators.email(),
});

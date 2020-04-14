import validators from '../validators';

export default validators.shape({
  email: validators.email(),
  password: validators.text(2),
});

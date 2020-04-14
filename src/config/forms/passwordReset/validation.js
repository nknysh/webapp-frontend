import validators from '../validators';

export default validators.shape({
  email: validators.email(),
});

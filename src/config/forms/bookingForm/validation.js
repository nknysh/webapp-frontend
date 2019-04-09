import validators from 'config/forms/validators';

export default validators.shape({
  guestFirstName: validators.text(2),
  guestLastName: validators.text(2),
});

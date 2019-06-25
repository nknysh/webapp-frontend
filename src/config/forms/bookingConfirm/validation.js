import validators from 'config/forms/validators';

export default onRequest =>
  validators.shape({ overrideTotal: onRequest ? validators.price().required() : validators.price() });

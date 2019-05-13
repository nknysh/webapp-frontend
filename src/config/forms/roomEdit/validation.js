import { pipe, path, reduce, equals, mapObjIndexed, prop, gt } from 'ramda';
import { array, object } from 'yup';

import errors from 'config/forms/errors';
import validators from 'config/forms/validators';

const getLimits = path(['options', 'occupancy', 'limits']);

const reduceMinMax = (accum, { name, maximum, minimum }) => ({
  ...accum,
  [equals('default', name) ? 'adult' : name]: { max: maximum, min: minimum },
});

const minMax = pipe(
  getLimits,
  reduce(reduceMinMax, {})
);

const mapMinMaxValidation = ({ max, min }) => {
  const schema = array()
    .default([])
    .min(min, prop('minGuests', errors))
    .max(max, prop('maxGuests', errors));

  if (gt(min, 0)) {
    schema.required(prop('required', errors));
  }

  return schema;
};

export default accommodationProduct => () => {
  const ageMinMax = mapObjIndexed(mapMinMaxValidation, minMax(accommodationProduct));

  return validators.shape({
    guests: array()
      .min(1, prop('minOneRoom', errors))
      .of(object().shape(ageMinMax)),
  });
};

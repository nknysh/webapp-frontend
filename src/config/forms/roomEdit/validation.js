import { pipe, path, reduce, equals, prop } from 'ramda';
import { array, object, number } from 'yup';

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

export default product => () => {
  const ageMinMax = minMax(product);

  return validators.shape({
    guestsAges: array()
      .min(1, prop('minOneRoom', errors))
      .of(
        object().shape({
          numberOfAdults: number()
            .min(path(['adult', 'min'], ageMinMax))
            .max(path(['adult', 'max'], ageMinMax)),
        })
      ),
  });
};

import { createSelectorCreator, defaultMemoize } from 'reselect';
import { equals } from 'ramda';

export default createSelectorCreator(defaultMemoize, equals);

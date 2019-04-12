import { path } from 'ramda';

import uiConfig from 'config/ui';

import info from './content/info.md';

export default {
  titles: {
    default: path(['labels', 'payByBT'], uiConfig),
  },
  content: {
    info,
  },
};

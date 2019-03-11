import { __, lte, path } from 'ramda';

import theme from 'styles/theme';

export const windowExists = typeof window !== 'undefined' ? window : {};

export const addEvent = (event, callback, context = windowExists) => {
  if (context.addEventListener) {
    context.addEventListener(event, callback);
  }
};

export const removeEvent = (event, callback, context = windowExists) => {
  if (context.removeEventListener) {
    context.removeEventListener(event, callback);
  }
};

export const isMobile = lte(__, path(['breakpoints', 'tablet'], theme));

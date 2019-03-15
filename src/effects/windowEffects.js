import { useState } from 'react';

import { windowExists, addEvent, removeEvent } from 'utils';
import { useEffectBoundary } from './genericEffects';

export const useCurrentWidth = () => {
  const [currentWidth, setCurrentWidth] = useState(windowExists.innerWidth || 0);
  const updateWidth = () => setCurrentWidth(windowExists.innerWidth || 0);

  useEffectBoundary(() => {
    addEvent('resize', updateWidth);

    () => {
      removeEvent('resize', updateWidth);
    };
  });

  return currentWidth;
};

const scrollToTop = () => {
  if (windowExists.scrollTo) {
    windowExists.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
};

export const useScrollToTop = changed => useEffectBoundary(scrollToTop, [changed]);

export const useKeyboard = (keyCode, callback) => {
  const onKeyPress = e => {
    if (e.keyCode !== keyCode) return;
    callback(e);
  };

  useEffectBoundary(() => {
    addEvent('keydown', onKeyPress);

    () => {
      removeEvent('keydown', onKeyPress);
    };
  });
};

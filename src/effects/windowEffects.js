import { useEffect, useState } from 'react';

import { windowExists, addEvent, removeEvent } from 'utils';

export const useCurrentWidth = () => {
  const [currentWidth, setCurrentWidth] = useState(windowExists.innerWidth || 0);
  const updateWidth = () => setCurrentWidth(windowExists.innerWidth || 0);

  useEffect(() => {
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

export const useScrollToTop = changed => useEffect(scrollToTop, [changed]);

export const useKeyboard = (keyCode, callback) => {
  const onKeyPress = e => {
    if (e.keyCode !== keyCode) return;
    callback(e);
  };

  useEffect(() => {
    addEvent('keydown', onKeyPress);

    () => {
      removeEvent('keydown', onKeyPress);
    };
  });
};

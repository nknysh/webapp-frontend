import { useState, useCallback } from 'react';

import { windowExists, addEvent, removeEvent, isMobile, isArray } from 'utils';
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

  return { currentWidth, isMobile: isMobile(currentWidth) };
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

const addBodyClass = className => document && document.body.classList.add(className);
const removeBodyClass = className => document && document.body.classList.remove(className);

export const useBodyClass = (classes = []) => {
  const [bodyClass, setBodyClass] = useState(classes);

  const unsetBodyClass = useCallback(className =>
    setBodyClass(isArray(className) ? className.map(removeBodyClass) : removeBodyClass(className))
  );

  useEffectBoundary(() => {
    isArray(bodyClass) ? bodyClass.map(addBodyClass) : addBodyClass(bodyClass);
  }, [bodyClass]);

  return { bodyClass, setBodyClass, unsetBodyClass };
};

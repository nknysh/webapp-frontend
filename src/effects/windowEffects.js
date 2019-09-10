import { useState, useCallback } from 'react';

import { windowExists, addEvent, removeEvent, isMobile, isArray } from 'utils';
import { useEffectBoundary } from './genericEffects';

/**
 * useCurrentWidth
 *
 * Custom hook that returns the current width of the window and
 * whether the window isMobile
 *
 * @returns {object}
 */
export const useCurrentWidth = () => {
  const [currentWidth, setCurrentWidth] = useState(windowExists.innerWidth || 0);
  const updateWidth = useCallback(() => setCurrentWidth(windowExists.innerWidth || 0), []);

  useEffectBoundary(() => {
    addEvent('resize', updateWidth);

    () => {
      removeEvent('resize', updateWidth);
    };
  });

  return { currentWidth, isMobile: isMobile(currentWidth) };
};

/**
 * Scroll to top
 *
 * Wrapper around window exists scrollTo
 */
const scrollToTop = () => {
  if (windowExists.scrollTo) {
    windowExists.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
};

/**
 * useScrollToTop
 *
 * Custom hook to scroll the page to the top
 *
 * @param {Array} changed
 */
export const useScrollToTop = changed => useEffectBoundary(scrollToTop, [changed]);

/**
 * useKeyboard
 *
 * Custom hook for using keyboard commands
 *
 * @param {number} keyCode
 * @param {Function} callback
 */
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

/**
 * Add body class
 *
 * Adds class to document class list
 *
 * @param {string} className
 */
const addBodyClass = className => document && document.body.classList.add(className);

/**
 * Remove body class
 *
 * Removes class from document class list
 *
 * @param {string} className
 */
const removeBodyClass = className => document && document.body.classList.remove(className);

/**
 * useBodyClass
 *
 * Custom hook for adding classes to the body of the document
 *
 * @param {Array} classes
 */
export const useBodyClass = (classes = []) => {
  const [bodyClass, setBodyClass] = useState(classes);

  const unsetBodyClass = useCallback(
    className => setBodyClass(isArray(className) ? className.map(removeBodyClass) : removeBodyClass(className)),
    []
  );

  useEffectBoundary(() => {
    isArray(bodyClass) ? bodyClass.map(addBodyClass) : addBodyClass(bodyClass);
  }, [bodyClass]);

  return { bodyClass, setBodyClass, unsetBodyClass };
};

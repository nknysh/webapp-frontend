import { useEffect, useState } from 'react';

import { windowExists } from 'utils/window';

export const useCurrentWidth = () => {
  const [currentWidth, setCurrentWidth] = useState(windowExists.innerWidth || 0);
  const updateWidth = () => setCurrentWidth(windowExists.innerWidth || 0);

  useEffect(() => {
    if (windowExists.addEventListener) {
      windowExists.addEventListener('resize', updateWidth);
    }

    () => {
      if (windowExists.addEventListener) {
        windowExists.addEventListener('resize', updateWidth);
      }
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

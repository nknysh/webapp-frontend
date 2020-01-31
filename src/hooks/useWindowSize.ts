import { useState, useEffect } from 'react';

export interface IViewportDimensions {
  width: number | undefined;
  height: number | undefined;
}

export const useWindowSize = (): IViewportDimensions => {
  const isClient = typeof window === 'object';
  const [windowSize, setWindowSize] = useState(getSize);

  function getSize(): IViewportDimensions {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }

  useEffect(() => {
    if (!isClient) {
      return undefined;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize, true); // Use capture to detect scroll events on HTMLElements
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize, true);
    };
  }, []);

  return windowSize;
};

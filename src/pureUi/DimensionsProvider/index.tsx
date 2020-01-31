import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useWindowSize, IViewportDimensions } from 'hooks/useWindowSize';

export interface IDimensions {
  width: number;
  height: number;
  top: number;
  left: number;
  bottom: number;
  right: number;
}

export interface IDimensionProviderProps extends Omit<React.ReactNode, 'children'> {
  display: 'inline' | 'block' | 'flex' | 'grid';
  render: (ancestorDimensions?: IDimensions, viewportDimensions?: IViewportDimensions) => React.ReactNode;
}

export const DimensionsProvider = (props: IDimensionProviderProps) => {
  const isClient = typeof window === 'object';
  const [dimensions, setDimensions] = useState<IDimensions | undefined>(undefined);

  // Using `any` because RefObject throws a type error when we call `getBoundingClientRect`
  const wrapper = useRef<any | undefined>(undefined);

  // This hook gives us window.resize updates for free.
  const windowSize = useWindowSize();

  useEffect(() => {
    if (isClient && wrapper.current) {
      setDimensions(wrapper.current.getBoundingClientRect());
    }
  }, [windowSize]);

  return (
    <span ref={wrapper} style={{ display: props.display }}>
      {props.render(dimensions, windowSize)}
    </span>
  );
};

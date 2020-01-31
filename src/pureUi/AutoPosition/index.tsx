import React, { useRef, useCallback, useEffect } from 'react';
import { IDimensions } from 'pureUi/DimensionsProvider/index';
import { IViewportDimensions } from 'hooks/useWindowSize';

export interface IAutoPositionProps {
  ancestorDimensions: IDimensions;
  viewportDimensions: IViewportDimensions;
  anchorVertical?: 'bottom' | 'top';
  anchorHorizontal?: 'left' | 'right';
  children: React.ReactNode;
}

export const AutoPosition = (props: IAutoPositionProps) => {
  const { ancestorDimensions, viewportDimensions } = props;
  const isClient = typeof window === 'object';
  const wrapper = useRef<any | null>(null);

  // The initial width of the mounted wrapper will be the viewport. This
  // code ensures the layout is updated when the dimensions are correct.
  // In some scnearioes, a scroll event is required.
  const [readyToDisplay, setReadyToDisplay] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(window.scrollX, window.scrollY - 1);
      window.scrollTo(window.scrollX, window.scrollY + 1);
      setReadyToDisplay(true);
    });
  }, []);

  const computeHeight = useCallback((): number => {
    const vpHeight = viewportDimensions.height || 0;
    const ancestorBottom = ancestorDimensions.bottom || 0;
    return vpHeight - ancestorBottom - 20;
  }, [ancestorDimensions, viewportDimensions]);

  const computeLeft = useCallback(
    rect => {
      let left = ancestorDimensions.left;

      const newRight = left + rect.width;
      if (viewportDimensions.width && newRight > viewportDimensions.width) {
        left = rect.width - left + ancestorDimensions.width;
      }

      return left;
    },
    [ancestorDimensions, viewportDimensions.width]
  );

  const computePosition = useCallback(() => {
    if (isClient && wrapper.current) {
      const rect = wrapper.current.getBoundingClientRect(); // see the comment about about forced rendering
      const styles = {
        transition: 'opacity 0.25s',
        position: 'fixed',
        maxHeight: computeHeight(),
        top: ancestorDimensions.bottom,
        left: computeLeft(rect),
        minWidth: ancestorDimensions.width,
        visibility: readyToDisplay ? 'visible' : 'hidden',
      };
      return styles;
    }

    return {};
  }, [ancestorDimensions, viewportDimensions, readyToDisplay]);

  return (
    <span ref={wrapper} style={computePosition()}>
      {props.children}
    </span>
  );
};

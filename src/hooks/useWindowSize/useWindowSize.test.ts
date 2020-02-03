import { act } from 'react-dom/test-utils';
import { testHook } from 'utils/testHook';
import { useWindowSize } from './index';

let windowSize;
beforeEach(() => {
  testHook(() => {
    windowSize = useWindowSize();
  });
});

describe('useTextField', () => {
  test('should have width and height', () => {
    expect(windowSize).toEqual({ height: 768, width: 1024 });
  });

  test('should update on resize', () => {
    act(() => {
      // Change the viewport to 500px.
      (global as any).innerWidth = 500;

      // Trigger the window resize event.
      (global as any).dispatchEvent(new Event('resize'));
    });
    expect(windowSize).toEqual({ height: 768, width: 500 });
  });

  test('should update on scroll', () => {
    act(() => {
      (global as any).innerWidth = 400;
      (global as any).dispatchEvent(new Event('scroll'));
    });
    expect(windowSize).toEqual({ height: 768, width: 400 });
  });
});

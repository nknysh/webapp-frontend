import { addEvent, removeEvent, isMobile } from './window';

describe('window', () => {
  describe('addEvent', () => {
    it('attachs event to context object', () => {
      const callback = () => {};
      const context = {
        addEventListener: jest.fn(),
      };

      addEvent('resize', callback, context);

      expect(context.addEventListener).toHaveBeenCalled();
    });
  });
  describe('removeEvent', () => {
    it('attachs event to context object', () => {
      const callback = () => {};
      const context = {
        removeEventListener: jest.fn(),
      };

      removeEvent('resize', callback, context);

      expect(context.removeEventListener).toHaveBeenCalled();
    });
  });
  describe('isMobile', () => {
    it('returns correctly', () => {
      expect(isMobile(100)).toBeTruthy();
      expect(isMobile(2000)).toBeFalsy();
    });
  });
});

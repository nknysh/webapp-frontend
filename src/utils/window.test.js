import { addEvent, removeEvent } from './window';

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
});

import { FormEvent } from 'react';
import { eventValueSelector, eventCheckedSelector, sanitizeDecimal } from './form';

describe('CustomItemForm form', () => {

  describe('eventValueSelector', () => {
    
    it('selects value correctly', () => {
      const handler = jest.fn();
      const event =  {
        currentTarget: {
          value: 'sample value'
        }
      } as FormEvent<HTMLInputElement>;

      eventValueSelector(handler)(event);
      expect(handler).toBeCalledWith(event.currentTarget.value);
    });

    it('applies formatting', () => {
      const handler = jest.fn();
      const event =  {
        currentTarget: {
          value: 'sample value'
        }
      } as FormEvent<HTMLInputElement>;

      const format = val => val.toUpperCase();

      eventValueSelector(handler, format)(event);
      expect(handler).toBeCalledWith(format(event.currentTarget.value));
    });

  });

  describe('eventCheckedSelector', () => {
    
    it('selects value correctly', () => {
      const handler = jest.fn();
      const event =  {
        currentTarget: {
          checked: true
        }
      } as FormEvent<HTMLInputElement>;

      eventCheckedSelector(handler)(event);
      expect(handler).toBeCalledWith(event.currentTarget.checked);
    });

  });

  describe('sanitizeDecimal', () => {
    const sanitize = sanitizeDecimal(2);
    
    it('ensures max precision', () => {
      expect(sanitize('12.4567')).toBe('12.45');
      expect(sanitize('12.4')).toBe('12.4');
    });

    it('ensures leading zero', () => {
      expect(sanitize('.')).toBe('0.');
      expect(sanitize('.12')).toBe('0.12');
      expect(sanitize('-.1')).toBe('-0.1');
    });

    it('removes unwanted characters', () => {
      expect(sanitize('123tj4k5')).toBe('12345');
      expect(sanitize('123-45')).toBe('12345');
    });

    it('removes extra decimal points', () => {
      expect(sanitize('123.4.5')).toBe('123.45');
      expect(sanitize('....1')).toBe('0.1');
    });
    

  });

});


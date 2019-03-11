import { sanitizeValues, getServerError, extractFieldDefaults, getFormPath } from './form';

describe('form utils', () => {
  describe('sanitizeValues', () => {
    it('returns sanitized values', () => {
      expect(sanitizeValues({ foo: '', bar: undefined, boo: 'true', far: 'false' })).toMatchSnapshot();
    });
  });

  describe('getServerError', () => {
    it('returns server error', () => {
      expect(getServerError({ default: 'foo' })).toMatchSnapshot();
      expect(getServerError({ default: 'foo' }, 'bar')).toMatchSnapshot();
      expect(getServerError({ default: 'foo', bar: 'bar content' }, 'bar')).toMatchSnapshot();
    });
  });

  describe('extractFieldDefaults', () => {
    it('returns defaults from object', () => {
      expect(
        extractFieldDefaults({
          foo: {
            default: 'foo',
          },
          bar: {
            default: 'bar',
          },
        })
      ).toMatchSnapshot();
    });
  });

  describe('getFormPath', () => {
    it('returns path from string', () => {
      expect(getFormPath('foo')).toMatchSnapshot();
      expect(getFormPath('foo[bar]')).toMatchSnapshot();
      expect(getFormPath('foo[bar][far]')).toMatchSnapshot();
    });
  });
});

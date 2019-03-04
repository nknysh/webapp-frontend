import React from 'react';

import { IndexSearch } from './IndexSearch';

const defaultProps = {
  indexes: ['hotels'],
};

// eslint-disable-next-line
const MockChildren = ({ results }) => (
  <div className="results">
    {results.map(hits =>
      hits.map(hit => (
        <div key={JSON.stringify(hit)} className="hit">
          {JSON.stringify(hit)}
        </div>
      ))
    )}
  </div>
);

const getComponent = props => shallow(<IndexSearch {...defaultProps} {...props} />);

describe('<IndexSearch />', () => {
  describe('render', () => {
    it('returns nothing with empty indexes', () => {
      expect(getComponent({ indexes: [] })).toMatchSnapshot();
    });
    it('matches snapshot', () => {
      const mockChildFn = jest.fn();
      // Workaround for ramda not seeing jest.fn() as a function
      const children = (...args) => mockChildFn(args);

      expect(getComponent()).toMatchSnapshot();
      expect(getComponent({ isOpen: true })).toMatchSnapshot();
      expect(getComponent({ label: 'with label' })).toMatchSnapshot();
      expect(getComponent({ limit: 1 })).toMatchSnapshot();
      expect(getComponent({ pattern: '+{search}' })).toMatchSnapshot();
      expect(getComponent({ value: 'default value' })).toMatchSnapshot();
      expect(getComponent({ children, isOpen: true })).toMatchSnapshot();
    });
  });

  describe('children', () => {
    it('is called as function when open', () => {
      const mockChildFn = jest.fn();
      // Workaround for ramda not seeing jest.fn() as a function
      const children = (...args) => mockChildFn(args);

      expect(getComponent({ children, isOpen: true })).toMatchSnapshot();

      expect(mockChildFn).toHaveBeenCalled();
    });
    it('is ignored if not open', () => {
      const mockChildFn = jest.fn();
      // Workaround for ramda not seeing jest.fn() as a function
      const children = (...args) => mockChildFn(args);

      getComponent({ children, isOpen: false });

      expect(mockChildFn).not.toHaveBeenCalled();
    });
    it('is ignored if not function', () => {
      // jest.fn() isn't seen as a function by ramda, which
      // makes it perfect for testing isFunction
      const mockChildFn = jest.fn();

      getComponent({ children: mockChildFn, isOpen: true });
      expect(mockChildFn).not.toHaveBeenCalled();
    });
  });
});

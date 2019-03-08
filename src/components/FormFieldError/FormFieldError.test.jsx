import React from 'react';

import { FormFieldError } from './FormFieldError';

const getComponent = props => shallow(<FormFieldError {...props} />);

describe('<FormFieldError />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent({ children: 'An error' })).toMatchSnapshot();
    });
  });
});

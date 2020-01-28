import React from 'react';

import { SummaryForm } from './SummaryForm';

const getComponent = props => shallow(<SummaryForm {...props} />);

describe('<SummaryForm />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});

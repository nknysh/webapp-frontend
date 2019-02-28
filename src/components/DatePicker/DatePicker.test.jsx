import React from 'react';

import { DatePicker } from './DatePicker';

const getComponent = props => shallow(<DatePicker {...props} />);

describe('<DatePicker />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent({ dayPickerProps: { fromMonth: '2019-03-02T18:06:32.784Z' } })).toMatchSnapshot();
    });
  });
});

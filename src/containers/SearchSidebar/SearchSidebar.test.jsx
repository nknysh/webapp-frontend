import React from 'react';

import { SearchSidebar } from './SearchSidebar';

const getComponent = props => shallow(<SearchSidebar {...props} />);

describe('<SearchSidebar />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
    it('matches filtered regions snapshot', () => {
      expect(
        getComponent({
          regions: ['foo', 'bar'],
          searchQuery: {
            filters: {
              regions: {
                type: 'specify',
                selected: ['foo'],
              },
            },
          },
        })
      ).toMatchSnapshot();
    });
  });
});

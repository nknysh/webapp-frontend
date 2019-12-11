import React from 'react';

import { SearchBar } from './SearchBar';

const getComponent = props => shallow(<SearchBar isLoading={false} {...props} />);

describe('<SearchBar />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(
        getComponent({
          searchQuery: {
            name: '',
          },
          basicSearchHandlers: {
            handleDestinationChange: () => null,
            handleSubmit: () => null,
            handleNavigateToSearch: () => null,
            handleToggleLodgingControls: () => null,
            handleSetLogdingControlsVisibility: () => null,
            handleShowNameSearchDropDown: () => null,
            toggleRepeatGuest: () => null,
            handleDateChange: () => null,
          },
        })
      ).toMatchSnapshot();
    });
  });
});

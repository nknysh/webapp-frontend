import React from 'react';
import styled from 'styled-components';
import { compose } from 'redux';
import WithBasicSearch, { IWithBasicSearchProps } from 'hoc/WithBasicSearch';
import PredictiveTextInput from 'pureUi/PredictiveTextInput';
import { LodgingsEditor } from 'pureUi/LodgingsEditor';
import DateRangeInput from 'pureUi/DateRangeInput';
import { PrimaryButton } from 'pureUi/Buttons';
import { pureUiTheme } from 'pureUi/pureUiTheme';
import Checkbox from 'pureUi/Checkbox';

export interface ISearchBarProps extends IWithBasicSearchProps {
  className: string;
}

const SearchBar = (props: ISearchBarProps) => {
  return (
    <div className={props.className}>
      <div className="grid">
        <label>
          <span>Destination or Resort</span>
          <PredictiveTextInput
            placeholder="Where to"
            value={props.searchQuery.name!}
            onChange={props.basicSearchHandlers.handleDestinationChange}
            options={props.nameSearchResults}
            onOptionSelect={props.destinationChange}
            showDropDown={props.showNameSearchResults}
            onFocus={props.basicSearchHandlers.handleShowNameSearchDropDown(true)}
            onBlur={props.basicSearchHandlers.handleShowNameSearchDropDown(false)}
          />
        </label>

        <label>
          <span>Dates * </span>
          <DateRangeInput
            displayString={props.dateRangeDisplayString}
            currentDate={props.currentDate}
            totalNights={props.totalStayNights}
            selectedDates={props.selectedDates}
            onDayClick={props.basicSearchHandlers.handleDayClick}
            onDayMouseOver={props.basicSearchHandlers.handleDateMouseOver}
            showDatePicker={props.showDatePicker}
            onNextClick={props.basicSearchHandlers.handleIncrementCurrentDate(1)}
            onPrevClick={props.basicSearchHandlers.handleIncrementCurrentDate(-1)}
            onClick={props.basicSearchHandlers.handleToggleDatePicker}
            onClickOutside={props.basicSearchHandlers.handleSetDatePickerVisibility(false)}
          />
        </label>

        <label>
          <span>Lodging *</span>
          <LodgingsEditor
            showControls={props.showLodgingControls}
            lodgings={props.searchQuery.lodgings}
            activeLodgingIndex={props.activeLodingIndex}
            onIncrementIndex={props.incrementActiveLodgingIndex}
            onTabSelect={props.setActiveLodgingIndex}
            onIncrementRoomCount={props.incrementRoom}
            onIncrementAdultCount={props.incrementAdult}
            onIncrementChildCount={props.incrementChild}
            onChildAgeChange={props.setAge}
            totalGuestCount={props.totalGuestCount}
            onClick={props.basicSearchHandlers.handleToggleLodgingControls}
            onClickOutside={props.basicSearchHandlers.handleSetLogdingControlsVisibility(false)}
          />
        </label>

        <label className="repeatGuest">
          <span>Repeat Guest</span>
          <Checkbox checked={props.isRepeatGuest} onChange={props.basicSearchHandlers.toggleRepeatGuest} />
        </label>

        <PrimaryButton
          className="searchButton"
          disabled={false}
          onClick={props.basicSearchHandlers.handleNavigateToSearch}
        >
          Search
        </PrimaryButton>
      </div>
    </div>
  );
};

const StyledSearchBar = styled(SearchBar)`
  color: ${pureUiTheme.colorRoles.grayLabel};
  text-align: left;
  background-color: ${pureUiTheme.colors.whiteOpacity1};
  padding: 20px;
  max-width: 1190px;
  margin: auto;

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr) 124px 215px;
    grid-column-gap: 1rem;
    align-items: end;
  }

  label > span {
    text-transform: uppercase;
    font-size: 12px;
    display: block;
    margin-bottom: 10px;
  }

  .searchButton {
    height: 42px;
    margin: 0;
  }

  .repeatGuest {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    align-items: center;

    & > span {
      margin-left: 10px;
    }
  }
`;

export default compose(WithBasicSearch())(StyledSearchBar);

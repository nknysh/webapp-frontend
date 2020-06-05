import React from 'react';
import styled from 'styled-components';
import { compose } from 'redux';
import WithBasicSearch, { IWithBasicSearchProps } from 'hoc/WithBasicSearch';
import  { IWithTravelAgentsDataProps, withTravelAgentsData } from 'hoc/WithTravelAgentsData';
import PredictiveTextInput from 'pureUi/PredictiveTextInput';
import { LodgingsEditor } from 'pureUi/LodgingsEditor';
import DateRangeInput from 'pureUi/DateRangeInput';
import { PrimaryButton } from 'pureUi/Buttons';
import { pureUiTheme } from 'pureUi/pureUiTheme';
import Checkbox from 'pureUi/Checkbox';
import { DatePickerStateProvider, IDatePickerSateParams } from 'pureUi/providers/DatePickerStateProvider';
import SidebarGroup from "../../pureUi/SidebarGroup";

export interface ISearchBarProps extends IWithBasicSearchProps, IWithTravelAgentsDataProps {
  className: string;
}

export const SearchBar = (props: ISearchBarProps) => {
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
          <DatePickerStateProvider
            defaultSelectedDates={props.selectedDates}
            onDateChange={props.basicSearchHandlers.handleDateChange}
            render={(params: IDatePickerSateParams) => (
              <DateRangeInput
                className="serachBarDateRangeInput"
                displayString={params.displayString}
                currentDate={params.datePickerCurrentDate}
                totalNights={params.totalNights}
                selectedDates={params.selectedDates}
                onDayClick={params.handleDayClick}
                onDayMouseOver={params.handleDateMouseOver}
                showDatePicker={params.showDatePicker}
                onNextClick={params.incrementDate}
                onPrevClick={params.decrementDate}
                onMouseDown={params.toggleDatePicker}
                onClickOutside={params.hideDatePicker}
              />
            )}
          />
        </label>

        <label>
          <span>Rooms *</span>
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

        {props.isSr && (
          <label className="repeatGuest">
            <span>Repeat Guest</span>
            <Checkbox checked={props.isRepeatGuest} onChange={props.toggleRepeatGuest}/>
          </label>
        )}

        <PrimaryButton
          className="searchButton"
          disabled={!props.canSearch}
          onClick={props.basicSearchHandlers.handleNavigateToSearch}
        >
          Search
        </PrimaryButton>

        { props.isSr &&
        <label className="basicSearchLabel">
          <span>Company</span>
          {props.isFetchingCompanies ?
            <span>Loading companies...</span>
            :
            <PredictiveTextInput
              placeholder="Select company..."
              value={props.companyNameSearch}
              onChange={e => props.searchCompanyByName(e.currentTarget.value)}
              options={[props.companiesNames]}
              onOptionSelect={props.handleCompanyNameChange}
              showDropDown={props.showCompanyDropdown}
              onFocus={() => props.showCompanyDropdownChange(true)}
              onBlur={() => props.showCompanyDropdownChange(false)}
            />
          }
        </label>
        }
        { props.isSr && props.selectedCompany &&
        <label className="basicSearchLabel">
          <span>Travel Agent</span>
          {
            props.isFetchingTA ?
              <span>Loading travel agents...</span>
              :
              <PredictiveTextInput
                placeholder="Select agent..."
                value={props.taNameSearch}
                onChange={e => props.searchTaByName(e.currentTarget.value)}
                options={[props.taNames]}
                onOptionSelect={props.handleTaNameChange}
                showDropDown={props.showTaDropdown}
                onFocus={() => props.showTaDropdownChange(true)}
                onBlur={() => props.showTaDropdownChange(false)}
              />
          }
        </label>
        }
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
    ${props => {
      return props.isSr
        ? 'grid-template-columns: repeat(3, 1fr) 124px 215px;'
        : 'grid-template-columns: repeat(3, 1fr) 124px;';
    }}
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
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

  .serachBarDateRangeInput {
    width: 100%;
  }
`;

export default compose(WithBasicSearch(), withTravelAgentsData())(StyledSearchBar);

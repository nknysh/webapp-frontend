import React, { FormEvent } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { MultiDateRange } from 'pureUi/forms/MultiDateRange/index';
import { Text } from 'pureUi/typography';
import Label from 'pureUi/Label/index';
import TextInput from 'pureUi/TextInput/index';
import Checkbox from 'pureUi/Checkbox';
import { Fieldset, Legend, LegendExtras } from 'pureUi/forms/Fieldset/index';
import { Throggle } from 'pureUi/forms/Throggle';
import { ErrorList } from 'pureUi/ErrorList';

import { IWithBootstrapDataProps, withBootstapData } from 'hoc/WithBootstrapData';
import { IOfferPrerequisitesPayload } from 'services/BackendApi/types/OfferResponse';
import { AccordianSection, Accordian } from 'pureUi/Accordian/index';
import { CloseButton } from 'pureUi/Buttons/index';
import { FormControlGrid } from 'pureUi/forms/FormControlGrid';
import { DatePickerStateProvider, IDatePickerSateParams } from 'pureUi/providers/DatePickerStateProvider';
import DateRangeInput from 'pureUi/DateRangeInput';

import {
  offerStayBetweenPrerequisitesSelector,
  offerHotelUuidSelector,
  offerBooleanPrerequisitesSelector,
  taCountryAccordianKeysSelector,
  offerTaCountriesLabelPrerequisiteSelector,
  offerTaCountriesPrerequisiteByRegionSelector,
  offerAccommodationProductPrerequisitesSelector,
  offerAccommodationProductPrerequisitesLabelSelector,
  offerMaxLodgingsPrerequisiteSelector,
  offerStayLengthPrerequisiteSelector,
  offerAdvancePrerequisiteSelector,
  offerValidationSelector,
  offerIsPristineSelector,
} from 'store/modules/offer/selectors';

import {
  offerRemoveStayBetweenPrerequisiteAction,
  offerAddStayBetweenPrerequisiteAction,
  offerChangeStayBetweenPrerequisiteAction,
  offerSetBooleanPrerequisiteAction,
  offerSetCountryCodePrerequisiteAction,
  offerToggleTaCountryAccodian,
  offerClearAllCountryCodePrerequisiteAction,
  offerClearAllAccommodationProductPrerequisiteAction,
  offerSetAccommodationProductPrerequisiteAction,
  offerSetMaxLodgingsPrerequisiteAction,
  offerSetStayLengthMaximumPrerequisiteAction,
  offerSetStayLengthMinimumPrerequisiteAction,
  offerSetStayLengthStrictPrerequisiteAction,
  offerSetAdvanceBookByPrerequisiteAction,
  offerSetAdvanceMaximumPrerequisiteAction,
  offerSetAdvanceMinimumPrerequisiteAction,
  offerClearAllAdvancePrerequisiteAction,
} from 'store/modules/offer/actions';

import { OfferEditPreRequisitesStyles } from './OfferEditPreRequisitesStyles';

export class OfferEditPreRequisitesContainer extends React.Component<IOfferEditPreRequisitesProps, {}> {
  isEditMode = () => this.props.match.path.includes('edit');

  // TODO: The date picker state provider was a terrible mistake
  // and I need to get rid of it.
  resetAdvanceDateDatePickerState: any = undefined;

  handleDateChange = (dates: string[][]) => {
    const datesWithoutTime = dates.map(pair => pair.map(date => date.split('T')[0]));
    this.props.offerChangeStayBetweenPrerequisiteAction(datesWithoutTime);
  };

  handleNewDate = () => {
    this.props.offerAddStayBetweenPrerequisiteAction();
  };

  handleRemoveDate = (idx: number) => {
    this.props.offerRemoveStayBetweenPrerequisiteAction(idx);
  };

  toggleTaCountryAccordian = (key: string) => () => {
    this.props.offerToggleTaCountryAccodian(key);
  };

  handleNullableBooleanChange = (key: keyof IOfferPrerequisitesPayload) => (value: boolean | null) => {
    this.props.offerSetBooleanPrerequisiteAction(key, value);
  };

  handleTaCoutryChange = (code: string) => (e: FormEvent<HTMLInputElement>) => {
    this.props.offerSetCountryCodePrerequisiteAction(code, e.currentTarget.checked);
  };

  handleAccomPreReqChange = (uuid: string) => (e: FormEvent<HTMLInputElement>) => {
    this.props.offerSetAccommodationProductPrerequisiteAction(uuid, e.currentTarget.checked);
  };

  handleMaxLodgingsChange = (e: FormEvent<HTMLInputElement>) => {
    this.props.offerSetMaxLodgingsPrerequisiteAction(parseInt(e.currentTarget.value, 10));
  };

  handelStayLengthMinChange = (e: FormEvent<HTMLInputElement>) => {
    this.props.offerSetStayLengthMinimumPrerequisiteAction(e.currentTarget.value);
  };

  handelStayLengthMaxChange = (e: FormEvent<HTMLInputElement>) => {
    this.props.offerSetStayLengthMaximumPrerequisiteAction(e.currentTarget.value);
  };

  handelStayLengthStrictChange = (e: FormEvent<HTMLInputElement>) => {
    this.props.offerSetStayLengthStrictPrerequisiteAction(e.currentTarget.checked);
  };

  handleAdvanceDateChange = (date: string[]) => {
    this.props.offerSetAdvanceBookByPrerequisiteAction(date[0].split('T')[0]);
  };

  handleAdvanceMinChange = (e: FormEvent<HTMLInputElement>) => {
    this.props.offerSetAdvanceMinimumPrerequisiteAction(parseInt(e.currentTarget.value, 10));
  };

  handleAdvanceMaxChange = (e: FormEvent<HTMLInputElement>) => {
    this.props.offerSetAdvanceMaximumPrerequisiteAction(parseInt(e.currentTarget.value, 10));
  };

  handleResetAdvance = () => {
    this.props.offerClearAllAdvancePrerequisiteAction();
    if (this.resetAdvanceDateDatePickerState) {
      this.resetAdvanceDateDatePickerState();
    }
  };

  render() {
    return (
      <OfferEditPreRequisitesStyles>
        <Fieldset>
          <Legend>Stay between (Required)</Legend>
          <MultiDateRange
            className="stayBetweenInputs"
            dateRanges={this.props.stayBetweenDates}
            onDateChange={this.handleDateChange}
            onNewDate={this.handleNewDate}
            onRemoveDate={this.handleRemoveDate}
            enablePastDates
          />
        </Fieldset>

        <ErrorList className="stayBetweenErrors">
          {!this.props.offerIsPristine &&
            this.props.validationErrors.stayBetweenPrerequisite.map((error, i) => <li key={i}>{error.message}</li>)}
        </ErrorList>

        <Fieldset>
          <Legend className="legendWithExtras">
            Accommodation Products
            {this.props.offerHotelUuid && (
              <LegendExtras>
                {this.props.accommodationPreReqsLabel}
                <CloseButton onClick={this.props.offerClearAllAccommodationProductPrerequisiteAction} />
              </LegendExtras>
            )}
          </Legend>
          {!this.props.offerHotelUuid && <Text>Select a hotel to see accommodation products</Text>}
          <FormControlGrid columnCount={3}>
            {this.props.accommodationPreReqs?.map(product => {
              return (
                <Label lowercase key={product.label} inline reverse text={product.label}>
                  <Checkbox checked={product.value} onChange={this.handleAccomPreReqChange(product.uuid)} />
                </Label>
              );
            })}
          </FormControlGrid>

          <Text className="accommodationInfo">
            If no accommodation types are specified, this offer will be avaiable to bookings for any accommodation type.
          </Text>

          <Text className="accommodationInfo">
            If accommodation types are not relevant to this offer, leave this section empty.
          </Text>
        </Fieldset>
        <ErrorList className="stayBetweenErrors">
          {!this.props.offerIsPristine &&
            this.props.validationErrors.accommodationProductsPrerequisite.map((error, i) => (
              <li key={i}>{error.message}</li>
            ))}
        </ErrorList>

        <Fieldset>
          <Legend className="legendWithExtras">
            Travel Agent Countries
            <LegendExtras>
              {this.props.taCountriesLabel}
              <CloseButton onClick={this.props.offerClearAllCountryCodePrerequisiteAction} />
            </LegendExtras>
          </Legend>

          <Accordian>
            {Object.keys(this.props.taCountries).map(region => (
              <AccordianSection
                title={region}
                key={region}
                suffix={this.props.taCountries[region].total}
                isOpen={this.props.taCountryAccordianKeys.includes(region)}
                onClick={this.toggleTaCountryAccordian(region)}
              >
                <FormControlGrid padded columnCount={4}>
                  {this.props.taCountries[region].countries.map(country => {
                    return (
                      <Label lowercase key={country.label} inline reverse text={country.label}>
                        <Checkbox checked={country.value} onChange={this.handleTaCoutryChange(country.code)} />
                      </Label>
                    );
                  })}
                </FormControlGrid>
              </AccordianSection>
            ))}
          </Accordian>
        </Fieldset>

        <Fieldset className="stayLengthFieldset">
          <Legend>Stay Length</Legend>
          <div className="stayLength">
            <Label lowercase text="Minimum" className="stayLengthMin">
              <TextInput value={this.props.stayLength.minimum || ''} onChange={this.handelStayLengthMinChange} />
            </Label>

            <Text className="stayLengthMinInfo">
              Minimum number of nights stay for this offer to apply. Leave blank if there is no restriction here.
            </Text>

            <Label lowercase text="Maximum" className="stayLengthMax">
              <TextInput value={this.props.stayLength.maximum || ''} onChange={this.handelStayLengthMaxChange} />
            </Label>

            <Text className="stayLengthMaxInfo">
              Maximum nights of stay for this offer to apply. Leave blank if there is no restriction here.
            </Text>

            <Label lowercase inline reverse text="Strict" className="stayLengthStrict">
              <Checkbox checked={this.props.stayLength.strictMinMaxStay} onChange={this.handelStayLengthStrictChange} />
            </Label>
            {this.props.stayLength.strictMinMaxStay ? (
              <Text className="stayLengthInfo">Nights in the room during offer dates must pass min/max.</Text>
            ) : (
              <Text className="stayLengthInfo">Nights in the room must pass min/max</Text>
            )}
          </div>
        </Fieldset>
        <ErrorList className="stayBetweenErrors">
          {!this.props.offerIsPristine &&
            this.props.validationErrors.stayLengthPrerequisite.map((error, i) => <li key={i}>{error.message}</li>)}
        </ErrorList>

        <Fieldset>
          <Legend>
            Advance (Optional)
            <LegendExtras>
              <CloseButton onClick={this.handleResetAdvance} />
            </LegendExtras>
          </Legend>
          <div className="advanceGrid">
            <Label lowercase text="Book By">
              <DatePickerStateProvider
                isSingleDateSelection
                defaultSelectedDates={[this.props.advance.bookBy!]}
                onDateChange={this.handleAdvanceDateChange}
                render={(params: IDatePickerSateParams) => {
                  this.resetAdvanceDateDatePickerState = params.resetDatePickerState;
                  return (
                    <DateRangeInput
                      displayString={params.displayString}
                      currentDate={params.datePickerCurrentDate}
                      selectedDates={[this.props.advance.bookBy!]}
                      onDayClick={params.handleDayClick}
                      onDayMouseOver={params.handleDateMouseOver}
                      showDatePicker={params.showDatePicker}
                      onNextClick={params.incrementDate}
                      onPrevClick={params.decrementDate}
                      onMouseDown={params.toggleDatePicker}
                      onClickOutside={params.hideDatePicker}
                      placeholder="Select Book By Date"
                      enablePastDates
                    />
                  );
                }}
              />
            </Label>
            <Label text="Minimum">
              <TextInput value={this.props.advance?.minimum || ''} onChange={this.handleAdvanceMinChange} />
            </Label>

            <Label text="Maximum">
              <TextInput value={this.props.advance?.maximum || ''} onChange={this.handleAdvanceMaxChange} />
            </Label>
          </div>
        </Fieldset>

        <Fieldset className="maxLodgingsFieldset">
          <div>
            <Label text="Maximum Lodgings (Optional)">
              <TextInput value={this.props.maxLodgings} onChange={this.handleMaxLodgingsChange} />
            </Label>
            <Text>
              Set a number here if there is a maximum number of villas/rooms in a booking for this offer to be
              considered
            </Text>
          </div>
        </Fieldset>

        <Fieldset>
          <Legend>Booking Type</Legend>
          <div className="nullableBooleans">
            {Object.keys(this.props.nullableBooleans).map(key => {
              return (
                <Throggle
                  label={key.replace(/([A-Z])/g, ' $1')}
                  name={key}
                  key={key}
                  trueLabel="Include"
                  falseLabel="Exclude"
                  value={this.props.nullableBooleans[key]}
                  onChange={this.handleNullableBooleanChange(key as keyof IOfferPrerequisitesPayload)}
                />
              );
            })}
          </div>
        </Fieldset>
      </OfferEditPreRequisitesStyles>
    );
  }
}

// -----------------------------------------------------------------------------
// Prop Typings
// -----------------------------------------------------------------------------
export type StateToProps = ReturnType<typeof mapStateToProps>;
export type DispatchToProps = typeof actionCreators;

export interface IRouteParams {
  offerId: string;
}

export interface IOfferEditPreRequisitesProps
  extends StateToProps,
    DispatchToProps,
    IWithBootstrapDataProps,
    RouteComponentProps<IRouteParams> {
  className?: string;
}

const mapStateToProps = createStructuredSelector({
  stayBetweenDates: offerStayBetweenPrerequisitesSelector,
  offerHotelUuid: offerHotelUuidSelector,
  nullableBooleans: offerBooleanPrerequisitesSelector,
  taCountries: offerTaCountriesPrerequisiteByRegionSelector,
  taCountryAccordianKeys: taCountryAccordianKeysSelector,
  taCountriesLabel: offerTaCountriesLabelPrerequisiteSelector,
  accommodationPreReqs: offerAccommodationProductPrerequisitesSelector,
  accommodationPreReqsLabel: offerAccommodationProductPrerequisitesLabelSelector,
  maxLodgings: offerMaxLodgingsPrerequisiteSelector,
  stayLength: offerStayLengthPrerequisiteSelector,
  advance: offerAdvancePrerequisiteSelector,
  validationErrors: offerValidationSelector,
  offerIsPristine: offerIsPristineSelector,
});

const actionCreators = {
  offerAddStayBetweenPrerequisiteAction,
  offerChangeStayBetweenPrerequisiteAction,
  offerRemoveStayBetweenPrerequisiteAction,
  offerSetBooleanPrerequisiteAction,
  offerSetCountryCodePrerequisiteAction,
  offerToggleTaCountryAccodian,
  offerClearAllCountryCodePrerequisiteAction,
  offerClearAllAccommodationProductPrerequisiteAction,
  offerSetAccommodationProductPrerequisiteAction,
  offerSetMaxLodgingsPrerequisiteAction,
  offerSetStayLengthMaximumPrerequisiteAction,
  offerSetStayLengthMinimumPrerequisiteAction,
  offerSetStayLengthStrictPrerequisiteAction,
  offerSetAdvanceBookByPrerequisiteAction,
  offerSetAdvanceMaximumPrerequisiteAction,
  offerSetAdvanceMinimumPrerequisiteAction,
  offerClearAllAdvancePrerequisiteAction,
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

// -----------------------------------------------------------------------------
// Connected
// -----------------------------------------------------------------------------
const withConnect = connect<StateToProps, DispatchToProps, IOfferEditPreRequisitesProps>(
  mapStateToProps,
  mapDispatchToProps
);

export const OfferEditPreRequisitesContainerConnected = compose(
  withConnect,
  withRouter,
  withBootstapData()
)(OfferEditPreRequisitesContainer);

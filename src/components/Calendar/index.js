// Libraries
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import React from 'react';
import { DateRangePicker, START_DATE } from 'react-dates';

// Styles
import './Calendar.css';

class Calendar extends React.Component {
  state = {
    focusedInput: START_DATE,
    startDate: this.props.input && this.props.input.value.startDate,
    endDate: this.props.input && this.props.input.value.endDate,
  };

  handleDateChange = ({ startDate, endDate }) => {
    // TODO(mark): It would be ideal to make this a controlled component.
    // Using the input prop, we can update the redux-form with the correct values.
    const { input } = this.props;

    this.setState({ startDate, endDate });
    input && input.onChange({ startDate, endDate });
  }

  render() {
    const { focusedInput, startDate, endDate } = this.state;

    return (
      <DateRangePicker
        hideKeyboardShortcutsPanel
        startDatePlaceholderText="CHECK IN"
        endDatePlaceholderText="CHECK OUT"
        startDateId="start-date"
        endDateId="end-date"
        startDate={startDate}
        endDate={endDate}
        onDatesChange={this.handleDateChange}
        focusedInput={focusedInput}
        onFocusChange={focusedInput => this.setState({ focusedInput })}
      />
    );
  }
}

export default Calendar;

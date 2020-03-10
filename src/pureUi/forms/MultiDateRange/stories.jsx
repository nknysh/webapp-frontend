import React, { Fragment } from 'react';
import { MultiDateRange } from './';

export default { title: 'MultiDateRange' };

export class MultiDateRangeStory extends React.Component {
  state = {
    dates: [],
  };
  handleMultiDateChange = () => {};

  handleNewDate = () => {
    this.setState({ dates: [...this.state.dates, null] });
  };

  render() {
    return (
      <Fragment>
        <MultiDateRange
          dateRanges={this.state.dates}
          onChange={this.handleMultiDateChange}
          onNewDate={this.handleNewDate}
        />
      </Fragment>
    );
  }
}

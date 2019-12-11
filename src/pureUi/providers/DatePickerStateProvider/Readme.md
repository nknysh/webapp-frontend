# DatePickerStateProvider

## Motivaiton

We have a stateless `<DateRangeInput />` component, which mounts a stateless `<DatePicker />` component. However, to get any use
out of the these components requires a fair amount of wiring up to handle user events, processing selected dates etc.

To make it easier to consume the `<DateRangeInput />` component, the `<DatePickerStateProvider />` aims to help with as much
of the heavy lifiting as possible.

### Why not just make the DateRangeInput stateful?

The first (and most subjective) reason is to ensure the DateRangeInput is as versatile as possible. The second (and most objective) reason
is to make it testable. For example, the date picker does not allow for selecting dates in the past, so if the only way to test the state
was via simulated events, we'll have a hard time writing tests that don't eventually expire. Also, with this separation of concerns, you
don't need to find elements in the DOM and simulate events on the to test behaviours.

## Usage

DatePickerStateProvider is a [render prop](https://reactjs.org/docs/render-props.html) component that takes props, and passes it's state to
the render prop function. The most common use case is in conjunction with the DateRangeInput component.

```
<DatePickerStateProvider
  defaultSelectedDates={selectedDates}
  onDateChange={handleDateChange}
  render={(params: IDatePickerSateParams) => (
    <DateRangeInput
      displayString={params.displayString}
      currentDate={params.datePickerCurrentDate}
      totalNights={params.totalNights}
      selectedDates={params.selectedDates}
      onDayClick={params.handleDayClick}
      onDayMouseOver={params.handleDateMouseOver}
      showDatePicker={params.showDatePicker}
      onNextClick={params.incrementDate}
      onPrevClick={params.decrementDate}
      onClick={params.toggleDatePicker}
      onClickOutside={params.hideDatePicker}
    />
  )}
/>
```

### Props

`defaultSelectedDates: string[]`  
An array of contiguous dateTime strings

`onDateChange: (dates: string[]) => void`  
A function that will be called whenever a date selection ends. It will be called with all selected dates.

`render: (params: IDatePickerSateParams) => any`  
A renderprop function that allows you to wite up the state and event handlers to any component you want.

### IDatePickerSateParams

```
interface IDatePickerSateParams {
  // Properties inherrited from IDatePickerState
  showDatePicker: boolean;
  datePickerCurrentDate: string;
  dateSelectionInProgress: boolean;
  anchorDate?: string | undefined;
  startDate: string;
  endDate: string;
  selectedDates: string[];
  totalNights: number;
  displayString: string;

  // Own properties
  handleDayClick: (date: string) => void;
  handleDateMouseOver: (date: string) => void;
  toggleDatePicker: () => void;
  hideDatePicker: () => void;
  incrementDate: (step: number) => void;
  decrementDate: (step: number) => void;
}
```

## Notes

This is not a conncected component. It has a reducer and actions, but uses reacts `useReducer` hook.
This is because `useState` is difficult to test when you have multiple state values to update.
`useReducer` allows us to update multiple state values in one go, which makes testing feasible again.

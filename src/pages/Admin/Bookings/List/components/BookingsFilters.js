// Libraries
import React from 'react';
import { connect } from 'react-redux';

// App
import { exportBookings } from 'actions/bookings';
import { colors } from 'styles';

// Components
import { SelectInput, Styled } from 'components';

const Container = Styled.View.extend`
  flex-direction: row;
  margin-vertical: 40px;
`;

const Field = Styled.View.extend`
  margin-right: 10px;
`;

const Search = Styled.TextInput.extend`
  width: 400px;
  border-radius: 25px;
  padding-left: 20px;
  background-color: none;
  border: 1px solid ${colors.gray14};
  color: ${colors.black3};
  outline: none;
`;

const Input = Styled.TextInput.extend`
  border-radius: 25px;
  padding-left: 20px;
  background-color: none;
  border: 1px solid ${colors.gray14};
  color: ${colors.black3};
  outline: none;
`;

const ExportButton = Styled.Button.extend`
  width: 200px;
`;

const ExportText = Styled.H7.extend`
  color: ${colors.white16};
`;

const BookingsFilters = ({
  query,
  country,
  status,
  handleSubmit,
  onChange,
  onSubmit,
  setFieldValue,
  exportBookings,
}) => (
  <Container>
    <Field>
      <Search
        name="query"
        placeholder="Filter by client or hotel name..."
        value={query}
        onChange={onChange}
        onSubmitEditing={onSubmit}
      />
    </Field>
    <Field>
      <SelectInput
        name="country"
        placeholder="All locations"
        value={country}
        options={[{ value: 'maldives', label: 'MALDIVES' }, { value: 'seychelles', label: 'SEYCHELLES' }]}
        onChange={setFieldValue}
        onBlur={(name, value, event) => handleSubmit(event)}
        Input={Input}
      />
    </Field>
    <Field>
      <SelectInput
        name="status"
        placeholder="All statuses"
        value={status}
        options={[{ value: 'status-1', label: 'STATUS 1' }, { value: 'status-2', label: 'STATUS 2' }]}
        onChange={setFieldValue}
        onBlur={(name, value, event) => handleSubmit(event)}
        Input={Input}
      />
    </Field>
    <ExportButton
      onPress={() =>
        exportBookings({ fileType: 'csv', filter: {} }).then(csv => {
          const filename = 'bookings.csv';
          const text = `data:text/csv;charset=utf-8,${csv}`;
          const link = document.createElement('a');

          link.setAttribute('href', encodeURI(text));
          link.setAttribute('download', filename);
          link.click();
        })
      }
    >
      <ExportText>EXPORT LIST</ExportText>
    </ExportButton>
  </Container>
);

export default connect(
  undefined,
  { exportBookings }
)(BookingsFilters);

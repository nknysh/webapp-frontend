// Libraries
import React from 'react';
import { connect } from 'react-redux';

// App
import { exportBookings } from 'actions/bookings';
import { colors } from 'styles';

// Components
import { Styled } from 'components';

const Container = Styled.View.extend`
  flex-direction: row;
  margin: 40px auto;
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

const ClearButton = Styled.Button.extend`
  width: 100px;
  margin-right: 10px;
`;

const ClearText = Styled.H7.extend`
  color: ${colors.white16};
`;

const BookingsFilters = ({ query, onChange, onSubmit, exportBookings, resetForm }) => (
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
    <ClearButton
      onPress={() => {
        resetForm();
        onSubmit();
      }}
    >
      <ClearText>CLEAR</ClearText>
    </ClearButton>
  </Container>
);

export default connect(
  undefined,
  { exportBookings }
)(BookingsFilters);

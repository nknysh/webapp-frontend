// Libraries
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

// App
import { updateBooking } from 'actions/bookings';
import { fetchUsers } from 'actions/users';
import { getUsers } from 'selectors/users';

// Components
import { Form, Request, SelectInput, Styled } from 'components';

const Container = Styled.View.extend`
  margin-top: 10px;
`;

const Field = Styled.View.extend`
`;

const Input = Styled.TextInput.H8.extend`
  width: 100%;
`;

const BookingChangeTravelAgent = ({ booking, fetchUsers, updateBooking }) => (
  <Container>
    <Request getState={state => ({ users: getUsers(state) })} onRequest={() => fetchUsers()}>
      {({ users }) => (
        <Form
          initialValues={{
            travelAgentId: _.thru(_.find(users, user => user.id === booking.travelAgentId), user => {
              return user ? `${user.firstName} ${user.lastName}` : null;
            }),
          }}
          onSubmit={values => {
            // TODO
            console.log('change travel agent', values);
            updateBooking({ id: booking.id, travelAgentId: values.travelAgentId });
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit, setFieldValue, setFieldTouched }) => (
            <Field>
              <SelectInput
                name="travelAgentId"
                placeholder="TRAVEL AGENT"
                value={values.travelAgentId}
                options={users.map(user => ({
                  value: user.id,
                  label: `${user.firstName} ${user.lastName}`,
                }))}
                onChange={setFieldValue}
                onBlur={(name, value, event) => handleSubmit(event)}
                Input={Input}
              />
            </Field>
          )}
        </Form>
      )}
    </Request>
  </Container>
);

export default connect(
  undefined,
  { fetchUsers, updateBooking }
)(BookingChangeTravelAgent);

// Libraries
import React from 'react';
import { connect } from 'react-redux';

// App
import { updateBooking } from 'actions/bookings';

// Components
import { Form, SelectInput, Styled } from 'components';

const Container = Styled.View.extend`
  margin-top: 10px;
  z-index: 200;
`;

const Field = Styled.View.extend`
`;

const Input = Styled.TextInput.H8.extend`
  width: 100%;
`;

const BookingChangeStatus = ({ booking, updateBooking }) => (
  <Container>
    <Form
      initialValues={{
        status: booking.status,
      }}
      onSubmit={(values) => {
        // TODO
        console.log('change status', values);
        updateBooking({ id: booking.id, status: values.status });
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, setFieldValue, setFieldTouched }) => (
        <Field>
          <SelectInput
            name="status"
            placeholder="STATUS"
            value={values.status}
            options={[
              { value: 'booked', label: 'BOOKED' },
              { value: 'paid', label: 'PAID' },
            ]}
            onChange={setFieldValue}
            onBlur={(name, value, event) => handleSubmit(event)}
            Input={Input}
          />
        </Field>
      )}
    </Form>
  </Container>
);

export default connect(undefined, { updateBooking })(BookingChangeStatus);

// Libraries
import React from 'react';

// App
import { colors } from 'styles';

// Components
import { Label, Styled } from 'components';
import FormSection from './FormSection';
import InvoiceUpload from 'components/FileUpload';

const Container = Styled.View.extend`
`;

const Content = Styled.View.extend`
`;

const Row = Styled.View.extend`
  flex-direction: row;
`;

const Field = Styled.View.extend`
`;

const Input = Styled.TextInput.H8.extend`
`;

const Text = Styled.H7.extend`
  color: ${colors.gold10};
`;

// TODO(mark): Replace with actual data from the server.
const VOUCHER = {
  name: 'voucher.pdf',
  url: 'http://google.com',
};

const ITINERARY = {
  name: 'itinerary.pdf',
  url: 'http://google.com',
};

const GuestDetailsForm = ({ booking, values, handleChange, handleBlur }) => (
  <Container>
    <Content>
      <FormSection title="GUEST INFORMATION">
        <Row>
          <Field style={{ flex: 1, marginRight: 10 }}>
            <Label htmlFor="guestFirstName">FIRST NAME (LEAD GUEST)</Label>
            <Input name="guestFirstName" value={values.guestFirstName} onChange={handleChange} onBlur={handleBlur} />
          </Field>
          <Field style={{ flex: 1, marginLeft: 10 }}>
            <Label htmlFor="guestLastName">LAST NAME (LEAD GUEST)</Label>
            <Input name="guestLastName" value={values.guestLastName} onChange={handleChange} onBlur={handleBlur} />
          </Field>
        </Row>
      </FormSection>
      <FormSection title="CHILD BIRTH DATE">
        <Row>
          <Field>
            <Label htmlFor="childBirthDate">INFANT (0-2)</Label>
            <Input name="childBirthDate" value={values.childBirthDate} onChange={handleChange} onBlur={handleBlur} />
          </Field>
        </Row>
      </FormSection>
      <FormSection title="FLIGHT INFORMATION (OPTIONAL)">
        <Row>
          <Field style={{ flex: 1, marginRight: 10 }}>
            <Label htmlFor="flightArrivalDate">ARRIVAL TIME (MARCH 8, 2018)</Label>
            <Input
              name="flightArrivalDate"
              value={values.flightArrivalDate}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Field>
          <Field style={{ flex: 1, marginLeft: 10 }}>
            <Label htmlFor="flightArrivalNumber">ARRIVAL FLIGHT</Label>
            <Input
              name="flightArrivalNumber"
              value={values.flightArrivalNumber}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Field>
        </Row>
        <Row>
          <Field style={{ flex: 1, marginRight: 10 }}>
            <Label htmlFor="flightDepartureDate">DEPARTURE TIME (MARCH 15, 2018)</Label>
            <Input
              name="flightDepartureDate"
              value={values.flightDepartureDate}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Field>
          <Field style={{ flex: 1, marginLeft: 10 }}>
            <Label htmlFor="flightDepartureNumber">DEPARTURE FLIGHT</Label>
            <Input
              name="flightDepartureNumber"
              value={values.flightDepartureNumber}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Field>
        </Row>
      </FormSection>
      <FormSection title="VOUCHERS">
        {[VOUCHER].map((voucher, index) => (
          <a key={index} target="_blank" href={voucher.url}>
            <Text>{voucher.name}</Text>
          </a>
        ))}
      </FormSection>
      <FormSection title="ITINERARIES">
        {[ITINERARY].map((itinerary, index) => (
          <a key={index} target="_blank" href={itinerary.url}>
            <Text>{itinerary.name}</Text>
          </a>
        ))}
      </FormSection>
      <FormSection title="SPECIAL REQUESTS">
        <Row>
          <Field style={{ flex: 1 }}>
            <Label htmlFor="comments">COMMENTS</Label>
            <Input name="comments" value={values.comments} onChange={handleChange} onBlur={handleBlur} />
          </Field>
        </Row>
        <Row>
          <Field style={{ flex: 1 }}>
            <InvoiceUpload id={booking.id} />
          </Field>
        </Row>
      </FormSection>
    </Content>
  </Container>
);

export default GuestDetailsForm;

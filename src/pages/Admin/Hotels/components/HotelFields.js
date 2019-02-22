// Libraries
import React from 'react';

// Components
import { CheckboxInput, Label, SelectInput, Styled } from 'components';
import { SectionHeader } from 'pages/Admin/components';

const Container = Styled.View.extend`
`;

const Row = Styled.View.extend`
  flex-direction: row;
`;

const Field = Styled.View.extend`
  flex: 1;
  margin-top: 20px;
`;

const Input = Styled.TextInput.H8.extend`
  margin-top: 5px;
`;

const Section = Styled.View.extend`
  padding-top: 75px;
  padding-bottom: 40px;
`;

const HotelFields = ({ values, onChange, onBlur, setFieldValue, setFieldTouched }) => (
  <Container>
    <Row>
      <Field style={{ marginTop: 0 }}>
        <Label htmlFor="name">HOTEL NAME</Label>
        <Input name="name" placeholder="TYPE HERE" value={values.name} onChange={onChange} onBlur={onBlur} />
      </Field>
    </Row>
    <Row style={{ zIndex: 100 }}>
      <Field style={{ marginRight: 10 }}>
        <Label htmlFor="name">STREET ADDRESS</Label>
        <Input name="address" placeholder="TYPE HERE" value={values.address} onChange={onChange} onBlur={onBlur} />
      </Field>
      <Field style={{ marginLeft: 10 }}>
        <Label htmlFor="name">COUNTRY</Label>
        <SelectInput
          name="country"
          placeholder="SELECT COUNTRY"
          value={values.country}
          options={[{ value: 'maldives', label: 'MALDIVES' }, { value: 'seychelles', label: 'SEYCHELLES' }]}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          style={{ width: '100%' }}
          Input={Input}
        />
      </Field>
    </Row>
    <Row>
      <Field>
        <Label htmlFor="overview">DESCRIPTION</Label>
        <Input
          multiline
          name="overview"
          placeholder="TYPE HERE"
          value={values.overview}
          onChange={onChange}
          onBlur={onBlur}
          style={{ height: 200 }}
        />
      </Field>
    </Row>
    <Row>
      <Field>
        <CheckboxInput
          name="availableForOnlineBooking"
          placeholder="NOT AVAILABLE FOR ONLINE BOOKING"
          value={!values.availableForOnlineBooking}
          onChange={onChange}
          onBlur={onBlur}
        />
      </Field>
    </Row>
    <Row>
      <Field>
        <CheckboxInput
          name="preferred"
          placeholder="PREFERRED"
          value={values.preferred}
          onChange={onChange}
          onBlur={onBlur}
        />
      </Field>
    </Row>
    <Section>
      <SectionHeader title="PHOTOS" action="ADD NEW PHOTO" onPress={() => console.log('Add Photo')} />
    </Section>
    <Section>
      <SectionHeader title="STARS" />
    </Section>
    <Section>
      <SectionHeader title="AMENITIES" />
    </Section>
    <Section>
      <SectionHeader title="HIGHLIGHTS" />
    </Section>
    <Section>
      <SectionHeader title="BROCHURES" />
    </Section>
    <Section>
      <SectionHeader title="THINGS TO BE AWARE WITH THIS HOTEL" />
    </Section>
    <Section>
      <SectionHeader title="GENERAL POLICIES & RESTRICTIONS" />
    </Section>
  </Container>
);

export default HotelFields;

// Libraries
import React from 'react';

// Components
import { Dropdown, Label, NumberInput, SelectInput, Styled } from 'components';

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

const Options = Styled.View.extend`
`;

const RoomFields = ({ values, onChange, onBlur, setFieldValue, setFieldTouched }) => (
  <Container>
    <Row>
      <Field style={{ marginTop: 0 }}>
        <Label htmlFor="name">ROOM NAME</Label>
        <Input
          name="name"
          placeholder="TYPE HERE"
          value={values.name}
          onChange={onChange}
          onBlur={onBlur}
        />
      </Field>
    </Row>
    <Row style={{ zIndex: 101 }}>
      <Field>
        <Label htmlFor="minOccupancy">MINIMUM OCCUPANCY</Label>
        <Dropdown placeholder="SELECT OCCUPANCY">
          <Options>
            <NumberInput
              name="minAdults"
              placeholder="MINIMUM ADULTS"
              value={values.minAdults}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
            />
            <NumberInput
              name="minChildren"
              placeholder="MINIMUM CHILDREN (2-12)"
              value={values.minChildren}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
            />
          </Options>
        </Dropdown>
      </Field>
    </Row>
    <Row style={{ zIndex: 100 }}>
      <Field>
        <Label htmlFor="maxOccupancy">MAXIMUM OCCUPANCY</Label>
        <Dropdown placeholder="SELECT OCCUPANCY">
          <Options>
            <NumberInput
              name="maxAdults"
              placeholder="MAXIMUM ADULTS"
              value={values.maxAdults}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
            />
            <NumberInput
              name="maxChildren"
              placeholder="MAXIMUM CHILDREN (2-12)"
              value={values.maxChildren}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
            />
          </Options>
        </Dropdown>
      </Field>
    </Row>
    <Row>
      <Field style={{ marginRight: 10 }}>
        <Label htmlFor="extraAdultPerNight">EXTRA ADULT PER NIGHT</Label>
        <Input
          name="extraAdultPerNight"
          placeholder="TYPE HERE"
          value={`${values.extraAdultPerNight}`}
          onChange={onChange}
          onBlur={onBlur}
        />
      </Field>
      <Field style={{ marginLeft: 10 }}>
        <Label htmlFor="extraChildPerNight">EXTRA CHILD PER NIGHT</Label>
        <Input
          name="extraChildPerNight"
          placeholder="TYPE HERE"
          value={`${values.extraChildPerNight}`}
          onChange={onChange}
          onBlur={onBlur}
        />
      </Field>
    </Row>
    <Row>
      <Field style={{ marginRight: 10 }}>
        <Label htmlFor="count">NUMBER OF ROOMS</Label>
        <Input
          name="count"
          placeholder="TYPE HERE"
          value={`${values.count}`}
          onChange={onChange}
          onBlur={onBlur}
        />
      </Field>
      <Field style={{ marginLeft: 10 }}>
        <Label htmlFor="size">SIZE OF ROOM</Label>
        <Input
          name="size"
          placeholder="TYPE HERE"
          value={`${values.size}`}
          onChange={onChange}
          onBlur={onBlur}
        />
      </Field>
    </Row>
    <Row style={{ zIndex: 100 }}>
      <Field>
        <Label htmlFor="bedType">BED TYPE</Label>
        <SelectInput
          name="bedType"
          placeholder="SELECT BED TYPE"
          value={values.bedType}
          options={[
            { value: 'single', label: 'SINGLE' },
            { value: 'full', label: 'FULL' },
            { value: 'queen', label: 'QUEEN' },
            { value: 'king', label: 'KING' },
          ]}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          style={{ width: '100%' }}
          Input={Input}
        />
      </Field>
    </Row>
    <Row>
      <Field>
        <Label htmlFor="bedDescription">BED DESCRIPTION</Label>
        <Input
          name="bedDescription"
          placeholder="TYPE HERE"
          value={values.bedDescription}
          onChange={onChange}
          onBlur={onBlur}
        />
      </Field>
    </Row>
  </Container>
);

export default RoomFields;

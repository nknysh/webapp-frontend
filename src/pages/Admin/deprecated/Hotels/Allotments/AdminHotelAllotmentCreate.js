// Libraries
import React from 'react';
import {
  Create,
  NumberInput,
  SaveButton,
  SimpleForm,
  Toolbar,
  DateInput,
  SelectInput,
  ReferenceInput,
  required
} from 'react-admin'; // eslint-disable-line import/no-unresolved

const CreateToolbar = props => (
  <Toolbar {...props}>
    <SaveButton
      submitOnEnter
      label="CREATE"
      redirect="show"
    />
  </Toolbar>
);

const AdminHotelAllotmentCreate = props => (
  <Create {...props}>
    <SimpleForm
      toolbar={<CreateToolbar />}
      defaultValue={{
      }}
    >
      <ReferenceInput label='Hotel' source='hotelId' reference="hotels">
        <SelectInput optionText='name' />
      </ReferenceInput>
      <SelectInput source="name"
        choices={[
          { id: 'peak_season', name: 'Peak Season'},
          { id: 'winter_season', name: 'Winter Season'},
          { id: 'honeymoon', name: 'Honeymoon Season'}
        ]}
        validate={required()}
      />
      <SelectInput source="roomType"
        choices={[
          { id: 'sup-king', name: 'Superior King'},
          { id: 'queen', name: 'Queen'},
          { id: 'honeymoon', name: 'Honeymoon'}
        ]}
        validate={required()}
      />
      <DateInput source='startDate' validate={required()}/>
      <DateInput source='endDate' />
      <DateInput source='cutOffDate' validate={required()}/>
      <NumberInput source='quantity'validate={required()} />
    </SimpleForm>
  </Create>
);

export default AdminHotelAllotmentCreate;

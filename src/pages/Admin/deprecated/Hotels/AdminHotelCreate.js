// Libraries
import React from 'react';
import {
  Create,
  NumberInput,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
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

const AdminHotelCreate = props => (
  <Create {...props}>
    <SimpleForm
      toolbar={<CreateToolbar />}
      defaultValue={{
        mealPlan: 'BB',
      }}
    >
      <TextInput source="name" />
      <TextInput source="country" />
      <TextInput source="defaultCurrency" />
      <TextInput source="location" />
      <TextInput source="map" />
      <TextInput source="mealPlan" />
      <TextInput source="propertyType" />
      <NumberInput source="starRating" />
    </SimpleForm>
  </Create>
);

export default AdminHotelCreate;

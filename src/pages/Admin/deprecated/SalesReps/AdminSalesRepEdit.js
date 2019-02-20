// Libraries
import React from 'react';
import {
  Edit,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
  required,
  SelectInput
} from 'react-admin'; // eslint-disable-line import/no-unresolved

const EditToolbar = props => (
  <Toolbar {...props}>
    <SaveButton
      submitOnEnter
      label="UPDATE"
      redirect="show"
    />
  </Toolbar>
);

const AdminSalesRepEdit = props => (
  <Edit {...props}>
    <SimpleForm
      toolbar={<EditToolbar />}
    >
      <SelectInput source="title" choices={[
        { id: 'Mr.', name: 'Mr.'},
        { id: 'Ms.', name: 'Ms.'}
      ]}/>
      <TextInput source="firstName" validate={required()} />
      <TextInput source="lastName" validate={required()}/>
      <TextInput source="email" validate={required()} />
      <TextInput source="phoneNumber" validate={required()} />
      <TextInput source="country" />
      <TextInput source="address" validate={required()} />
    </SimpleForm>
  </Edit>
);

export default AdminSalesRepEdit;

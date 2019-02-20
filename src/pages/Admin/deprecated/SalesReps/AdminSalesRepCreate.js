// Libraries
import React from 'react';
import {
  Create,
  SaveButton,
  SimpleForm,
  TextInput,
  LongTextInput,
  Toolbar,
  SelectInput
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

const AdminSalesRepCreate = props => (
  <Create {...props}>
    <SimpleForm
      toolbar={<CreateToolbar />}
      defaultValue={{type: "sr", status: "new", createdAt: new Date()}}
    >
      <SelectInput 
        source="title" 
        choices={[
        { id: 'Mr.', name: 'Mr.'},
        { id: 'Ms.', name: 'Ms.'}
      ]}/>
      <TextInput source="firstName" />
      <TextInput source="lastName" />
      <TextInput source="email" />
      <TextInput source="password" />
      <TextInput source="phoneNumber" />
      <TextInput source="address1" />
      <TextInput source="address2" />
      <TextInput source="city" />
      <TextInput source="postalCode" />
      <TextInput source="country" />
      <LongTextInput source="comments" />
    </SimpleForm>
  </Create>
);

export default AdminSalesRepCreate;

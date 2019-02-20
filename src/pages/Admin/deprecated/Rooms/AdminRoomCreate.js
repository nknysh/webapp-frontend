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

const AdminRoomCreate = props => (
  <Create {...props}>
    <SimpleForm
      toolbar={<CreateToolbar />}
      defaultValue={{
        // TODO
      }}
    >
      <TextInput source="name" />
      <TextInput source="information" />
      <TextInput source="bedType" />
      <NumberInput source="rackRate" />
      <NumberInput source="barRate" />
      <TextInput source="availableUnderRequest" />
    </SimpleForm>
  </Create>
);

export default AdminRoomCreate;

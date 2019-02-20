// Libraries
import React from 'react';
import {
  CheckboxGroupInput,
  DisabledInput,
  Edit,
  LongTextInput,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
  required,
  NumberInput
} from 'react-admin'; // eslint-disable-line import/no-unresolved

const EditToolbar = props => (
  <Toolbar {...props}>
    <SaveButton
      submitOnEnter
      label="Update"
      redirect="show"
    />
  </Toolbar>
);

const AdminRoomEdit = props => (
  <Edit {...props}>
    <SimpleForm
      toolbar={<EditToolbar />}
      defaultValue={{
        // TODO
        bedType: 'double',
      }}
    >
      <DisabledInput source="id" />
      <TextInput source="name" validate={required()} />
      <LongTextInput source="information" validate={required()} />
      <NumberInput source="barRate" validate={required()} />
      <CheckboxGroupInput
        source="Bed Choice"
        choices={[
          { id: 'double', name: 'Double' },
          { id: 'queen', name: 'Queen' },
          { id: 'king', name: 'King' },
        ]}
      />
    </SimpleForm>
  </Edit>
);

export default AdminRoomEdit;

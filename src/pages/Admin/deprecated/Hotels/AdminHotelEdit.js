// Libraries
import React from 'react';
import {
  CheckboxGroupInput,
  DisabledInput,
  SelectInput,
  Edit,
  ImageField,
  ImageInput,
  LongTextInput,
  NumberInput,
  DateInput,
  SimpleForm,
  TextInput,
  required,
  ReferenceManyField,
  Datagrid,
  TextField
} from 'react-admin'; // eslint-disable-line import/no-unresolved

const AllotmentEdit = props => ( // eslint-disable-line
  <div>
    <SelectInput source="name"
      choices={[
        { id: 'peak_season', name: 'Peak Season'},
        { id: 'winter_season', name: 'Winter Season'},
        { id: 'honeymoon', name: 'Honeymoon Season'}
      ]}
    />
    <SelectInput source="roomType"
      choices={[
        { id: 'sup-king', name: 'Superior King'},
        { id: 'queen', name: 'Queen'},
        { id: 'honeymoon', name: 'Honeymoon'}
      ]}
    />
    <DateInput source="startDate"/>
    <DateInput source="endDate"/>
    <NumberInput source="quantity"/>
    <DateInput source="cutOffDate"/>
  </div>
);


const AdminHotelEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="name" validate={required()} />
      <TextInput source="address" validate={required()} />
      <LongTextInput source="description" validate={required()} />
      <CheckboxGroupInput
        source="Meal Plan"
        choices={[
          { id: 'breakfast', name: 'BREAKFAST' },
          { id: 'half-board', name: 'HALF BOARD' },
          { id: 'full-board', name: 'FULL BOARD' },
          { id: 'all-inclusive', name: 'ALL INCLUSIVE' },
        ]}
      />
      <ImageInput multiple source="pictures" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
      <ReferenceManyField label='Allotments' reference='allotments' target='hotelId'>
        <Datagrid>
          <TextField source='name' />
          <TextField source='roomType' />
          <TextField source='startDate' />
          <TextField source='endDate' />
          <TextField source='cutOffDate' />
          <TextField source='quantity' />
        </Datagrid>
      </ReferenceManyField>
    </SimpleForm>
  </Edit>
);

export default AdminHotelEdit;

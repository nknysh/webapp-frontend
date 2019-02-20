// Libraries
import React from 'react';
import Button from '@material-ui/core/Button';
import UsersApi from '../../../../api/users';
import {
  Edit,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
  required,
  SelectInput,
  CardActions,
  ListButton,
  DeleteButton,
  RefreshButton,
  BooleanField
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

const ApprovalButtons = (props) => (
    <div>
      <Button onClick={() => UsersApi.updateUserApproval({id: props.record.id, status: true})}> Approve </Button>
      <Button onClick={() => UsersApi.updateUserApproval({id: props.record.id, status: false})}> Deny </Button>
    </div>
  )

const TravelAgentEditActions = ({basePath, data, resource}) => (
  <CardActions>
    <ApprovalButtons record={data} />
    <ListButton basePath={basePath} />
    <DeleteButton basePath={basePath} record={data} resource={resource} />
    <RefreshButton />
  </CardActions>
)

const AdminTravelAgentEdit = props => (
  <Edit {...props} actions={<TravelAgentEditActions />}>
    <SimpleForm
      toolbar={<EditToolbar />}
      >
      <BooleanField source="isApproved" />
      <SelectInput source="title" choices={[
        { id: 'Mr.', name: 'Mr.'},
        { id: 'Ms.', name: 'Ms.'}
      ]}/>
      <TextInput source="firstName" validate={required()} />
      <TextInput source="lastName" validate={required()}/>
      <TextInput source="email" validate={required()} />
      <TextInput source="phoneNumber" validate={required()} />
      <TextInput source="country" />
    </SimpleForm>
  </Edit>
);

export default AdminTravelAgentEdit;

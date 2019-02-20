// Libraries
import BookIcon from '@material-ui/icons/Book';
import { withStyles } from '@material-ui/core/styles';

import React, { Children, cloneElement } from 'react';
import {
  BulkActions,
  BulkDeleteAction,
  Datagrid,
  EditButton,
  Filter,
  List,
  Responsive,
  ShowButton,
  SimpleList,
  TextField,
  NumberInput,
  NumberField
} from 'react-admin'; // eslint-disable-line import/no-unresolved

export const PostIcon = BookIcon;

const RangeFilter = props => (
  <span>
    <NumberInput label='low' source='barRate.between[0]' />
    <NumberInput label='high' source='barRate.between[1]' />
  </span>
)

const Filters = props => (
  <Filter {...props}>
    <RangeFilter label="Rate Range"/>
  </Filter>
);

const styles = theme => ({
  name: {
    maxWidth: '20em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  information: {
    maxWidth: '20em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  hiddenOnSmallScreens: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  createdAt: {
    fontStyle: 'italic',
  },
});

const RoomBulkActions = props => (
  <BulkActions {...props}>
    <BulkDeleteAction />
  </BulkActions>
);

const ActionToolbar = withStyles({
  toolbar: {
    alignItems: 'center',
    display: 'flex',
  },
})(({ classes, children, ...props }) => (
  <div className={classes.toolbar}>
    {Children.map(children, button => cloneElement(button, props))}
  </div>
));

const AdminRoomsList = withStyles(styles)(({ classes, ...props }) => (
  <List
    {...props}
    bulkActions={<RoomBulkActions />}
    filters={<Filters />}
    sort={{ field: 'barRate', order: 'ASC' }}
  >
    <Responsive
      small={
        <SimpleList
          primaryText={record => record.name}
          secondaryText={record => `${record.views} views`}
          tertiaryText={record =>
            new Date(record.published_at).toLocaleDateString()
          }
        />
      }
      medium={
        <Datagrid>
          <TextField source="id" />
          <TextField source="name" cellClassName={classes.name} />
          <NumberField source="barRate" cellClassName={classes.rate} />
          <TextField source="information" cellClassName={classes.information} />
          <ActionToolbar>
            <EditButton />
            <ShowButton />
          </ActionToolbar>
        </Datagrid>
      }
    />
  </List>
));

export default AdminRoomsList;

// Libraries
import BookIcon from '@material-ui/icons/Book';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
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
  TextInput,
} from 'react-admin'; // eslint-disable-line import/no-unresolved

export const PostIcon = BookIcon;

const Filters = props => (
  <Filter {...props}>
    <TextInput
      label="Search"
      source="query"
      alwaysOn
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon color="disabled" />
          </InputAdornment>
        ),
      }}
    />
    <TextInput
      source="name"
      defaultValue=""
    />
    <TextInput
      source="country"
      defaultValue=""
    />
  </Filter>
);

const styles = theme => ({
  name: {
    maxWidth: '20em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  country: {
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

const HotelBulkActions = props => (
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

const AdminHotelsList = withStyles(styles)(({ classes, ...props }) => (
  <List
    {...props}
    bulkActions={<HotelBulkActions />}
    filters={<Filters />}
    sort={{ field: 'id', order: 'ASC' }}
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
          <TextField source="country" cellClassName={classes.country} />
          <ActionToolbar>
            <EditButton />
            <ShowButton />
          </ActionToolbar>
        </Datagrid>
      }
    />
  </List>
));

export default AdminHotelsList;

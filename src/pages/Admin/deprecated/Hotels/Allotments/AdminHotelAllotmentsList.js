// Libraries
import BookIcon from '@material-ui/icons/Book';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import {
  Datagrid,
  List,
  Responsive,
  TextField,
} from 'react-admin'; // eslint-disable-line import/no-unresolved

export const PostIcon = BookIcon;

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

const AdminHotelAllotmentsList = withStyles(styles)(({ classes, ...props }) => (
  <List
    {...props}
    sort={{ field: 'id', order: 'ASC' }}
  >
    <Responsive
      medium={
        <Datagrid>
          <TextField source='name' />
          <TextField source='roomType' />
          <TextField source='startDate' />
          <TextField source='endDate' />
          <TextField source='cutOffDate' />
          <TextField source='quantity' />
        </Datagrid>
      }
    />
  </List>
));

export default AdminHotelAllotmentsList;

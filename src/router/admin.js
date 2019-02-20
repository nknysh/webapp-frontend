// Libraries
import React from 'react';
import { Admin, Resource } from 'react-admin';
import loopbackProvider from 'aor-loopback';
import JssProvider from 'react-jss/lib/JssProvider';

import httpClient from '../api/httpClient';

import RoomIcon from '@material-ui/icons/Room';
import PersonIcon from '@material-ui/icons/PersonPin';
import FlightIcon from '@material-ui/icons/Flight';
import HotelIcon from '@material-ui/icons/Hotel';

// Pages
import {
  AdminHotelCreate,
  AdminHotelEdit,
  AdminHotelsList,
  AdminRoomCreate,
  AdminRoomEdit,
  AdminRoomsList,
  AdminSalesRepCreate,
  AdminSalesRepEdit,
  AdminSalesRepsList,
  AdminTravelAgentCreate,
  AdminTravelAgentEdit,
  AdminTravelAgentsList,
  AdminHotelAllotmentsList,
  AdminHotelAllotmentCreate
} from 'pages/Admin';

const escapeRegex = /([[\].#*$><+~=|^:(),"'`\s])/g;
let classCounter = 0;

// Heavily inspired of Material UI:
// @see https://github.com/mui-org/material-ui/blob/9cf73828e523451de456ba3dbf2ab15f87cf8504/src/styles/createGenerateClassName.js
// The issue with the MUI function is that is create a new index for each
// new `withStyles`, so we handle have to write our own counter
const generateClassName = (rule, styleSheet) => {
  classCounter += 1;

  if (process.env.NODE_ENV === 'production') {
    return `c${classCounter}`;
  }

  if (styleSheet && styleSheet.options.classNamePrefix) {
    let prefix = styleSheet.options.classNamePrefix;
    // Sanitize the string as will be used to prefix the generated class name.
    prefix = prefix.replace(escapeRegex, '-');

    if (prefix.match(/^Mui/)) {
      return `${prefix}-${rule.key}`;
    }

    return `${prefix}-${rule.key}-${classCounter}`;
  }

  return `${rule.key}-${classCounter}`;
};

const routes = {
  adminOld: {
    name: 'Admin',
    path: '/admin-old',
    exact: true,
    render: (props) => (
      <JssProvider generateClassName={generateClassName}>
        <Admin
          title=""
          dataProvider={loopbackProvider('/api', httpClient)}
        >
          <Resource
            name="hotels"
            icon={HotelIcon}
            create={AdminHotelCreate}
            edit={AdminHotelEdit}
            list={AdminHotelsList}
            {...props}
          />
          <Resource
            name="rooms"
            icon={RoomIcon}
            create={AdminRoomCreate}
            edit={AdminRoomEdit}
            list={AdminRoomsList}
            {...props}
          />
          <Resource
            name="users/salesRepresentatives"
            icon={PersonIcon}
            options={{ label: 'Sales Representatives' }}
            create={AdminSalesRepCreate}
            edit={AdminSalesRepEdit}
            list={AdminSalesRepsList}
            {...props}
          />
          <Resource
            name="users/travelAgents"
            icon={FlightIcon}
            options={{ label: 'Travel Agents' }}
            create={AdminTravelAgentCreate}
            edit={AdminTravelAgentEdit}
            list={AdminTravelAgentsList}
            {...props}
          />
          <Resource
            name="allotments"
            list={AdminHotelAllotmentsList}
            create={AdminHotelAllotmentCreate}
            {...props}
          />
        </Admin>
      </JssProvider>
    ),
  },
};

// eslint-disable-next-line import/prefer-default-export
export { routes };

// Libraries
import React from 'react';
import { connect } from 'react-redux';

// App
import { fetchHotel } from 'actions/hotels';
import { getHotel } from 'selectors/hotels';

// Components
import { Request } from 'components';

const RequestHotel = ({ id, children, fetchHotel }) => (
  <Request
    getState={state => ({ hotel: getHotel(state, id) })}
    onRequest={() => fetchHotel({ id, query: { rooms: {} } })}
  >
    {({ hotel }) => children({ hotel })}
  </Request>
);

export default connect(
  undefined,
  { fetchHotel }
)(RequestHotel);

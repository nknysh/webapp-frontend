// Libraries
import React from 'react';
import { connect } from 'react-redux';

// App
import { fetchRoom } from 'store/modules/rooms/actions';
import { getRoom } from 'store/modules/rooms/selectors';

// Components
import { Request } from 'components';

const RequestRoom = ({ id, children, fetchRoom }) => (
  <Request getState={state => ({ room: getRoom(state, id) })} onRequest={() => fetchRoom({ id, query: { hotel: {} } })}>
    {({ room }) => children({ room })}
  </Request>
);

export default connect(
  undefined,
  { fetchRoom }
)(RequestRoom);

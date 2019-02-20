// Libraries
import React from 'react';
import { connect } from 'react-redux';

// App
import { fetchRoom } from 'actions/rooms';
import { getRoom } from 'selectors/rooms';

// Components
import { Request } from 'components';

const RequestRoom = ({ id, children, fetchRoom }) => (
  <Request
    getState={(state) => ({ room: getRoom(state, id) })}
    onRequest={() => fetchRoom({ id, query: { hotel: {}}})}
  >
    {({ room }) => children({ room })}
  </Request>
);

export default connect(undefined, { fetchRoom })(RequestRoom);

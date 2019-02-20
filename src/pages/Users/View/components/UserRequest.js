// Libraries
import React from 'react';
import { connect } from 'react-redux';

// App
import { fetchUser } from 'actions/users';
import { getUser } from 'selectors/users';

// Components
import { Form, Request } from 'components';

const UserRequest = ({ id, fetchUser, children }) => (
  <Request
    getState={(state) => ({ user: getUser(state, id) })}
    onRequest={() => fetchUser({ id })}
  >
    {({ user, handleRequest }) => (
      <Form
        initialValues={{
          query: '',
        }}
        onSubmit={handleRequest}
      >
        {({ values, handleChange, submitForm }) => children({ user })}
      </Form>
    )}
  </Request>
);

export default connect(undefined, { fetchUser })(UserRequest);

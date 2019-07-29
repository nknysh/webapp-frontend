import React, { Fragment, useCallback } from 'react';

import { Modal } from 'components';
import { LoginForm } from 'containers';
import Home from 'pages/Home';

import { propTypes } from './User.props';

export const User = ({ history, ...props }) => {
  const onClose = useCallback(() => history.push('/'), [history]);

  return (
    <Fragment>
      User
      {/* <Home history={history} {...props} />
      <Modal open={true} onClose={onClose}>
        <LoginForm />
      </Modal> */}
    </Fragment>
  );
};

User.propTypes = propTypes;

export default User;

import React, { Fragment } from 'react';

import { Modal } from 'components';
import { LoginForm } from 'containers';
import { Home } from 'pages';

import { propTypes } from './Login.props';

export const Login = ({ history, ...props }) => {
  const onClose = () => history.push('/');

  return (
    <Fragment>
      <Home history={history} {...props} />
      <Modal open={true} onClose={onClose}>
        <LoginForm />
      </Modal>
    </Fragment>
  );
};

Login.propTypes = propTypes;

export default Login;

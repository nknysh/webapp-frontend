import React, { Fragment, useCallback } from 'react';
import { Modal } from '@pure-escapes/webapp-ui-components';

import { LoginForm } from 'containers';
import Home from 'pages/Home';

import { propTypes } from './Login.props';

export const Login = ({ history, ...props }) => {
  const onClose = useCallback(() => history.push('/'), [history]);

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

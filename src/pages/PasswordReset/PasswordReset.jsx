import React, { Fragment, useCallback } from 'react';
import { Modal } from '@pure-escapes/webapp-ui-components';

import { PasswordResetForm } from 'containers';
import Home from 'pages/Home';

import { propTypes } from './PasswordReset.props';

export const PasswordReset = ({ history, ...props }) => {
  const onClose = useCallback(() => {
    history.push('/');
  }, [history]);

  return (
    <Fragment>
      <Home history={history} {...props} />
      <Modal open={true} onClose={onClose}>
        <PasswordResetForm />
      </Modal>
    </Fragment>
  );
};

PasswordReset.propTypes = propTypes;

export default PasswordReset;

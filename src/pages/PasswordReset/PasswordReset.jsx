import React, { Fragment } from 'react';

import { Modal } from 'components';
import { PasswordResetForm } from 'containers';
import { Home } from 'pages';

import { propTypes } from './PasswordReset.props';

export const PasswordReset = ({ history, ...props }) => {
  const onClose = () => history.push('/');

  return (
    <Fragment>
      <Home history={history} {...props} />
      <Modal open={true} onBackdropClick={onClose} onEscapeKeyDown={onClose}>
        <PasswordResetForm />
      </Modal>
    </Fragment>
  );
};

PasswordReset.propTypes = propTypes;

export default PasswordReset;

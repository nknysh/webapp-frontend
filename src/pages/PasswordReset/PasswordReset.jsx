import React, { Fragment } from 'react';

import { Modal } from 'components';
import { PasswordResetForm } from 'containers';
import { AsyncHome } from 'pages/Home';

import { propTypes } from './PasswordReset.props';

export const PasswordReset = ({ history, ...props }) => {
  const onClose = () => {
    history.push('/');
  };

  return (
    <Fragment>
      <AsyncHome history={history} {...props} />
      <Modal open={true} onClose={onClose}>
        <PasswordResetForm />
      </Modal>
    </Fragment>
  );
};

PasswordReset.propTypes = propTypes;

export default PasswordReset;

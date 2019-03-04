import React, { Fragment } from 'react';

import { Modal } from 'components';
import { CreateAccountForm } from 'containers';
import { Home } from 'pages';

import { propTypes, defaultProps } from './CreateAccount.props';

export const CreateAccount = ({ history, ...props }) => {
  const onClose = () => history.push('/');

  return (
    <Fragment>
      <Home hostory={history} {...props} />
      <Modal open={true} onClose={onClose} onBackdropClick={onClose} onEscapeKeyDown={onClose}>
        <CreateAccountForm />
      </Modal>
    </Fragment>
  );
};

CreateAccount.propTypes = propTypes;
CreateAccount.defaultProps = defaultProps;

export default CreateAccount;

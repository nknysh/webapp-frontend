import React, { Fragment } from 'react';

import { Modal } from 'components';
import { CreateAccountForm } from 'containers';
import Home from 'pages/Home';

import { propTypes, defaultProps } from './CreateAccount.props';

export const CreateAccount = ({ history, ...props }) => {
  const onClose = () => history.push('/');

  return (
    <Fragment>
      <Home history={history} {...props} />
      <Modal open={true} onClose={onClose}>
        <CreateAccountForm />
      </Modal>
    </Fragment>
  );
};

CreateAccount.propTypes = propTypes;
CreateAccount.defaultProps = defaultProps;

export default CreateAccount;

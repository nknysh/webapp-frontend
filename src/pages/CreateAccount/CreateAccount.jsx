import React, { Fragment, useCallback } from 'react';

import { Modal } from 'components';
import { CreateAccountForm } from 'containers';
import Home from 'pages/Home';

import { propTypes, defaultProps } from './CreateAccount.props';

export const CreateAccount = ({ history, ...props }) => {
  const onClose = useCallback(() => history.push('/'), [history]);

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

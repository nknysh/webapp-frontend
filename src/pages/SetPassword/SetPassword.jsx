import React, { Fragment } from 'react';

import { Modal } from 'components';
import { SetPasswordForm } from 'containers';
import { Home } from 'pages';

import { propTypes } from './SetPassword.props';

export const SetPassword = ({ history, match, ...props }) => {
  const { params: token } = match;
  const onClose = () => {
    history.push('/');
  };

  return (
    <Fragment>
      <Home history={history} match={match} {...props} />
      <Modal open={true} onClose={onClose}>
        <SetPasswordForm token={token} />
      </Modal>
    </Fragment>
  );
};

SetPassword.propTypes = propTypes;

export default SetPassword;

import React, { Fragment } from 'react';

import { Modal } from 'components';
import { SetPasswordForm } from 'containers';
import { AsyncHome } from 'pages/Home';

import { propTypes } from './SetPassword.props';

export const SetPassword = ({ history, match, ...props }) => {
  const { params: token } = match;
  const onClose = () => {
    history.push('/');
  };

  return (
    <Fragment>
      <AsyncHome history={history} match={match} {...props} />
      <Modal open={true} onClose={onClose}>
        <SetPasswordForm token={token} />
      </Modal>
    </Fragment>
  );
};

SetPassword.propTypes = propTypes;

export default SetPassword;

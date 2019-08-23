import React, { Fragment, useCallback } from 'react';
import { Modal } from '@pure-escapes/webapp-ui-components';

import { SetPasswordForm } from 'containers';
import Home from 'pages/Home';

import { propTypes } from './SetPassword.props';

export const SetPassword = ({ history, match, ...props }) => {
  const { params: token } = match;
  const onClose = useCallback(() => {
    history.push('/');
  }, [history]);

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

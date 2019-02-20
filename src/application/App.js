/**
 * Copyright © 2018 Gigster, Inc. All Rights Reserved.
 *
 * This software and/or related documentation, is protected by copyright and
 * other intellectual property laws, and Gigster and/or its licensors, as
 * applicable, own all right, title and interest in and to its content, and all
 * derivatives, translations, adaptations and combinations of the foregoing. You
 * are not permitted to copy, distribute, transmit, store, display, perform,
 * reproduce, publish, license, create derivative works from, transfer, sell, or
 * make any other use of this software and/or related documentation unless you
 * have entered into a written agreement with Gigster regarding such usage. You
 * agree that all such usage of the software and/or related documentation shall
 * be subject to the terms and conditions of such written agreement, including
 * all applicable license restrictions.
 */

// Libraries
import React from 'react';
import { connect } from 'react-redux';

// App
import { getUserFromToken } from 'actions/auth';
import { AppRouter, getQuery } from '../router';

// Styles
import './App.css';

class App extends React.Component {
  getTokenParam = () => {
    if (!window) {
      return null;
    }

    const query = getQuery(window.location) || {};
    return query.token;
  }

  componentWillMount() {
    // TODO(mark): Probably not the best place but we don't have sagas.
    const tokenParam = this.getTokenParam();
    const token = tokenParam || localStorage.getItem('authToken');

    if (token) {
      this.props.getUserFromToken({ token });
    }
  }

  render() {
    return <AppRouter />;
  }
}

export default connect(undefined, { getUserFromToken })(App);

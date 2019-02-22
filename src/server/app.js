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
const express = require('express');
const path = require('path');

const proxy = require('./proxy');

const app = express();

// Serve the static react app.
app.use(express.static(path.resolve(__dirname, '..', '..', 'build')));

// Set up an API proxy to avoid CORS.
proxy(app);

// Always return the main index.html which will render the client.
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '..', '..', 'build', 'index.html'));
});

module.exports = app;

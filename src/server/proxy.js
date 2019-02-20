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

const proxy = require('http-proxy-middleware');
const packageJSON = require('../../package.json');

// Set up an API proxy to avoid CORS.
module.exports = (router) => {
  const proxyConfig = packageJSON.proxy || {};

  Object.keys(proxyConfig).forEach((domain) => {
    const proxyEntry = proxyConfig[domain];
    if (typeof proxyEntry !== 'object') {
      return;
    }

    // Allows us to set a target url per environment.
    proxyEntry.target = process.env.REACT_APP_API_BASE_URL;

    // eslint-disable-next-line no-console
    console.log(`creating proxy: ${domain} -> ${proxyEntry.target}`);

    router.use(domain, proxy(proxyEntry));
  });
};


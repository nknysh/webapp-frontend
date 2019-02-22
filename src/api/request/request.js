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

import axios from 'axios';

import responseInterceptor from './response';
import errorInterceptor from './error';

import { isValidOptionObject } from './validations';

const requestCreator = interceptor => options => {
  const instance = axios.create(options);

  instance.query = {};
  instance.cache = {};

  instance.withAuth = token => {
    if (token === undefined) {
      return instance;
    }

    instance.defaults.headers.Authorization = token;

    return instance;
  };

  instance.setHeaders = headers => {
    if (!isValidOptionObject({ name: 'headers', option: headers })) {
      return instance;
    }

    instance.defaults.headers = {
      Authorization: instance.defaults.headers.Authorization,
      ...headers,
    };

    return instance;
  };

  instance.uploadFile = (url, file) => {
    const params = new FormData();
    params.append('file', file, file.name);

    return instance.post(url, params);
  };

  instance.order = order => {
    instance.query.order = order;
    return instance;
  };

  instance.limit = limit => {
    instance.query.limit = limit;
    return instance;
  };

  instance.skip = skip => {
    instance.query.skip = skip;
    return instance;
  };

  instance.include = include => {
    instance.query.include = include;
    instance.cache.nestedData = include;
    return instance;
  };

  instance.where = where => {
    instance.query.where = where;
    return instance;
  };

  instance.q = query => {
    instance.query.query = query;
    return instance;
  };

  instance.interceptors.request.use(interceptor(instance));
  instance.interceptors.response.use(responseInterceptor(instance), errorInterceptor);

  return instance;
};

export default requestCreator;

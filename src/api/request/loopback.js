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

import { isValidOptionObject, isValidArray, isValidOptionNumber, sanitizeObject } from './validations';

// Sanitizers
const sanitizeOrder = order => (isValidOptionObject({ name: 'order', option: order }) ? order : undefined);

const sanitizeLimit = limit => (isValidOptionNumber({ name: 'limit', option: limit }) ? limit : undefined);

const sanitizeSkip = skip => (isValidOptionNumber({ name: 'skip', option: skip }) ? skip : undefined);

const sanitizeInclude = include =>
  isValidArray({ name: 'include', option: include }) ? transformInclude(include) : undefined;

const sanitizeWhere = where =>
  isValidOptionObject({ name: 'where', option: where }) ? sanitizeObject(where) : undefined;

// Transforms
const transformInclude = include => {
  if (!include) {
    return include;
  }

  return include.map(relation => ({
    relation,
    scope: {
      fields: ['id'],
    },
  }));
};

// Interceptor
const LoopbackInterceptor = instance => config => {
  instance.query.order = sanitizeOrder(instance.query.order);
  instance.query.limit = sanitizeLimit(instance.query.limit);
  instance.query.skip = sanitizeSkip(instance.query.skip);
  instance.query.include = sanitizeInclude(instance.query.include);
  instance.query.where = sanitizeWhere(instance.query.where);

  instance.query = sanitizeObject(instance.query);

  if (Object.keys(instance.query).length) {
    const filters = JSON.stringify(instance.query);
    config.url += `?filter=${filters}`;
  }

  return config;
};

export default LoopbackInterceptor;

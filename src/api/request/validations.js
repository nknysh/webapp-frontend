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

const isValidOptionObject = ({ name, option }) => {
  if (option === undefined) {
    return false;
  }

  if (typeof option !== 'object') {
    // eslint-disable-next-line no-console
    console.error(`Invalid ${name} option provided (expected object): `, option);

    return false;
  }

  if (!Object.keys(option).length) {
    // eslint-disable-next-line no-console
    console.error(`Empty ${name} option provided`);

    return false;
  }

  return true;
};

const isValidArray = ({ name, option }) => {
  if (option === undefined) {
    return false;
  }

  if (!Array.isArray(option)) {
    // eslint-disable-next-line no-console
    console.error(`Invalid ${name} option provided (expected array): `, option);

    return false;
  }

  return true;
};

const isValidOptionNumber = ({ name, option }) => {
  if (option === undefined) {
    return false;
  }

  if (typeof option !== 'number') {
    // eslint-disable-next-line no-console
    console.error(`Invalid ${name} option provided (expected number): `, option);

    return false;
  }

  return true;
};

const sanitizeObject = option => {
  // remove filters with a value of `undefined`
  Object.keys(option).forEach(key => {
    if (option[key] === undefined) {
      delete option[key];
    }
  });

  return option;
};

export { isValidOptionObject, isValidArray, isValidOptionNumber, sanitizeObject };

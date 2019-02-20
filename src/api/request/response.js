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

const responseTransformInterceptor = (instance) => (response) => {
  if (!Array.isArray(instance.cache.nestedData)) {
    return response;
  }

  const isArray = Array.isArray(response.data);
  if (!isArray) {
    response.data = [response.data];
  }

  // convert nested data into array of IDs
  response = instance.cache.nestedData.reduce((resp, nestedData) => {
    resp.data = resp.data.map((item) => {
      let data = item[nestedData];
      if (!Array.isArray(data)) {
        data = [data];
      }

      item[nestedData] = data
        .map((object) => object && object.id)
        .filter((object) => !!object);

      return item;
    });

    return resp;
  }, response);

  if (!isArray) {
    // eslint-disable-next-line prefer-destructuring
    response.data = response.data[0];
  }

  return response;
};

export default responseTransformInterceptor;


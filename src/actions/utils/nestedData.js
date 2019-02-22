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

const fetchData = ({ dispatch, token, ids = [], query = {}, actionCreator }) => {
  if (!Array.isArray(ids)) {
    // eslint-disable-next-line no-param-reassign
    ids = [ids];
  }

  const args = {
    token,
    query,
    where: {
      id: {
        inq: ids,
      },
    },
  };

  return dispatch(actionCreator(args));
};

const getUniqueValuesForAttr = ({ list, attr }) => {
  if (!Array.isArray(list)) {
    // eslint-disable-next-line no-param-reassign
    list = [list];
  }

  const uniqueValues = list
    .reduce((attrList, item) => attrList.concat(item[attr]), [])
    .filter((value, idx, arr) => arr.indexOf(value) === idx);

  return uniqueValues;
};

const fetchNestedData = ({ list, dispatch, token, query = {}, actionCreatorMap = {} }) => {
  const include = Object.keys(query);

  const dispatches = include.map(data => {
    const ids = getUniqueValuesForAttr({
      list,
      attr: data,
    });

    return fetchData({
      dispatch,
      token,
      query: query[data],
      ids,
      actionCreator: actionCreatorMap[data],
    });
  });

  return dispatches;
};

// eslint-disable-next-line import/prefer-default-export
export { fetchNestedData };

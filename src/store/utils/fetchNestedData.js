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

export default fetchNestedData;

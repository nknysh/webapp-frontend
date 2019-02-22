const arrayToMap = (list, attr = 'id') => {
  if (!Array.isArray(list)) {
    list = [list];
  }

  return list.reduce((hash, item) => {
    hash[item[attr]] = item;
    return hash;
  }, {});
};

const getList = ({ state, model, ids, predicate = () => true }) => {
  const slice = state[model];
  if (!slice) {
    return [];
  }

  // eslint-disable-next-line prefer-destructuring
  const data = slice.data;
  const list = ids ? ids.map(id => data[id]).filter(item => !!item) : Object.values(data);

  return list.filter(predicate);
};

const getItem = ({ state, model, key, predicate = () => true }) => {
  const slice = state[model];
  if (!slice) {
    return undefined;
  }

  const item = slice.data[key];
  return predicate(item) ? item : undefined;
};

export default {
  arrayToMap,
  getList,
  getItem,
};

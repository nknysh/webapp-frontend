import { path } from 'ramda';

import utils from 'store/utils';

const model = 'rates';

export const getRates = (state, { ids } = {}) => utils.getList({ state, model, ids });
export const getRate = (state, key) => utils.getItem({ state, model, key });
export const getRatesForRoom = (state, roomId) => {
  const all = getRates(state);
  const filtered = all.filter(rate => rate.roomId === Number(roomId));
  return path([0, 'rows'], filtered);
};

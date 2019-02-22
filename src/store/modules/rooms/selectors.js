import utils from 'store/utils';

const model = 'rooms';

export const getRooms = (state, { ids } = {}) => utils.getList({ state, model, ids });
export const getRoom = (state, key) => utils.getItem({ state, model, key });

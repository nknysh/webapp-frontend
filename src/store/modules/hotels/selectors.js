import utils from 'store/utils';

const model = 'hotels';

export const getHotels = (state, { ids } = {}) => utils.getList({ state, model, ids });
export const getHotel = (state, key) => utils.getItem({ state, model, key });

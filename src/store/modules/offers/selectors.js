import utils from 'store/utils';

const model = 'offers';

export const getOffers = (state, { ids } = {}) => utils.getList({ state, model, ids });
export const getOffer = (state, key) => utils.getItem({ state, model, key });

import utils from 'store/utils';

const model = 'travelAgents';

export const getTravelAgents = (state, { ids } = {}) => utils.getList({ state, model, ids });
export const getTravelAgent = (state, key) => utils.getItem({ state, model, key });

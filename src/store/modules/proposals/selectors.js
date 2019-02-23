import utils from 'store/utils';

const model = 'proposals';

export const getProposals = (state, { ids } = {}) => utils.getList({ state, model, ids });
export const getProposal = (state, key) => utils.getItem({ state, model, key });

import utils from 'store/utils';

const model = 'companies';

export const getCompanies = (state, { ids } = {}) => utils.getList({ state, model, ids });
export const getCompany = (state, key) => utils.getItem({ state, model, key });

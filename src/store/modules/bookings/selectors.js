import utils from 'store/utils';

const model = 'bookings';

const getBookings = (state, { ids } = {}) => utils.getList({ state, model, ids });

const getBooking = (state, key) => utils.getItem({ state, model, key });

export { getBookings, getBooking };

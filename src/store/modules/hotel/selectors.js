import { prop, path, pipe } from 'ramda';

/**
 * Get hotel selector
 *
 * @param {object}
 * @returns {object}
 */
export const getHotel = prop('hotel');

/**
 * Get hotel status selector
 *
 * @param {object}
 * @returns {string}
 */
export const getHotelStatus = pipe(getHotel, prop('status'));

/**
 * Get hotel id selector
 *
 * @param {object}
 * @returns {string}
 */
export const getHotelId = pipe(getHotel, path(['data', 'result']));

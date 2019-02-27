/**
 * Copyright © 2018 Gigster, Inc. All Rights Reserved.
 *
 * This software and/or related documentation, is protected by copyright and
 * other intellectual property laws, and Gigster and/or its licensors, as
 * applicable, own all right, title and interest in and to its content, and all
 * derivatives, translations, adaptations and combinations of the foregoing. You
 * are not permitted to copy, distribute, transmit, store, display, perform,
 * reproduce, publish, license, create derivative works from, transfer, sell, or
 * make any other use of this software and/or related documentation unless you
 * have entered into a written agreement with Gigster regarding such usage. You
 * agree that all such usage of the software and/or related documentation shall
 * be subject to the terms and conditions of such written agreement, including
 * all applicable license restrictions.
 */

import requestCreator, { Loopback } from './request';

const request = requestCreator(Loopback);
const url = `${window.location.origin}/api/bookings`;

const makeFetchBookings = fetchUrl => ({ token, where, order, limit, skip, include, q }) =>
  request()
    .withAuth(token)
    .where(where)
    .order(order)
    .limit(limit)
    .skip(skip)
    .q(q)
    .include(include)
    .get(fetchUrl)
    .then(response => response.data);

const fetchBookings = makeFetchBookings(url);
const searchBookings = makeFetchBookings(`${url}/search`);

const createBooking = ({ token, ...params }) =>
  request()
    .withAuth(token)
    .post(url, params)
    .then(response => response.data);

const fetchBookingOptions = ({ token }) =>
  request()
    .withAuth(token)
    .get(`${window.location.origin}/api/options`)
    .then(response => response.data);

const updateBooking = ({ token, ...params }) =>
  request()
    .withAuth(token)
    .patch(url, params)
    .then(response => response.data);

const deleteBooking = ({ token, id }) =>
  request()
    .withAuth(token)
    .delete(`${url}/${id}`)
    .then(response => response.data);

const uploadBookingInvoice = ({ token, file, id }) =>
  request()
    .withAuth(token)
    .post(`${url}/${id}/invoice/upload`, file)
    .then(response => response.data);

const exportBookings = ({ token, ...params }) =>
  request()
    .withAuth(token)
    .post(`${url}/export`, params)
    .then(response => response.data);

export default {
  fetchBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  fetchBookingOptions,
  uploadBookingInvoice,
  searchBookings,
  exportBookings,
};

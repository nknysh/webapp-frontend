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

import utils from './utils';
import _ from 'lodash';

const model = 'rates';

const getRates = (state, { ids } = {}) => utils.getList({ state, model, ids });

const getRate = (state, key) => utils.getItem({ state, model, key });

const getRatesForRoom = (state, roomId) => {
  const all = getRates(state);
  const filtered = all.filter(rate => rate.roomId === Number(roomId));
  return _.get(filtered, '[0].rows');
};

export { getRates, getRate, getRatesForRoom };

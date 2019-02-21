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

import utils from './index';

describe('selector utilities', () => {
  const model = 'modelKey';
  const invalidModel = 'invalid';
  const state = {
    [model]: {
      data: {
        1: {
          id: 1,
          name: 'item 1',
          type: 1,
        },
        2: {
          id: 2,
          name: 'item 2',
          type: 1,
        },
        3: {
          id: 3,
          name: 'item 3',
          type: 2,
        },
      },
    },
  };

  const predicate = item => item.type === 1;

  describe('#getList', () => {
    it('returns no data when a model does not exist', () => {
      expect(utils.getList({ state, model: invalidModel })).toEqual([]);
    });

    it('returns valid state', () => {
      expect(utils.getList({ state, model })).toMatchSnapshot();
    });

    it('returns items matching a given list of IDs', () => {
      expect(utils.getList({ state, model, ids: [2, 3] })).toMatchSnapshot();
    });

    it('returns all items when IDs is falsey', () => {
      expect(utils.getList({ state, model, ids: undefined })).toMatchSnapshot();
    });

    it('returns no items when IDs is an empty array', () => {
      expect(utils.getList({ state, model, ids: [] })).toMatchSnapshot();
    });

    it('filters result given a predicate', () => {
      expect(utils.getList({ state, model, predicate })).toMatchSnapshot();
    });
  });

  describe('#getItem', () => {
    it('returns no data when a model does not exist', () => {
      const item = utils.getItem({
        state,
        model: invalidModel,
        key: 1,
      });
      expect(item).toEqual(undefined);
    });

    it('returns a valid item', () => {
      const item = utils.getItem({
        state,
        model,
        key: 1,
      });
      expect(item).toMatchSnapshot();
    });

    it('filters items given a predicate', () => {
      const item = utils.getItem({
        state,
        model,
        key: 3,
        predicate,
      });
      expect(item).toEqual(undefined);
    });
  });
});

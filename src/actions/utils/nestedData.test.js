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

import { fetchNestedData } from './nestedData';

describe('action creator nested data utilities', () => {
  describe('#fetchNestedData', () => {
    const token = 'token';
    const dispatch = fn => fn();

    const list = {
      id: 1,
      name: 'model name',
      products: [1, 2, 3],
    };

    let query = {
      products: {},
    };

    it('dispatches action creators for defined includes', () => {
      const fetchProducts = jest.fn();
      const fetchProductsThunk = jest.fn()
        .mockReturnValue(fetchProducts);

      const actionCreatorMap = {
        products: fetchProductsThunk,
      };

      fetchNestedData({
        list,
        dispatch,
        token,
        query,
        actionCreatorMap,
      });

      expect(fetchProductsThunk.mock.calls.length).toEqual(1);
      expect(fetchProducts.mock.calls.length).toEqual(1);
    });

    it('ignores action creators for data not included', () => {
      const fetchProducts = jest.fn();
      const fetchProductsThunk = jest.fn()
        .mockReturnValue(fetchProducts);

      const fetchSkills = jest.fn();
      const fetchSkillsThunk = jest.fn()
        .mockReturnValue(fetchSkills);

      const actionCreatorMap = {
        products: fetchProductsThunk,
        skills: fetchSkillsThunk,
      };

      fetchNestedData({
        list,
        dispatch,
        token,
        query,
        actionCreatorMap,
      });

      expect(fetchSkillsThunk.mock.calls.length).toEqual(0);
      expect(fetchSkills.mock.calls.length).toEqual(0);
    });

    it('passes the correct params to subsequent action creators', () => {
      query = {
        products: {
          skills: {},
        },
      };

      const fetchProducts = jest.fn();
      const fetchProductsThunk = jest.fn()
        .mockReturnValue(fetchProducts);

      const actionCreatorMap = {
        products: fetchProductsThunk,
      };

      fetchNestedData({
        list,
        dispatch,
        token,
        query,
        actionCreatorMap,
      });

      const expectedArgs = {
        token,
        query: query.products,
        where: {
          id: {
            inq: list.products,
          },
        },
      };

      expect(fetchProductsThunk.mock.calls[0][0]).toEqual(expectedArgs);
    });
  });
});


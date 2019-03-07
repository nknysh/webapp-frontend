import { __, path } from 'ramda';
import { selectRelationships } from './selectors';

describe('common selectors', () => {
  describe('selectRelationships', () => {
    it('returns relationships from state based on schema', () => {
      const state = {
        foo: {
          data: {
            fooId1: {
              barId: 'barId1',
              booId: ['booId1', 'booId2'],
            },
          },
        },
        bar: {
          data: {
            barId1: {},
          },
        },
        boo: {
          data: {
            booId1: {},
            booId2: {},
          },
        },
      };

      const getBar = (state, id) => path(['bar', 'data', id], state);
      const getBoo = (state, id) => path(['boo', 'data', id], state);

      const relationships = {
        bar: {
          path: ['barId'],
          resolver: getBar,
        },
        boo: {
          path: ['booId'],
          resolver: getBoo,
        },
      };

      const testEntity = path(['foo', 'data', 'fooId1'], state);

      expect(selectRelationships(state, relationships, testEntity)).toMatchSnapshot();
    });
  });
});

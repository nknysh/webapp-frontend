import { initialState } from 'store/common';

import { getPages, getPage, getPageData, getPageId, getPageHero, getPageLinks, getPageTitle } from './selectors';

const state = {
  pages: {
    ...initialState,
    data: {
      id: 'bar',
      title: 'FooBar',
      data: '### some content',
      hero: 'foo',
      links: ['foo', 'bar'],
    },
  },
};

describe('pages selectors', () => {
  describe('getPages', () => {
    it('returns the root key', () => {
      expect(getPages(state)).toBe(state.pages);
    });
  });
  describe('getPage', () => {
    it('returns the page data', () => {
      expect(getPage(state, 'foo')).toBe(state.pages.data);
    });
  });
  describe('getPageId', () => {
    it('returns the id', () => {
      expect(getPageId(state, 'foo')).toBe(state.pages.data.id);
    });
  });
  describe('getPagesData', () => {
    it('returns the data key', () => {
      expect(getPageData(state)).toBe(state.pages.data.data);
    });
  });
  describe('getPageTitle', () => {
    it('returns the title', () => {
      expect(getPageTitle(state, 'foo')).toBe(state.pages.data.title);
    });
  });
  describe('getPageHero', () => {
    it('returns the hero', () => {
      expect(getPageHero(state, 'foo')).toBe(state.pages.data.hero);
    });
  });
  describe('getPageLinks', () => {
    it('returns the links', () => {
      expect(getPageLinks(state, 'foo')).toBe(state.pages.data.links);
    });
  });
});

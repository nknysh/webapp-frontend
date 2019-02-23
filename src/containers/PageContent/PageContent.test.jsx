import React from 'react';
import { PageContent } from './PageContent';

const mockGetPage = jest.fn();
const getComponent = props => shallow(<PageContent getPage={mockGetPage} {...props} />);

describe('<PageContent />', () => {
  describe('render', () => {
    it('matches snapshot while loading', () => {
      expect(getComponent()).toMatchSnapshot();
    });
    it('matches snapshot with markdown', () => {
      expect(getComponent({ data: '### some data' })).toMatchSnapshot();
      expect(getComponent({ title: 'foo', data: '### some data' })).toMatchSnapshot();
      expect(getComponent({ title: 'foo', links: '- a link', data: '### some data' })).toMatchSnapshot();
      expect(
        getComponent({ title: 'foo', links: '- a link', data: '### some data', hero: { image: 'http://foo' } })
      ).toMatchSnapshot();
    });
  });
});

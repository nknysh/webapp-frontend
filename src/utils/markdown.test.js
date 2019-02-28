import { parseMarkdown, renderMarkdown } from './markdown';

describe('markdown', () => {
  it('parseMarkdown returns parsed markdown', () => {
    expect(parseMarkdown('### Hello')).toMatchSnapshot();
  });
  it('renderMarkdown returns rendererd markdown', () => {
    expect(renderMarkdown('### Hello')).toMatchSnapshot();
  });
});

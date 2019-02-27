import React from 'react';

import { renderMarkdown } from 'utils/markdown';

import { StyledMarkdown } from './Markdown.styles';
import { propTypes } from './Markdown.props';

export const Markdown = ({ children }) => {
  const renderedMarkdown = renderMarkdown(children);
  return <StyledMarkdown dangerouslySetInnerHTML={{ __html: renderedMarkdown }} />;
};

Markdown.propTypes = propTypes;

export default Markdown;

import React from 'react';
import { isEmpty } from 'ramda';

import { renderMarkdown } from 'utils/markdown';

import { propTypes, defaultProps } from './Markdown.props';
import { StyledMarkdown } from './Markdown.styles';

export const Markdown = ({ children }) => {
  if (isEmpty(children)) return null;

  const renderedMarkdown = renderMarkdown(children);
  return <StyledMarkdown dangerouslySetInnerHTML={{ __html: renderedMarkdown }} />;
};

Markdown.propTypes = propTypes;
Markdown.defaultProps = defaultProps;

export default Markdown;

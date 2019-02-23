import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({ html: true });

export const parseMarkdown = markdown => md.parse(markdown);
export const renderMarkdown = markdown => md.render(markdown);

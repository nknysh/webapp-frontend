import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({ html: true });

/**
 * Parse markdown
 *
 * @param {string} markdown
 * @return {object}
 */
export const parseMarkdown = markdown => md.parse(markdown);

/**
 * Render markdown
 *
 * @param {string} markdown
 * @returns {string}
 */
export const renderMarkdown = markdown => md.render(markdown);

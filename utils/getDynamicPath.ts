//used to create Next links to actual page layout path

export const DOCS_PATH = '/docs/[...slug]';
export const BLOG_INDEX_PATH = '/blog/page/[page_index]';
export const BLOG_PATH = '/blog/[slug]';

const docsPattern = /(.)?\/docs\/(.)+/;
const blogIndexPattern = /(.)?\/blog\/page\/[0-9]+/;
const blogPattern = /(.)?\/blog\/(.)+/;
const packagePattern = /(.)?\/packages\/(.)+/;

export function getDynamicPath(url: string) {
  if (docsPattern.test(url)) {
    return '/docs/[...slug]';
  }

  if (blogIndexPattern.test(url)) {
    return '/blog/page/[page_index]';
  }

  if (blogPattern.test(url)) {
    return '/blog/[slug]';
  }
  if (packagePattern.test(url)) {
    return '/packages/[slug]';
  }

  return url;
}

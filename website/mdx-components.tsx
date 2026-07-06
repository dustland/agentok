import type { MDXComponents } from 'mdx/types';
import { useMDXComponents as useThemeMDXComponents } from 'nextra-theme-docs';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...useThemeMDXComponents(),
    ...components,
  };
}

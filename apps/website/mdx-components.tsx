import type { MDXComponents } from 'mdx/types';
import defaultComponents from '@lingsquare/docs-ui/mdx';

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...defaultComponents,
        ...components,
    };
}

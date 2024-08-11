import { type DocsLayoutProps } from '@lingsquare/docs-ui/layout';
import { type HomeLayoutProps } from '@lingsquare/docs-ui/home-layout';
import { pageTree } from '@/app/source';

// shared configuration
export const baseOptions: HomeLayoutProps = {
  nav: {
    title: 'LingSquare Docs',
  }
};

// docs layout configuration
export const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: pageTree,
};

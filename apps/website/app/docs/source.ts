import { map } from '@/.map';
import { createMDXSource } from 'fumadocs-mdx';
import { loader } from '@lingsquare/docs-core/source';

export const { getPage, getPages, pageTree } = loader({
  baseUrl: '/docs',
  rootDir: 'docs',
  source: createMDXSource(map),
});

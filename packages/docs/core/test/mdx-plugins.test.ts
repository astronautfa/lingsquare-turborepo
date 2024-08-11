import { expect, test } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { remark } from 'remark';
import {
  remarkAdmonition,
  remarkHeading,
  remarkStructure,
} from '@/mdx-plugins';
import { fileURLToPath } from 'node:url';
import remarkMdx from 'remark-mdx';

const cwd = path.dirname(fileURLToPath(import.meta.url));

test('Remark Heading', async () => {
  const file = path.resolve(cwd, './fixtures/remark-heading.md');
  const content = readFileSync(file);

  const result = await remark().use(remarkHeading).process(content);

  expect(result.data.toc).toMatchFileSnapshot(
    path.resolve(cwd, './fixtures/remark-heading.output.json'),
  );
});

test('Remark Structure', async () => {
  const content = readFileSync(
    path.resolve(cwd, './fixtures/remark-structure.md'),
  );
  const result = await remark().use(remarkStructure).process(content);

  expect(result.data.structuredData).toMatchFileSnapshot(
    path.resolve(cwd, './fixtures/remark-structure.output.json'),
  );
});

test('Remark Admonition', async () => {
  const content = readFileSync(
    path.resolve(cwd, './fixtures/remark-admonition.md'),
  );
  const result = await remark()
    .use(remarkAdmonition)
    .use(remarkMdx)
    .process(content);

  expect(result.value).toMatchFileSnapshot(
    path.resolve(cwd, './fixtures/remark-admonition.output.mdx'),
  );
});

import nextra from 'nextra';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));

const withNextra = nextra({
  contentDirBasePath: '/docs',
});

export default withNextra({
  images: {
    unoptimized: true,
  },
  output: 'export',
  turbopack: {
    root,
  },
});

import { DocsLayout } from '@lingsquare/docs-ui/layout';
import type { ReactNode } from 'react';
import { docsOptions } from './layout.config';
import { RootProvider } from '@lingsquare/docs-ui/provider';


export default function Layout({ children }: { children: ReactNode }) {
  return (<RootProvider>
    <DocsLayout {...docsOptions}>{children}
    </DocsLayout>
  </RootProvider>);
}

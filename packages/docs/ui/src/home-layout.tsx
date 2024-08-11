import { replaceOrDefault } from '@/utils/shared';
import { getLinks, type BaseLayoutProps } from '@/layout.shared';

declare const { Nav }: typeof import('./home-layout.client');

export type HomeLayoutProps = BaseLayoutProps;

export function HomeLayout({
  nav = {},
  links = [],
  githubUrl,
  children,
}: BaseLayoutProps): React.ReactElement {
  const finalLinks = getLinks(links, githubUrl);

  return (
    <>
      {replaceOrDefault(
        nav,
        <Nav items={finalLinks} {...nav}>
          {nav.children}
        </Nav>,
      )}
      {children}
    </>
  );
}

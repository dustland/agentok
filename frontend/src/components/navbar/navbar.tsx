'use client';

import { usePathname } from 'next/navigation';
import { match } from 'path-to-regexp';

import { AuthButton } from './auth-button';
import { Logo } from '../logo';
import { NavButton } from './nav-button';
import { ProjectPicker } from '../project/project-picker';
import Link from 'next/link';
import { Icons } from '../icons';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { ChatPicker } from '../chat/chat-picker';

export const NAV_MENU_ITEMS = [
  {
    id: 'tools',
    label: 'Tools',
    icon: Icons.tool,
    href: `/tools`,
  },
  {
    id: 'discover',
    label: 'Discover',
    icon: Icons.compass,
    href: '/discover',
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const [githubUrl, setGithubUrl] = useState(
    'https://img.shields.io/github/stars/dustland/agentok?style=social&logo=github'
  );

  useEffect(() => {
    setGithubUrl(
      resolvedTheme === 'dark'
        ? 'https://img.shields.io/github/stars/dustland/agentok?style=flat&logo=github&color=black&labelColor=gray&label=Stars'
        : 'https://img.shields.io/github/stars/dustland/agentok?style=social&logo=github'
    );
  }, [resolvedTheme]);

  // Create a matcher function
  const matchPath = match<{
    projectId: string;
    feature?: string;
    sub?: string;
  }>('/projects/:projectId/:feature/:sub');

  // Execute the matcher
  const result = matchPath(pathname);
  const projectId = result ? parseInt(result.params.projectId, 10) : null;

  const pathSegments = pathname ? pathname.split('/').filter((p) => p) : []; // filter to remove any empty strings caused by leading/trailing slashes
  const isActive = (href: string) => {
    const hrefSegments = href.split('/').filter((p) => p);
    // Match the number of segments in the item's href
    return (
      pathSegments.length >= hrefSegments.length &&
      hrefSegments.every((seg, i) => seg === pathSegments[i])
    );
  };

  return (
    <div className="sticky top-0 z-40 flex h-[var(--header-height)] w-full items-center justify-between border-b bg-background/85 px-3 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="navbar-start flex items-center justify-start gap-2">
        <NavButton projectId={projectId} className="lg:hidden" />
        <Link href="/projects" className="flex items-center gap-2">
          <Logo className="w-7 h-7 text-primary/70 mr-2" />
          <span className="font-mono font-semibold text-primary/90">Agentok</span>
        </Link>
      </div>
      <div className="flex min-w-0 items-center gap-3 px-2 text-muted-foreground lg:gap-5">
        <ProjectPicker
          className={cn({ 'text-primary': isActive('/projects') })}
        />
        <ChatPicker className={cn({ 'text-primary': isActive('/chats') })} />
        {NAV_MENU_ITEMS.map((item) => {
          return (
            <Link
              role="tab"
              key={item.id}
              href={item.href}
              className={cn(
                'flex items-center gap-1.5 py-1 text-sm font-medium hover:text-primary',
                {
                  'text-primary': isActive(item.href),
                },
                'hidden lg:flex'
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="https://github.com/dustland/agentok"
          aria-label="github"
          target="_blank"
          className="hidden lg:block"
        >
          <img src={githubUrl} alt="github" className="h-5" />
        </Link>
        <AuthButton />
      </div>
    </div>
  );
};

export default Navbar;

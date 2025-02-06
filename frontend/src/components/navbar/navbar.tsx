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
    <div className="flex w-full items-center justify-between p-2 h-[var(--header-height)] border-b">
      <div className="navbar-start gap-2 flex items-center justify-start">
        <NavButton projectId={projectId} className="lg:hidden" />
        <Link href="/projects" className="flex items-center">
          <Logo className="w-7 h-7 text-primary/70 mr-2" />
          <span className="text-brand font-mono">Agentok</span>
        </Link>
      </div>
      <div className="flex px-2 items-center gap-4 lg:gap-6 text-muted-foreground">
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
                'flex items-center text-sm py-1 gap-1.5 hover:text-primary font-medium',
                {
                  'text-primary': isActive(item.href),
                },
                'hidden lg:flex'
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
      <div className="flex items-center gap-4">
        <Link
          href="https://github.com/dustland/agentok"
          aria-label="github"
          target="_blank"
          className="hidden md:block"
        >
          <img src={githubUrl} alt="github" className="h-5" />
        </Link>
        <AuthButton />
      </div>
    </div>
  );
};

export default Navbar;

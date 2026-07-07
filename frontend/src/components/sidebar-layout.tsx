import { PropsWithChildren } from 'react';
import { Sidebar, SidebarItem } from './sidebar';
import { cn } from '@/lib/utils';

type SidebarLayoutProps = {
  pathPrefix?: string;
  sidebarItems: SidebarItem[];
};

const SidebarLayout = ({
  pathPrefix,
  sidebarItems,
  children,
}: PropsWithChildren<SidebarLayoutProps>) => {
  return (
    <div
      className={cn(
        'flex h-[calc(100vh-var(--header-height))] w-full gap-3 overflow-hidden p-2 md:p-3'
      )}
    >
      <Sidebar
        items={sidebarItems}
        pathPrefix={pathPrefix}
        className="rounded-2xl border bg-card/70 p-2 shadow-sm"
      />
      <div className="app-surface flex h-full w-full flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default SidebarLayout;

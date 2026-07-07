import SidebarLayout from '@/components/sidebar-layout';
import { PropsWithChildren } from 'react';
import { settingList } from './settings';
import Navbar from '@/components/navbar/navbar';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-screen w-full flex-col bg-background">
      <Navbar />
      <SidebarLayout sidebarItems={settingList}>{children}</SidebarLayout>
    </div>
  );
};

export default Layout;

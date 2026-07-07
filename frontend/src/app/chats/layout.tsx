'use client';

import Navbar from '@/components/navbar/navbar';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { ChatList } from '@/components/chat/chat-list';

export default function ChatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen flex-col bg-background">
      <Navbar />
      <div className="h-[calc(100vh-var(--header-height))] overflow-hidden p-2 md:p-3">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel
            defaultSize={24}
            minSize={18}
            maxSize={32}
            className="h-full min-w-[220px]"
          >
            <div className="flex h-full flex-col rounded-2xl border bg-card/70 shadow-sm">
              <div className="border-b px-4 py-3">
                <h1 className="text-sm font-semibold">Chats</h1>
                <p className="text-xs text-muted-foreground">
                  Recent conversations and their current status.
                </p>
              </div>
              <ChatList />
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={76}>
            <div className="h-full overflow-hidden rounded-2xl border bg-card/50 shadow-sm">
              {children}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

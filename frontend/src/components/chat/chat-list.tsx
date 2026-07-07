'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Card } from '../ui/card';
import { useChats } from '@/hooks';
import { ScrollArea } from '../ui/scroll-area';

interface ChatListProps {
  className?: string;
}

export const ChatList = ({ className }: ChatListProps) => {
  const router = useRouter();
  const {
    activeChatId,
    setActiveChatId,
    chats,
    updateChat,
    isUpdating,
    deleteChat,
    isDeleting,
  } = useChats();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleEditName = useCallback(
    async (chatId: number) => {
      if (!editingName.trim()) return;
      try {
        await updateChat(chatId, { name: editingName });
      } catch (error) {
        console.error('Error updating chat name:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to update chat name',
        });
        return;
      }
      setEditingId(null);
      setEditingName('');
    },
    [editingName, updateChat]
  );

  const handleDeleteChat = useCallback(
    async (chatId: number) => {
      try {
        const chatIndex = chats.findIndex((chat) => chat.id === chatId);
        const newChatId =
          chatIndex === chats.length - 1
            ? chats[chatIndex - 1]?.id
            : chats[chatIndex + 1]?.id;

        await deleteChat(chatId);

        if (activeChatId === chatId) {
          router.replace(newChatId ? `/chats/${newChatId}` : '/chats');
        }
      } catch (error) {
        console.error('Error deleting chat:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to delete chat',
        });
      }
    },
    [deleteChat, chats, activeChatId, router]
  );

  const handleSelectChat = useCallback(
    (chatId: number) => {
      setActiveChatId(chatId);
      router.push(`/chats/${chatId}`);
    },
    [setActiveChatId, router]
  );

  return (
    <ScrollArea className={cn('h-full w-full', className)}>
      {chats.length === 0 ? (
        <div className="flex h-full w-full items-center justify-center p-6">
          <div className="text-sm text-muted-foreground">No chats yet</div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 p-2">
          {chats.map((chat) => (
            <Card
              key={chat.id}
              onClick={() => handleSelectChat(chat.id)}
              className={cn(
                'relative cursor-pointer rounded-xl border bg-background/70 p-3 shadow-none transition-colors',
                'hover:border-primary/30 hover:bg-accent/70',
                activeChatId === chat.id &&
                  'border-primary/40 bg-primary/8 ring-1 ring-primary/20'
              )}
            >
              {editingId === chat.id ? (
                <div className="flex flex-1 items-center gap-1">
                  <Input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleEditName(chat.id);
                      } else if (e.key === 'Escape') {
                        setEditingId(null);
                        setEditingName('');
                      }
                    }}
                    className="h-7 w-full text-xs outline-none"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-7 h-7"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditName(chat.id);
                    }}
                  >
                    <Icons.check className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="group flex min-w-0 flex-1 flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="line-clamp-1 min-w-0 text-sm font-medium">
                      {chat.name ||
                        `Chat with ${chat.from_project || chat.from_template}`}
                    </span>
                    <span className="shrink-0 rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                      {chat.status || 'ready'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                    <span className="line-clamp-1 min-w-0">
                      {chat.from_project
                        ? `Project #${chat.from_project}`
                        : chat.from_template
                          ? `Template #${chat.from_template}`
                          : 'No source'}
                    </span>
                    <span className="shrink-0">
                      {chat.updated_at
                        ? new Date(chat.updated_at).toLocaleDateString()
                        : ''}
                    </span>
                  </div>
                  <div
                    className={cn(
                      'absolute right-2 top-2 hidden items-center gap-1 rounded-lg border bg-background/95 p-1 shadow-sm group-hover:flex'
                    )}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingId(chat.id);
                        setEditingName(chat.name || '');
                      }}
                    >
                      {isUpdating ? (
                        <Icons.spinner className="w-3 h-3 animate-spin" />
                      ) : (
                        <Icons.edit className="w-3 h-3" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteChat(chat.id);
                      }}
                    >
                      {isDeleting ? (
                        <Icons.spinner className="w-3 h-3 animate-spin text-red-500" />
                      ) : (
                        <Icons.trash className="w-3 h-3 text-red-500" />
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </ScrollArea>
  );
};

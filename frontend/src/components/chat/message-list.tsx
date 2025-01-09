'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { stripMatch } from '@/lib/re';
import { StatusMessage } from '@/lib/chat';
import { Message } from '@/types/chat';
import { useChat, useUser } from '@/hooks';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Markdown } from '@/components/markdown';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  chat: any;
  message: Message;
  onSend: (content: string) => void;
  className?: string;
}

const MessageBubble = ({
  chat,
  message,
  onSend,
  className,
}: MessageBubbleProps) => {
  const { chatSource } = useChat(chat.id);
  const { user } = useUser();

  const userNodeName =
    chatSource?.flow?.nodes?.find(
      (node: any) =>
        node.data.type === 'UserProxyAgent' ||
        node.data.type === 'RetrieveUserProxyAgent' ||
        node.data.name.includes('User')
    )?.data?.name ?? '';
  let waitForHumanInput = false;

  // End of thinking
  if (message.content.startsWith(StatusMessage.completed)) {
    const { found, text } = stripMatch(
      message.content,
      StatusMessage.completed
    );
    const success = found && text.startsWith('DONE');
    const resultClass = success
      ? 'bg-green-500/20 text-green-500'
      : 'bg-red-500/20 text-red-500';

    return (
      <Card
        className={cn(
          'flex flex-col items-start gap-2 shadow-sm px-3 py-1 rounded-md',
          resultClass,
          className
        )}
      >
        <div className="flex items-center gap-2">
          {success ? (
            <Icons.checkCircle className="w-4 h-4" />
          ) : (
            <Icons.alert className="w-4 h-4" />
          )}
          <span className="text-sm font-semibold">
            Collaboration completed with {success ? 'success' : 'failure'}.
          </span>
        </div>
        {!success && <span className="text-xs text-red-500">{text}</span>}
      </Card>
    );
  } else if (message.content.startsWith(StatusMessage.running)) {
    return (
      <Card
        className={cn(
          'flex items-center gap-2 shadow-sm px-3 py-1 bg-blue-500/20 text-blue-500 rounded-md',
          className
        )}
      >
        <Icons.group className="w-4 h-4" />
        <span className="text-sm font-semibold">Collaboration started...</span>
      </Card>
    );
  } else if (message.content.startsWith(StatusMessage.receivedHumanInput)) {
    message.content = 'Human input received';
  } else if (message.content.startsWith(StatusMessage.waitForHumanInput)) {
    const { text } = stripMatch(
      message.content,
      StatusMessage.waitForHumanInput
    );
    message.content = text ?? 'Waiting for human input...';
    waitForHumanInput = true;
  }

  const messageClass = waitForHumanInput
    ? 'bg-yellow-600/20 text-yellow-600'
    : message.type === 'assistant'
      ? 'bg-background text-primary'
      : 'bg-green-300/20 text-green-500';

  let avatarIcon = <Icons.agent className="w-4 h-4" />;
  if (message.type === 'user') {
    avatarIcon = (
      <Avatar>
        <AvatarImage src={user?.user_metadata.avatar_url} />
        <AvatarFallback>
          <Icons.userVoiceLine className="w-4 h-4" />
        </AvatarFallback>
      </Avatar>
    );
  } else if (message.sender === userNodeName) {
    avatarIcon = <Icons.userVoiceFill className="w-5 h-5" />;
  }

  let messageHeader = null;
  if (waitForHumanInput) {
    messageHeader = (
      <div className="flex items-center gap-2">Waiting for human input...</div>
    );
  } else if (message.sender) {
    messageHeader = (
      <div className="chat-header flex items-end gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          {message.sender}
          {message.receiver && (
            <>
              <Icons.chevronRight className="w-3 h-3 inline-block" />
              <span className="">{message.receiver}</span>
            </>
          )}
        </div>
        <div className="text-muted-foreground text-xs line-clamp-1">
          {new Date(message.created_at).toLocaleString()}
        </div>
      </div>
    );
  }

  return (
    <Card
      className={cn(messageClass, 'p-1 w-full mx-auto shadow-sm', className)}
    >
      <div className="flex items-center gap-1 px-1">
        <div
          className={`w-8 h-8 rounded-full text-sm flex items-center justify-center`}
        >
          {avatarIcon}
        </div>
        <div className="flex flex-1">{messageHeader}</div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="w-5 h-5">
              <Icons.code className="w-3 h-3" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[calc(100vh-2rem)] overflow-hidden p-0 gap-0">
            <DialogTitle className="text-sm font-semibold px-2 py-3 border-b">
              Raw Message Content {message.type}
            </DialogTitle>
            <ScrollArea className="max-h-[calc(100vh-var(--header-height))] text-sm bg-muted/20">
              <pre className="whitespace-pre-wrap p-2">
                <code>{message.content}</code>
              </pre>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
      <div
        className={`relative group rounded-md p-2 text-sm break-word word-wrap overflow-x-hidden`}
      >
        {message.content ? (
          <Markdown>{message.content}</Markdown>
        ) : (
          <span className="text-lime-600">(no content)</span>
        )}
        {message.type === 'user' && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 absolute right-7 bottom-1"
            onClick={() => onSend(message.content)}
          >
            <Icons.refresh className="w-4 h-4 text-gray-200/20 hover:text-gray-200" />
          </Button>
        )}
      </div>
    </Card>
  );
};

interface MessageListProps {
  chat: any;
  messages: Message[];
  className?: string;
  onSend: (content: string) => void;
}

export const MessageList = ({
  chat,
  messages,
  onSend,
  className,
}: MessageListProps) => {
  return (
    <>
      {messages.map((message, index) => (
        <MessageBubble
          key={message.id || index}
          chat={chat}
          message={message}
          onSend={onSend}
          className={className}
        />
      ))}
    </>
  );
};

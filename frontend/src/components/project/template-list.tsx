import { useChats, useProjects, useTemplates } from '@/hooks';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Markdown } from '@/components/markdown';
import { useUser } from '@/hooks/use-user';
import { Icons } from '@/components/icons';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export const TemplateEmpty = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col gap-2 items-center text-base-content/60">
        <Icons.inbox className="w-12 h-12" />
        <div className="mt-2 text-sm">No templates found</div>
      </div>
    </div>
  );
};

export const TemplateLoading = () => {
  return (
    <div className="flex w-full flex-wrap justify-center gap-4">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="w-80 h-96 flex flex-col overflow-hidden gap-3">
          <Skeleton className="w-full h-48 rounded-none shrink-0" />
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Skeleton className="w-6 h-6 rounded-full shrink-0" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <Skeleton className="h-3 w-full mb-3" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </Card>
      ))}
    </div>
  );
};

export const TemplateCard = ({
  template,
  index,
  className,
  suppressLink,
}: any) => {
  const { userId } = useUser();
  const [isOwned, setIsOwned] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const { deleteTemplate, isDeleting } = useTemplates();
  const { forkProject, isForking } = useProjects();
  const { createChat, isCreating } = useChats();
  const router = useRouter();
  const config = template.flow?.nodes?.find(
    (node: any) => node.type === 'config'
  );
  let templateDescription = '';
  if (template.description) {
    templateDescription = template.description;
  } else if (config?.data?.flow_description) {
    templateDescription = config.data.flow_description;
  } else {
    templateDescription = `Default description, ${template.flow.nodes.length} nodes, ${template.flow?.edges?.length ?? 0} edges`;
  }
  useEffect(() => {
    setIsAuthed(userId !== null);
    setIsOwned(template.user_id === userId);
  }, [template, userId]);
  const handleDelete = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    deleteTemplate(template.id);
  };
  const handleFork = async (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    const forkedProject = await forkProject(template);
    if (forkedProject) {
      router.push(`/projects/${forkedProject.id}`);
    }
  };
  const handleChat = async (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    await createChat(template.id, 'template')
      .then((chat) => {
        if (chat) {
          router.push(`/chats/${chat.id}`);
        }
      })
      .catch((e) => {
        console.log(e);
        toast({
          title: 'Error',
          description: `Failed to create chat: ${e}`,
          variant: 'destructive',
        });
      });
  };
  const randomImage = [
    'api',
    'knowledge',
    'rag',
    'flow',
    'random-1',
    'random-2',
    'random-3',
    'random-4',
    'random-5',
    'random-6',
    'random-7',
    'random-8',
  ][index % 12];
  const ConditionalLink = ({ children, className }: any) => {
    if (suppressLink) {
      return <Card className={className}>{children}</Card>;
    } else {
      return (
        <Link href={`/discover/${template.id}`}>
          <Card className={className}>{children}</Card>
        </Link>
      );
    }
  };
  return (
    <ConditionalLink
      className={cn(
        'group card flex flex-col justify-between h-full w-80 border',
        className
      )}
    >
      <figure>
        <img
          src={
            template.thumbnail ?? `https://agentok.ai/img/${randomImage}.png`
          }
          alt={template.name}
          className="rounded-t-xl h-48 w-full object-cover"
        />
      </figure>
      <div className="flex flex-col p-4 gap-1">
        <h2 className="text-lg font-bold group-hover:text-primary line-clamp-1">
          {template.name}
        </h2>
        <div className="flex gap-2 h-8 items-center text-xs text-base-content/60">
          {template.avatar_url ? (
            <img
              src={template.avatar_url ?? '/logo-spaced.png'}
              height={24}
              width={24}
              alt="owner"
              className="w-6 h-6 rounded-full"
            />
          ) : (
            <div className="w-6 h-6 rounded-full shrink-0 bg-base-content/20 flex items-center justify-center">
              <Icons.heart className="w-4 h-4 text-base-content" />
            </div>
          )}
          {template.full_name ?? template.email ?? ''}
        </div>
        <div className="text-xs text-base-content/40">
          {new Date(template.created_at).toLocaleString()}
        </div>
        <Markdown
          suppressLink={!suppressLink}
          className="text-left text-sm h-20 break-word word-wrap line-clamp-4 flex-1"
        >
          {templateDescription}
        </Markdown>
        {isAuthed && (
          <div className="relative flex items-center justify-end gap-2 text-xs">
            <Button
              variant="default"
              size="sm"
              className="flex items-center gap-1"
              onClick={handleChat}
            >
              <Icons.robot
                className={clsx('w-4 h-4', {
                  'animate-spin': isCreating,
                })}
              />
              Start chat
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={handleFork}
            >
              <Icons.gitFork
                className={clsx('w-4 h-4', { 'animate-spin': isForking })}
              />
              Fork
            </Button>
            {isOwned && (
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={handleDelete}
              >
                <Icons.trash
                  className={clsx('w-4 h-4', {
                    'loading loading-xs': isDeleting,
                  })}
                />
              </Button>
            )}
          </div>
        )}
      </div>
    </ConditionalLink>
  );
};

export const TemplateList = ({ maxCount }: any) => {
  const { templates, isLoading, isError } = useTemplates();

  if (isError) {
    console.warn('Failed to load template');
  }
  if (isLoading) return <TemplateLoading />;
  if (!templates || templates.length === 0) return <TemplateEmpty />;

  const slicedTemplates =
    maxCount > 0 ? templates.slice(0, maxCount) : templates;
  return (
    <div className="flex flex-wrap justify-center gap-4 p-2">
      {slicedTemplates.map((template: any, index: number) => (
        <TemplateCard key={template.id} template={template} index={index} />
      ))}
    </div>
  );
};

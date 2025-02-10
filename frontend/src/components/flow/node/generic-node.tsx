'use client';

import {
  Handle,
  Position,
  HandleType,
  NodeProps,
  NodeToolbar,
  useReactFlow,
} from '@xyflow/react';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { ComponentType, PropsWithChildren } from 'react';
import { getNodeIcon } from '@/lib/flow';
import { Button } from '@/components/ui/button';

export type GenericNodeProps = PropsWithChildren<NodeProps> & {
  ports?: { type: HandleType; name?: string }[];
  nodeClass?: string;
  className?: string;
};

export const GenericNode: ComponentType<GenericNodeProps> = ({
  id,
  data,
  selected,
  ports = [],
  children,
}: GenericNodeProps) => {
  const NodeIcon = getNodeIcon(data.id as string);
  const instance = useReactFlow();
  return (
    <div
      className={cn(
        'group relative flex flex-col text-muted-foreground/80 border-muted-foreground/80 bg-muted min-w-24 gap-2 p-4 rounded-xl border-2',
        'transition-colors duration-300',
        {
          'border-brand/80 text-brand/80 hover:border-brand hover:text-brand ':
            selected,
          'hover:border-muted-foreground hover:text-muted-foreground':
            !selected,
        }
      )}
    >
      <NodeToolbar isVisible={selected} position={Position.Top} align={'end'}>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => instance.deleteElements({ nodes: [{ id }] })}
        >
          <Icons.trash className="w-4 h-4" />
        </Button>
      </NodeToolbar>
      <div className="flex flex-col items-center gap-2 flex-grow">
        <NodeIcon className="w-10 h-10" />
        <span className="text-sm font-bold">{data.name as string}</span>
      </div>
      {ports.map(({ type, name }) => (
        <Handle
          key={`${type}-${name}`}
          type={type}
          position={type === 'target' ? Position.Left : Position.Right}
          id={`${type}-${name}`}
          className={cn(
            '!w-2 !h-2 !rounded-full !border-2 !bg-background',
            selected ? '!border-brand/80' : '!border-muted-foreground/80'
          )}
        />
      ))}
    </div>
  );
};

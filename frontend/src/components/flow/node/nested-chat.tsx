'use client';

import { ComponentType } from 'react';
import { NodeProps } from '@xyflow/react';
import { GenericNode } from './generic-node';
import { GenericOption } from '../option/option';

export const NestedChat: ComponentType<NodeProps> = ({
  id,
  data,
  selected,
  type,
  ...props
}: NodeProps) => {
  return (
    <GenericNode
      {...props}
      id={id}
      data={data}
      selected={selected}
      type={type}
      ports={[
        { type: 'target', name: '' },
        { type: 'source', name: '' },
      ]}
    >
      <GenericOption
        type="text"
        nodeId={id}
        data={data}
        selected={selected}
        name="instructions"
        label="Instructions"
        placeholder="Enter instructions for the nested chat..."
        className="min-h-[100px]"
      />
      <GenericOption
        type="check"
        nodeId={id}
        data={data}
        selected={selected}
        name="use_default_instructions"
        label="Use default instructions"
      />
    </GenericNode>
  );
};

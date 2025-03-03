import { AssistantNode } from '@/components/flow/node/assistant';
import { UserProxyAgent } from '@/components/flow/node/user';
import { GroupNode } from '@/components/flow/node/group';
import { NoteNode } from '@/components/flow/node/note';

import { Node, ReactFlowInstance, NodeTypes } from '@xyflow/react';
import { genId } from '@/lib/id';
import { ConversableAgent } from '@/components/flow/node/conversable-agent';
import { InitializerNode } from '@/components/flow/node/initializer';
import { ConverseEdge } from '@/components/flow/edge/converse-edge';
import { GPTAssistantNode } from '@/components/flow/node/gpt-assistant';
import { RetrieveUserProxyAgent } from '@/components/flow/node/retrieve-user';
import { RetrieveAssistantNode } from '@/components/flow/node/retrieve-assistant';
import { CaptainAgentNode } from '@/components/flow/node/captain';
import { WebSurferNode } from '@/components/flow/node/websurfer';
import { Icons } from '@/components/icons';
import { ElementType } from 'react';
import { DeepSeekNode } from '@/components/flow/node/deepseek';
export const nodeTypes: NodeTypes = {
  initializer: InitializerNode,
  assistant: AssistantNode,
  user: UserProxyAgent,
  groupchat: GroupNode,
  note: NoteNode,
  conversable: ConversableAgent,
  captain: CaptainAgentNode,
  websurfer: WebSurferNode,
  deepseek: DeepSeekNode,
  gpt_assistant: GPTAssistantNode,
  retrieve_user: RetrieveUserProxyAgent,
  retrieve_assistant: RetrieveAssistantNode,
} as const;

export const edgeTypes = {
  converse: ConverseEdge,
};

export const isConversable = (node?: Node) =>
  node?.type &&
  [
    'assistant',
    'user',
    'conversable',
    'groupchat',
    'nestedchat',
    'gpt_assistant',
    'retrieve_assistant',
    'retrieve_user',
    'websurfer',
  ].includes(node.type);

// Fields of Node Meta:
// - name: To be used as variable name in generated code
// - label: Shown on UI, the value is the key for i18n
// - type: 'conversable' | 'assistant' | 'user' | 'group', indicates the classes for code generation
// - (description): UI will look for value of label + '-description', for example 'assistant-description'
export type NodeMeta = {
  id: string;
  name: string;
  description?: string;
  icon?: ElementType;
  class_type: string; // class name for code generation
  width?: number;
  height?: number;
  data?: { [key: string]: any };
};

export const basicNodes: NodeMeta[] = [
  {
    id: 'initializer',
    icon: Icons.rocket,
    name: 'Initializer',
    description: 'The first node in the flow',
    class_type: 'Initializer',
  },
  {
    id: 'conversable',
    icon: Icons.robot,
    name: 'Agent',
    description: 'A Conversable Agent',
    class_type: 'ConversableAgent',
  },
  {
    id: 'user',
    icon: Icons.user,
    name: 'User',
    description: 'A User Proxy Agent',
    class_type: 'UserProxyAgent',
  },
  {
    id: 'assistant',
    icon: Icons.agent,
    name: 'Assistant',
    description: 'An Assistant Agent',
    class_type: 'AssistantAgent',
  },
  {
    id: 'groupchat',
    icon: Icons.group,
    name: 'Group',
    description: 'Group several agents together',
    class_type: 'GroupChat',
    width: 400,
    height: 300,
  },
  {
    id: 'note',
    icon: Icons.note,
    name: 'Note',
    description: 'Work as comment for the flow and node',
    class_type: 'Note',
    width: 400,
    height: 200,
  },
];

export const advancedNodes: NodeMeta[] = [
  {
    id: 'captain',
    icon: Icons.agent,
    name: 'Captain',
    description: 'An agent enhanced to break down and solve complex tasks',
    class_type: 'CaptainAgent',
  },
  {
    id: 'websurfer',
    icon: Icons.globe,
    name: 'Web Surfer',
    description: 'A WebSurfer Agent',
    class_type: 'WebSurferAgent',
  },
  {
    id: 'deepseek',
    icon: Icons.deepseek,
    name: 'DeepSeek',
    description: 'A DeepSeek Agent',
    class_type: 'AssistantAgent',
    data: {
      enable_llm: true,
      model_id: 'deepseek-chat',
    },
  },
  // {
  //   id: 'retrieve_assistant',
  //   icon: Icons.robot,
  //   name: 'RetrieveAssistant',
  //   description: 'A Retrieve Assistant Agent',
  //   class_type: 'RetrieveAssistantAgent',
  // },
  // {
  //   id: 'retrieve_user',
  //   icon: Icons.search,
  //   name: 'RetrieveUserProxy',
  //   description: 'A Retrieve User Proxy Agent',
  //   class_type: 'RetrieveUserProxyAgent',
  // },
  // {
  //   id: 'gpt_assistant',
  //   icon: Icons.openai,
  //   name: 'GPTAssistant',
  //   description: 'A GPT Assistant Agent',
  //   class_type: 'GPTAssistantAgent',
  // },
  // {
  //   id: 'multimodal',
  //   icon: Icons.Eye,
  //   name: 'MultimodalAssistant',
  //   class_type: 'MultimodalConversableAgent',
  // },
  // {
  //   id: 'llava',
  //   icon: Icons.Meta,
  //   name: 'LLaVA',
  //   class_type: 'LLaVAAgent',
  // },
  // {
  //   id: 'math_user_proxy',
  //   icon: Icons.User4,
  //   name: 'MathUserProxyAgent',
  //   class_type: 'MathUserProxyAgent',
  // },
];

const allNodes = [...basicNodes, ...advancedNodes];

export const getNodeIcon = (type: string) => {
  const nodeMeta = allNodes.find((node) => node.id === type);
  return nodeMeta?.icon || Icons.question;
};
  
export const setNodeData = (
  instance: ReactFlowInstance,
  id: string,
  dataset: { [key: string]: any },
  scope: string = ''
) => {
  const nodes = instance.getNodes();
  instance.setNodes(
    nodes.map((node: any) => {
      if (node.id === id) {
        if (scope) {
          node.data = {
            ...node.data,
            [scope]: { ...node.data[scope], ...dataset },
          };
        } else node.data = { ...node.data, ...dataset };
      }
      return node;
    })
  );
};

export const setEdgeData = (
  instance: ReactFlowInstance,
  id: string,
  dataset: { [key: string]: any },
  scope: string = ''
) => {
  const edges = instance.getEdges();
  instance.setEdges(
    edges.map((edge: any) => {
      if (edge.id === id) {
        if (scope) {
          edge.data = {
            ...edge.data,
            [scope]: { ...edge.data[scope], ...dataset },
          };
        } else edge.data = { ...edge.data, ...dataset };
      }
      return edge;
    })
  );
};

export const getFlowName = (nodes: Node[]) => {
  const configNode = nodes.find((node: any) => node.type === 'config');
  let name = 'flow-unknown';
  if (configNode && configNode?.data.flow_name) {
    name = configNode.data.flow_name as string;
  } else {
    name = 'flow-' + genId();
  }
  return name;
};

export const getFlowDescription = (nodes: Node[]) => {
  const configNode = nodes.find((node: any) => node.type === 'config');
  let description = '';
  if (configNode && configNode?.data.flow_description) {
    description = configNode.data.flow_description as string;
  }
  return description;
};

export const isFlowDirty = (flow1: any, flow2: any) =>
  !deepEqual(flow1, flow2, ['selected', 'dragging']);

export function deepEqual(obj1: any, obj2: any, ignoreKeys: string[] = []) {
  if (obj1 === obj2) {
    return true;
  }

  const keys1 = Object.keys(obj1).filter((key) => !ignoreKeys.includes(key));
  const keys2 = Object.keys(obj2).filter((key) => !ignoreKeys.includes(key));

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    const val1 = obj1[key];
    const val2 = obj2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !deepEqual(val1, val2, ignoreKeys)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }

  return true;
}

function isObject(object: any) {
  return object != null && typeof object === 'object';
}

export function formatData(data: any) {
  let markdown = '| Key | Value |\n| --- | --- |\n';
  Object.entries(data).map(
    ([key, value]) => (markdown += `| ${key} | ${value} |\n`)
  );
  return markdown;
}

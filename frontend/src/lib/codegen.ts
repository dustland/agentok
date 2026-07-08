import { Edge, Node } from '@xyflow/react';

/**
 * Legacy client-side snippet generator.
 * Production codegen runs on the API via Jinja2 templates (AG2 1.0).
 * Kept for notebooks / offline experiments only.
 */
export enum AgentTypes {
  user_proxy = 'UserProxyAgent',
  assistant = 'AssistantAgent',
  gpt_assistant = 'GPTAssistantAgent',
  image_agent = 'MultimodalConversableAgent',
  chat = 'Chat',
}

const genAssistantAgent = (node: Node) => {
  const name = node.data.name;
  return `
node_${node.id} = Agent(
  name="${name}",
  prompt="You are a helpful AI assistant.",
  config=default_config,
)
`;
};

const genConversableAgent = (node: Node) => {
  const name = node.data.name;
  return `
node_${node.id} = Agent(
  name="${name}",
  config=default_config,
)
`;
};

const genUserProxyAgent = (node: Node) => {
  const name = node.data.name;
  return `
node_${node.id} = Agent(
  name="${name}",
  hitl_hook=studio_hitl_hook,
  tools=[SandboxCodeTool(LocalEnvironment("coding"))],
)
`;
};

const codegenDict: Record<string, (node: Node) => string> = {
  UserProxyAgent: genUserProxyAgent,
  AssistantAgent: genAssistantAgent,
  GPTAssistantAgent: genAssistantAgent,
  MultimodalConversableAgent: genConversableAgent,
};

export const genEntry = (
  data: { nodes: Node[]; edges: Edge[] },
  message: string
) => {
  const { nodes, edges } = data;
  if (!nodes || nodes.length === 0 || !edges || edges.length === 0) {
    throw new Error('No nodes found or not connected');
  }
  const userProxy = nodes.find((node: any) => node.type === 'user');
  if (!userProxy) {
    throw new Error('chat node not found');
  }
  const chatEdges = edges.filter((edge: any) => edge.target === userProxy.id);
  const upsteamNodes = nodes.filter((node) =>
    chatEdges.find((edge) => edge.source === node.id)
  );

  if (!upsteamNodes || upsteamNodes.length === 0) {
    throw new Error('No upstream agents found');
  }

  let code = `import ag2
from ag2 import Agent
print(ag2.__version__)

`;

  code += `
from agentok_api.ag2_compat.config_loader import load_model_configs
from agentok_api.ag2_compat.hitl import studio_hitl_hook
from ag2.tools import SandboxCodeTool
from ag2.tools.sandbox import LocalEnvironment

model_configs = load_model_configs()
default_config = model_configs[0]

`;

  for (const node of nodes) {
    const generator = codegenDict[node.data.type as keyof typeof codegenDict];
    if (generator) {
      code += generator(node);
    }
  }

  code += `
# Prefer the server-side Jinja2 codegen (AG2 1.0 Hub + channels) for runnable flows.
# This client stub only sketches Agent construction.
print("""${message}""")
`;

  return code;
};

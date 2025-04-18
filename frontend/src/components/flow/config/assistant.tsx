import { ConversableAgentConfig } from './conversable-agent';

export const AssistantConfig = ({ nodeId, data, className, ...props }: any) => {
  return (
    <ConversableAgentConfig
      nodeId={nodeId}
      data={data}
      className={className}
      toolScene={'llm'}
      optionsDisabled={['enable_code_execution', 'human_input_mode']}
      {...props}
    />
  );
};

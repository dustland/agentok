import { GenericOption } from '../option/option';
import { ConversableAgentConfig } from './conversable-agent';

export const WebSurferConfig = ({ nodeId, data, className, ...props }: any) => {
  return (
    <ConversableAgentConfig
      nodeId={nodeId}
      data={data}
      className={className}
      optionsDisabled={[
        'system_message',
        'enable_llm',
        'enable_code_execution',
        'model_id',
        'human_input_mode',
        'max_consecutive_auto_reply',
        'termination_msg',
      ]}
      {...props}
    >
      <GenericOption
        type="select"
        nodeId={nodeId}
        data={data}
        name="web_tool"
        label="Web Tools (AG2 1.0)"
        options={[
          {
            value: 'web_search',
            label: 'WebSearchTool + WebFetchTool',
          },
          {
            value: 'browser_use',
            label: 'Legacy browser-use (unsupported)',
            disabled: true,
          },
        ]}
      />
    </ConversableAgentConfig>
  );
};

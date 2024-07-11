import clsx from 'clsx';
import { RiSettings3Line, RiUser5Fill } from 'react-icons/ri';
import { Handle, Position, useReactFlow } from 'reactflow';
import { getNodeIcon, getNodeLabel, setNodeData } from '../../utils/flow';
import Toolbar from './Toolbar';
import { useState } from 'react';
import EditButton from '@/components/EditButton';
import EditableText from '@/components/EditableText';
import UserConfig from '../option/UserConfig';
import { useTranslations } from 'next-intl';

const UserProxyAgent = ({ id, selected, data }: any) => {
  const [editingName, setEditingName] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const instance = useReactFlow();
  const t = useTranslations('node.User');
  const tNodeMeta = useTranslations('meta.node');
  const NodeIcon = getNodeIcon(data.type, selected);
  return (
    <div
      className={clsx(
        'p-2  rounded-md border min-w-[240px] backdrop-blur-sm',
        selected
          ? 'shadow-box shadow-indigo-500 bg-indigo-600/80 border-indigo-500'
          : 'bg-indigo-700/90 border-indigo-600'
      )}
    >
      <div className="flex flex-col w-full gap-2 text-sm">
        <div className="w-full flex items-center justify-between gap-2 text-primary">
          <div className="flex items-center gap-2 ">
            <NodeIcon className="w-5 h-5" />
            <div className="text-sm font-bold">
              {getNodeLabel(data.label, tNodeMeta)}
            </div>
          </div>
          <EditableText
            text={data.name}
            onChange={(name: any) => {
              setEditingName(false);
              setNodeData(instance, id, { name: name });
            }}
            onModeChange={(editing: any) => setEditingName(editing)}
            editing={editingName}
            className="text-xs text-base-content/80 text-right"
          />
        </div>
        <Toolbar
          nodeId={id}
          selected={selected}
          className="bg-indigo-600/80 border-indigo-500"
        >
          <div
            className="cursor-pointer hover:text-white"
            onClick={() => setShowOptions(show => !show)}
            data-tooltip-content={t('options')}
            data-tooltip-id="default-tooltip"
            data-tooltip-place="top"
          >
            <RiSettings3Line className="w-4 h-4" />
          </div>
          <EditButton
            editing={editingName}
            setEditing={setEditingName}
            defaultLabel={t('name-edit-tooltip')}
            editingLabel={t('name-edit-done-tooltip')}
          />
        </Toolbar>
        <div className="py-1">
          {t('start-chat-tooltip')}
          <span className="border border-base-content/50 text-base-content/50 rounded mx-1 p-1 font-bold">
            {t('start-chat')}
          </span>
        </div>
        <div className="divider my-0" />
        <div className="font-bold text-base-content/80">
          {t('system-message')}
        </div>
        <div className="text-xs text-base-content/60">
          <textarea
            value={data.system_message ?? ''}
            placeholder={t('system-message-placeholder')}
            className="nodrag nowheel textarea textarea-bordered textarea-sm w-full p-1 bg-transparent rounded resize-none"
            rows={2}
            onChange={e => {
              setNodeData(instance, id, { system_message: e.target.value });
            }}
          />
        </div>
        <div className="flex items-center text-sm justify-between gap-2">
          <div className="font-bold text-base-content/80">
            {t('max-consecutive-auto-reply')}
          </div>
          <input
            type="number"
            className="nodrag nowheel input input-bordered input-sm w-24 bg-transparent rounded"
            value={data.max_consecutive_auto_reply ?? 0}
            onChange={e => {
              setNodeData(instance, id, {
                max_consecutive_auto_reply: e.target.valueAsNumber,
              });
            }}
          />
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        className="w-16 !bg-primary"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-16 !bg-primary"
      />
      <UserConfig
        show={showOptions}
        nodeId={id}
        data={data}
        onClose={() => setShowOptions(false)}
        className="flex shrink-0 w-[640px] max-w-[80vw] max-h-[90vh]"
      />
    </div>
  );
};

export default UserProxyAgent;
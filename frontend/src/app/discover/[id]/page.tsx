'use client';

import { TemplateCard } from '@/components/project/template-list';
import { useTemplates } from '@/hooks';
import { use, useEffect, useState } from 'react';
import ReactFlow, { ReactFlowProvider, useStoreApi } from 'reactflow';
import 'reactflow/dist/style.css';
import { edgeTypes, nodeTypes } from '../../../lib/flow';
import Markdown from '@/components/markdown';
import clsx from 'clsx';
// Import icons from the new icons file
import { Icons } from '@/components/icons';

const FlowViewer = ({ template, className }: any) => {
  // Suppress error code 002
  // https://github.com/xyflow/xyflow/issues/3243
  const store = useStoreApi();
  if (process.env.NODE_ENV === 'development') {
    store.getState().onError = (code, message) => {
      if (code === '002') {
        return;
      }
      console.warn('Workflow warning:', code, message);
    };
  }

  if (!template?.project?.flow?.nodes) return null;

  return (
    <div className={clsx('relative w-full h-full', className)}>
      <ReactFlow
        nodes={template.project.flow.nodes}
        edges={template.project.flow.edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        proOptions={{ hideAttribution: true }}
      />
      <div className="absolute inset-0 rounded-xl w-full h-full flex items-start justify-center pointer-event-none bg-primary/10"></div>
    </div>
  );
};

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { templates, isLoading, isError } = useTemplates();
  const [template, setTemplate] = useState<any>();
  const [index, setIndex] = useState<number>(0);
  useEffect(() => {
    if (isLoading || !templates) return;
    if (id) {
      const intId = parseInt(id, 10);
      const index = templates.findIndex(
        (template: any) => template.id === intId
      );
      if (index >= 0) {
        setTemplate(templates[index]);
        setIndex(index);
      }
    }
  }, [id, templates, isLoading]);

  if (isLoading) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        <div className="loading loading-bars text-primary" />
      </div>
    );
  }

  if (isError || !template) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        {isError}
      </div>
    );
  }

  return (
    <div className="relative flex flex-col w-full h-full gap-2 p-4 overflow-y-auto items-center">
      <title>Template | Agentok Studio</title>
      <div className="flex flex-col items-center justify-center gap-2 text-sm p-2">
        <span className="text-5xl font-bold p-4">{template.name}</span>
        <span className="text-lg p-4 font-normal max-w-5xl">
          <Markdown>{template.description}</Markdown>
        </span>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center w-full gap-2 text-sm">
        <TemplateCard
          template={template}
          index={index}
          suppressLink
          className="w-full max-w-sm"
        />
        <ReactFlowProvider key="reactflow-template">
          <FlowViewer
            template={template}
            className="max-w-2xl min-h-[420px] bg-base-content/10 border border-base-content/5 rounded-xl"
          />
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default Page;
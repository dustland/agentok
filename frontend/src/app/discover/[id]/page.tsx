'use client';

import { TemplateCard } from '@/components/project/template-list';
import { useTemplates } from '@/hooks';
import { use, useEffect, useState } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { Markdown } from '@/components/markdown';
import { FlowPreview } from '@/components/flow/flow-preview';
const DiscoverPage = ({ params }: { params: Promise<{ id: string }> }) => {
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
    <div className="app-page">
      <title>Template | Agentok Studio</title>
      <div className="app-page-header items-center text-center">
        <span className="app-page-title">{template.name}</span>
        <div className="app-page-description max-w-4xl">
          <Markdown>{template.description}</Markdown>
        </div>
      </div>
      <div className="grid w-full gap-4 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
        <TemplateCard
          template={template}
          index={index}
          suppressLink
          className="h-full min-h-[420px] w-full"
        />
        <ReactFlowProvider key="reactflow-template">
          <FlowPreview
            template={template}
            className="min-h-[420px] rounded-2xl border bg-card/60 shadow-sm"
          />
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default DiscoverPage;

'use client';

import { TemplateList } from '@/components/project/template-list';

// standalone means this is not a child of Popover component
export default function Page() {
  return (
    <div className="app-page">
      <title>Discover | Agentok Studio</title>
      <div className="app-page-header">
        <span className="app-page-title">Discover Templates</span>
        <span className="app-page-description">
          Browse reusable workflows, preview their flow, and fork them into your
          own projects.
        </span>
      </div>
      <div className="app-surface p-4 md:p-6">
        <TemplateList action="project" />
      </div>
    </div>
  );
}

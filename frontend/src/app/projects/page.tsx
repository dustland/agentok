'use client';

import { useRouter } from 'next/navigation';
import { ProjectList } from '@/components/project/project-list';
import { initialEdges, initialNodes, useProjects } from '@/hooks';
import { toast } from '@/hooks/use-toast';
import { Icons } from '@/components/icons';
import Link from 'next/link';
import { TemplateList } from '@/components/project/template-list';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Page() {
  const router = useRouter();
  const { createProject, setActiveProjectId } = useProjects();
  useEffect(() => {
    setActiveProjectId(-1);
  }, []);
  const onCreateProject = async () => {
    const project = await createProject({
      id: -1, // Will be replaced by actual id from server side
      name: 'New Project',
      description: 'A new project with sample flow.',
      flow: {
        nodes: initialNodes,
        edges: initialEdges,
      },
    });
    if (!project) {
      toast({ title: 'Failed to create project' });
      return;
    }
    toast({ title: 'Project created. Now jumping to project page.' });
    router.push(`/projects/${project.id}`);
  };
  return (
    <div className="app-page">
      <title>Projects | Agentok Studio</title>
      <div className="app-page-header">
        <span className="app-page-title">Build Agentic Apps</span>
        <span className="app-page-description">
          Create, iterate, and share multi-agent workflows with a visual AG2
          studio.
        </span>
        <div>
          <Button size="lg" onClick={onCreateProject}>
            <Icons.project />
            Create New Project
          </Button>
        </div>
      </div>
      <div className="app-surface p-4 md:p-6">
        <ProjectList />
      </div>
      <div className="app-page-header items-center text-center">
        <span className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Or
        </span>
        <span className="text-2xl font-semibold">Start from a template</span>
        <span className="app-page-description">
          Browse proven workflows and fork one to get moving faster.
        </span>
      </div>
      <div className="app-surface p-4 md:p-6">
        <TemplateList maxCount={3} />
        <div className="mt-8 flex justify-center">
          <Link
            href="/discover"
            className="inline-flex items-center justify-center rounded-md border px-5 py-3 text-sm font-medium transition-colors hover:bg-accent"
          >
            Discover More Templates
          </Link>
        </div>
      </div>
    </div>
  );
}

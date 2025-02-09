import useSWR from 'swr';
import useProjectStore, { Project } from '@/store/projects';
import { useState, useCallback, useEffect, useRef } from 'react';
import { fetcher } from './fetcher';
import { ProjectTemplate } from '@/store/templates';
import { Node, Edge } from '@xyflow/react';

export const initialNodes: Node[] = [
  {
    id: '1001',
    type: 'initializer',
    data: {
      name: 'Initializer',
      id: 'initializer',
      class_type: 'Initializer',
      sample_messages: [
        'Write a poem based on recent headlines about Vancouver.',
      ],
    },
    position: { x: -133, y: 246 },
  },
  {
    id: '1',
    type: 'user',
    data: {
      name: 'User',
      id: 'user',
      class_type: 'UserProxyAgent',
      human_input_mode: 'NEVER',
      termination_msg: 'TERMINATE',
      enable_code_execution: true,
      max_consecutive_auto_reply: 10,
      tools: { execution: [172278707085517] },
    },
    position: { x: 271, y: 222 },
  },
  {
    id: '2',
    type: 'assistant',
    data: {
      name: 'Assistant',
      id: 'assistant',
      class_type: 'AssistantAgent',
      max_consecutive_auto_reply: 10,
      tools: { llm: [172278707085517] },
    },
    position: { x: 811, y: 216 },
  },
  {
    id: '998',
    type: 'note',
    data: {
      name: 'Note',
      id: 'note',
      class_type: 'Note',
      content:
        "Click **Chat** icon on the right bottom to show the chat pane, and in chat pane, select a sample question to start the conversation.",
    },
    position: { x: 87, y: 740 },
  },
];

export const initialEdges: Edge[] = [
  {
    id: '1001-1',
    source: '1001',
    target: '1',
  },
  {
    id: '1-2',
    source: '1',
    target: '2',
    animated: true,
    type: 'converse',
  },
];

export function useProjects() {
  const { data, error, mutate } = useSWR('/api/projects', fetcher, {
    revalidateOnFocus: false,
  });
  const projects = useProjectStore((state) => state.projects);
  const setProjects = useProjectStore((state) => state.setProjects);
  const deleteProject = useProjectStore((state) => state.deleteProject);
  const updateProject = useProjectStore((state) => state.updateProject);
  const activeProjectId = useProjectStore((state) => state.activeProjectId);
  const setActiveProjectId = useProjectStore(
    (state) => state.setActiveProjectId
  );
  const getProjectById = useProjectStore((state) => state.getProjectById);
  const prevDataRef = useRef(data);
  useEffect(() => {
    if (data && !error && data !== prevDataRef.current) {
      setProjects(data);
      prevDataRef.current = data;
    }
  }, [data, error, setProjects, projects]);

  const [isCreating, setIsCreating] = useState(false);
  const handleCreateProject = useCallback(
    async (project?: Project): Promise<Project | undefined> => {
      setIsCreating(true);
      try {
        const response = await fetch(`/api/projects`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            name: project?.name ?? 'New Project',
            description:
              project?.description ?? 'A new project with sample nodes.',
            flow: project?.flow ?? {},
          }),
        });
        if (!response.ok) throw new Error(await response.text());
        const newProject = await response.json();
        setProjects([newProject, ...projects]);
        mutate(); // Revalidate the SWR cache
        return newProject;
      } catch (error) {
        console.error('Failed to create project:', error);
      } finally {
        setIsCreating(false);
      }
    },
    [setProjects, mutate]
  );

  const [isDeleting, setIsDeleting] = useState(false);
  const handleDeleteProject = useCallback(
    async (id: number) => {
      setIsDeleting(true);
      const previousProjects = [...projects];
      
      // Immediate optimistic update
      deleteProject(id);
      mutate(projects.filter(p => p.id !== id), false);
      
      try {
        const response = await fetch(`/api/projects/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        if (!response.ok) throw new Error(await response.text());
      } catch (error) {
        console.error('Failed to delete project:', error);
        // Rollback on error
        setProjects(previousProjects);
        await mutate();
        throw error;
      } finally {
        setIsDeleting(false);
      }
    },
    [projects, deleteProject, setProjects, mutate]
  );

  const [isUpdating, setIsUpdating] = useState(false);
  const handleUpdateProject = useCallback(
    async (id: number, project: Partial<Project>) => {
      setIsUpdating(true);
      const previousProject = projects.find((p) => p.id === id);
      if (!previousProject) return;
      updateProject(id, project);
      try {
        const response = await fetch(`/api/projects/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(project),
        });
        if (!response.ok) throw new Error(await response.text());
        const updatedProject = await response.json();
        updateProject(id, updatedProject);
        mutate(); // Revalidate the SWR cache
      } catch (error) {
        console.error('Failed to update project:', error);
        updateProject(id, previousProject);
      } finally {
        setIsUpdating(false);
      }
    },
    [data, updateProject, mutate]
  );

  const [isForking, setIsForking] = useState(false);
  const handleForkProject = useCallback(
    async (template: ProjectTemplate): Promise<Project | undefined> => {
      setIsForking(true);
      try {
        const response = await fetch(`/api/projects`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            name: template.name,
            description: template.description,
            flow: template.project.flow,
          }),
        });
        if (!response.ok) throw new Error(response.statusText);
        const forkedProject = await response.json();
        setProjects([forkedProject, ...projects]);
        mutate(); // Revalidate the SWR cache
        return forkedProject;
      } catch (error) {
        console.error('Failed to fork project:', error);
      } finally {
        setIsForking(false);
      }
    },
    [setProjects, mutate]
  );

  return {
    projects: (data as Project[]) ?? [],
    activeProjectId,
    setActiveProjectId,
    isLoading: !error && !data,
    isError: error,
    refresh: mutate,
    createProject: handleCreateProject,
    isCreating,
    updateProject: handleUpdateProject,
    isUpdating,
    deleteProject: handleDeleteProject,
    isDeleting,
    forkProject: handleForkProject,
    isForking,
    getProjectById,
  };
}

export function useProject(id: number) {
  const { isLoading, isError, updateProject, isUpdating, getProjectById } =
    useProjects();

  const [isGeneratingPython, setIsGeneratingPython] = useState(false);
  

  return {
    project: getProjectById(id),
    isLoading,
    isError,
    updateProject: (project: Partial<Project>) => updateProject(id, project),
    isUpdating,
  };
}

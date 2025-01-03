import {
  ReactFlow,
  Node,
  Edge,
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  EdgeChange,
  NodeChange,
  SelectionMode,
  useStoreApi,
  useReactFlow,
  addEdge,
  ConnectionLineType,
  XYPosition,
  Panel,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './reactflow.css';
import { nodeTypes, edgeTypes, isConversable } from '@/lib/flow';
import { Icons } from '@/components/icons';
import { useState, useCallback, useRef, useEffect } from 'react';
import { ViewToggle } from './view-toggle';
import { NodeButton } from './node-button';
import { PythonViewer } from './python';
import { JsonViewer } from './json';
import { genId } from '@/lib/id';
import { useChats, useProject, useSettings } from '@/hooks';
import { debounce } from 'lodash-es';
import { ChatPane } from '@/components/chat/chat-pane';
import useProjectStore from '@/store/projects';
import { Chat as ChatType } from '@/store/chats';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { nanoid } from 'nanoid';

const DEBOUNCE_DELAY = 500; // Adjust this value as needed

const useDebouncedUpdate = (projectId: number) => {
  const [isDirty, setIsDirty] = useState(false);
  const { updateProject } = useProject(projectId);
  const { toObject } = useReactFlow();
  const initialLoad = useRef(true);

  const debouncedUpdate = debounce((flow) => {
    updateProject({ flow });
    setIsDirty(false);
  }, DEBOUNCE_DELAY);

  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false;
      return;
    }
    if (isDirty) {
      debouncedUpdate(toObject());
    }

    return () => {
      debouncedUpdate.cancel();
    };
  }, [isDirty, toObject, debouncedUpdate]);

  return { setIsDirty, debouncedUpdate };
};

export const FlowEditor = ({ projectId }: { projectId: number }) => {
  const { project, isLoading, isError } = useProject(projectId);
  const { screenToFlowPosition } = useReactFlow();
  const [nodes, setNodes] = useNodesState<Node>([]);
  const [edges, setEdges] = useEdgesState<Edge>([]);
  const { setIsDirty } = useDebouncedUpdate(projectId);
  const { chats, createChat } = useChats();
  const [mode, setMode] = useState<'main' | 'flow' | 'json' | 'python'>('flow');
  const flowParent = useRef<HTMLDivElement>(null);
  const nodePanePinned = useProjectStore((state) => state.nodePanePinned);
  const [activeChatId, setActiveChatId] = useState<ChatType | undefined>();

  // Suppress error code 002
  const store = useStoreApi();
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      store.getState().onError = (code, message) => {
        if (code === '002') {
          return;
        }
        console.warn('Workflow warning:', code, message);
      };
    }
  }, []);

  useEffect(() => {
    const initializeProjectFlow = () => {
      if (project?.flow) {
        setNodes(project.flow.nodes);
        setEdges(project.flow.edges);
        setIsDirty(false);
      }
      const existingChat = chats.findLast(
        (chat) => chat.from_project === project?.id
      );
      if (existingChat) {
        setActiveChatId(existingChat);
      }
    };

    initializeProjectFlow();
  }, [projectId]);

  const isGroupType = (type: string) =>
    ['groupchat', 'nestedchat'].includes(type);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => {
        let newNodes = applyNodeChanges(changes, nds);

        // Handle parent-child relationships for group nodes
        changes.forEach((change) => {
          if (change.type === 'position' && !change.dragging) {
            const draggedNode = newNodes.find((n) => n.id === change.id);
            if (draggedNode) {
              const nodePosition = draggedNode.position;

              // Find the last group node containing the dragged node
              const groupNode = newNodes.reduce(
                (foundGroup: Node | null, currentNode: Node) => {
                  if (
                    currentNode.type &&
                    isGroupType(currentNode.type) &&
                    currentNode.id !== draggedNode.id &&
                    isPositionInsideNode(nodePosition, currentNode)
                  ) {
                    return currentNode;
                  }
                  return foundGroup;
                },
                null
              );

              if (groupNode) {
                if (draggedNode.parentId !== groupNode.id) {
                  // Node is entering a new group
                  const newRelativePosition = {
                    x: nodePosition.x - groupNode.position.x,
                    y: nodePosition.y - groupNode.position.y,
                  };
                  draggedNode.parentId = groupNode.id;
                  draggedNode.position = newRelativePosition;
                }
                // If it's already a child, position is handled by React Flow
              } else if (draggedNode.parentId) {
                // Node is not over any group
                const parentNode = newNodes.find(
                  (n) => n.id === draggedNode.parentId
                );
                if (parentNode) {
                  // Convert to absolute position before detaching from the group
                  const newAbsolutePosition = {
                    x: nodePosition.x + parentNode.position.x,
                    y: nodePosition.y + parentNode.position.y,
                  };
                  draggedNode.position = newAbsolutePosition;
                }
                delete draggedNode.parentId;
              }
            }
          }
        });

        // Ensure group nodes are ahead of their child nodes in the array
        newNodes = newNodes.sort((a, b) => {
          if (isGroupType(a.type!) && b.parentId === a.id) {
            return -1; // a is the group, b is the child
          } else if (isGroupType(b.type!) && a.parentId === b.id) {
            return 1; // b is the group, a is the child
          } else {
            return 0;
          }
        });

        return newNodes;
      });
      if (changes.some((change) => change.type !== 'select')) {
        setIsDirty(true);
      }
    },
    [setNodes]
  );

  // Helper function to check if a position is inside a node
  const isPositionInsideNode = (position: XYPosition, node: Node) => {
    return (
      position.x > node.position.x &&
      position.x < node.position.x + (node.width ?? 0) &&
      position.y > node.position.y &&
      position.y < node.position.y + (node.height ?? 0)
    );
  };

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      if (changes.some((change) => change.type !== 'select')) {
        setIsDirty(true);
      }
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setIsDirty]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      console.log('onDrop', event.dataTransfer.getData('application/json'));
      if (!event.dataTransfer.getData('application/json')) {
        return;
      }

      if (!flowParent.current) {
        console.warn(
          'Unexpected null value of flowParent, drag & drop failed.'
        );
        return;
      }

      const flowBounds = flowParent.current.getBoundingClientRect();
      const data = JSON.parse(event.dataTransfer.getData('application/json'));
      const position = screenToFlowPosition({
        x: event.clientX - flowBounds.left,
        y: event.clientY - flowBounds.top,
      }, { snapToGrid: true });

      if (position.x === 0 && position.y === 0) {
        console.warn(
          'Failed calculating target position, need to check the problem. context:',
          position,
          data
        );
      }

      const { offsetX, offsetY, ...cleanedData } = data;
      const newId = nanoid();

      const newNode: Node = {
        id: `node-${data.id}-${newId}`,
        type: data.id,
        position,
        selected: true,
        data: cleanedData,
      };

      // Handle parent-child relationships for group nodes immediately after drop
      const groupNode = nodes.find(
        (n) => n.type === 'groupchat' && isPositionInsideNode(position, n)
      );

      if (groupNode) {
        newNode.parentId = groupNode.id;
        newNode.position = {
          x: position.x - groupNode.position.x,
          y: position.y - groupNode.position.y,
        };
      }

      setNodes((nds) =>
        nds.map((nd) => ({ ...nd, selected: false }) as Node).concat(newNode)
      );
    },
    [nodes, screenToFlowPosition, setNodes, flowParent]
  );

  const onConnect = (params: any) => {
    const sourceNode = nodes.find((nd) => nd.id === params.source);
    const targetNode = nodes.find((nd) => nd.id === params.target);
    const isConverseEdge =
      isConversable(sourceNode) && isConversable(targetNode);
    setEdges((eds) => {
      let newEdges = {
        ...params,
        strokeWidth: 2,
      };
      if (isConverseEdge) {
        newEdges = {
          ...newEdges,
          animated: true,
          type: 'converse',
        };
      }
      return addEdge(newEdges, eds);
    });
  };

  const onAddNode = (type: string, data: any) => {
    const newId = genId();
    const randInt = (max: number) =>
      Math.floor(Math.random() * Math.floor(max));
    const viewportCenter = screenToFlowPosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    const newNode: Node = {
      id: `node-${type}-${newId}`,
      type,
      position: {
        x: viewportCenter.x - 50 + randInt(100),
        y: viewportCenter.y - 100 + randInt(200),
      },
      data,
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const handleStartChat = async () => {
    if (!project) {
      console.warn('Project not found');
      return;
    }
    const existingChat = chats.findLast(
      (chat) => chat.from_project === project.id
    );
    console.log('existingChat', existingChat);
    if (existingChat) {
      setActiveChatId(existingChat);
      return;
    }
    await createChat(project.id, 'project').then((chat) =>
      setActiveChatId(chat)
    );
  };

  if (mode === 'python') {
    return (
      <div className="relative flex w-full h-full">
        <PythonViewer data={project} setMode={setMode} />
      </div>
    );
  } else if (mode === 'json') {
    return (
      <div className="relative flex w-full h-full">
        <JsonViewer data={project} />
      </div>
    );
  } else if (isLoading) {
    return (
      <div className="relative flex w-full h-full items-center justify-center">
        <div className="loading loading-bars text-primary"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="relative flex w-full h-full items-center justify-center">
        <p className="text-red-500">
          Project load failed {projectId}
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-var(--header-height))]">
      <ResizablePanelGroup direction="horizontal" className="flex h-full">
        <ResizablePanel className="h-[calc(100vh-var(--header-height))]" defaultSize={70}>
          <div
            className="relative flex flex-grow flex-col w-full h-full"
            ref={flowParent}
          >
            <ReactFlow
              nodes={nodes}
              onNodesChange={onNodesChange}
              edges={edges}
              onEdgesChange={onEdgesChange}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              onConnect={onConnect}
              connectionLineType={ConnectionLineType.Bezier}
              connectionLineStyle={{ strokeWidth: 2, stroke: 'darkgreen' }}
              onDragOver={onDragOver}
              onDrop={onDrop}
              panOnScroll
              selectionOnDrag
              selectionMode={SelectionMode.Partial}
              fitView
              fitViewOptions={{ maxZoom: 1 }}
              attributionPosition="bottom-right"
            >
              <Controls
                fitViewOptions={{ maxZoom: 1 }}
                showInteractive={false}
                position="bottom-left"
                className="flex"
              />
              <Panel position="top-right" className="flex items-center p-1 gap-2">
                <ViewToggle mode={'python'} setMode={setMode} />
              </Panel>
            </ReactFlow>
          </div>
          {!nodePanePinned && (
            <NodeButton onAddNode={onAddNode} className="absolute top-2 left-2" />
          )}
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="h-[calc(100vh-var(--navbar-height))]" defaultSize={30}>
          <Tabs defaultValue="config">
            <TabsList className="flex items-center justify-start w-full rounded-none">
              <TabsTrigger value="config" className="flex items-center gap-2">
                <Icons.settings className="w-4 h-4" />
                <span className="text-sm">Config</span>
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <Icons.node className="w-4 h-4" />
                <span className="text-sm">Chat</span>
              </TabsTrigger>
              <TabsTrigger value="nodes" className="flex items-center gap-2">
                <Icons.braces className="w-4 h-4" />
                <span className="text-sm">Data</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="config">
              <div>Hello</div>
            </TabsContent>
            <TabsContent value="chat">
              {activeChatId && <ChatPane chat={activeChatId} />}
            </TabsContent>
            <TabsContent value="nodes" className="p-0 overflow-auto">
              <JsonViewer data={project} />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

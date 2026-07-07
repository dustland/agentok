'use client';

import React, { useEffect, useState } from 'react';
import { CopyButton } from '../copy-button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useProject } from '@/hooks';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { vscodeDark, vscodeLight } from '@uiw/codemirror-theme-vscode';
import { json } from '@codemirror/lang-json';
import CodeMirror from '@uiw/react-codemirror';

interface JsonViewerProps {
  projectId: number;
  className?: string;
}

export const JsonViewer = ({ projectId, className }: JsonViewerProps) => {
  const { project, isLoading, isError } = useProject(projectId);
  const [jsonString, setJsonString] = useState('');
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (project) {
      setJsonString(JSON.stringify(project, null, 2));
    }
  }, [project]);

  return (
    <ScrollArea className={cn('relative h-full w-full', className)}>
      <div className="relative min-h-full w-full">
        <div className="absolute top-12 right-4 z-10">
          <CopyButton content={jsonString} />
        </div>
        <CodeMirror
          value={jsonString}
          height="calc(100vh - var(--header-height) - 8rem)"
          theme={resolvedTheme === 'dark' ? vscodeDark : vscodeLight}
          extensions={[json()]}
          editable={false}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: false,
            highlightActiveLine: false,
          }}
          className="w-full text-xs whitespace-pre-wrap [&_.cm-content]:whitespace-pre-wrap [&_.cm-scroller]:whitespace-pre-wrap"
        />
      </div>
    </ScrollArea>
  );
};

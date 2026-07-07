import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { vscodeLight, vscodeDark } from '@uiw/codemirror-theme-vscode';
import { CopyButton } from '@/components/copy-button';
import { DownloadButton } from '@/components/download-button';
import { Icons } from '../icons';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTheme } from 'next-themes';
import { useProject } from '@/hooks';
import { useCallback, useEffect, useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

export const PythonViewer = ({ projectId, setMode }: any) => {
  const { resolvedTheme } = useTheme();
  const { project, isLoading } = useProject(projectId);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isGeneratingPython, setIsGeneratingPython] = useState(false);
  const generatePython = useCallback(async (): Promise<string> => {
    if (!project?.flow) return '';
    setIsGeneratingPython(true);
    setError('');

    try {
      const resp = await fetch('/api/codegen', {
        method: 'POST',
        body: JSON.stringify(project),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await resp.json();
      if (!resp.ok) {
        const message =
          json?.error || json?.details?.error || 'Failed to generate Python code';
        throw new Error(message);
      }

      return json?.code ?? '';
    } catch (e) {
      const message =
        e instanceof Error ? e.message : 'Failed to generate Python code';
      console.warn(e);
      setError(message);
      toast({
        title: 'Error generating Python code',
        description: message,
        variant: 'destructive',
      });
      return '';
    } finally {
      setIsGeneratingPython(false);
    }
  }, [project]);

  useEffect(() => {
    generatePython().then((python) => {
      setCode(python ?? '');
    });
  }, [generatePython, project?.updated_at]);

  if (isLoading || !project || isGeneratingPython) {
    return (
      <div className="relative flex w-full h-full items-center justify-center">
        <Icons.logoSimple className="w-12 h-12 text-muted-foreground/50 animate-pulse" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <div className="flex max-w-xl flex-col items-center gap-3 rounded-2xl border bg-background/80 p-6 text-center shadow-sm">
          <Icons.alert className="h-8 w-8 text-destructive" />
          <div className="space-y-1">
            <h3 className="font-semibold">Failed to generate code</h3>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
          <Button onClick={() => generatePython().then((python) => setCode(python ?? ''))}>
            Try again
          </Button>
        </div>
      </div>
    );
  }

  if (!code.trim()) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <div className="flex max-w-xl flex-col items-center gap-3 rounded-2xl border bg-background/80 p-6 text-center shadow-sm">
          <Icons.python className="h-8 w-8 text-muted-foreground" />
          <div className="space-y-1">
            <h3 className="font-semibold">No generated code yet</h3>
            <p className="text-sm text-muted-foreground">
              This project did not return any Python output. Try regenerating the
              code after updating the flow.
            </p>
          </div>
          <Button onClick={() => generatePython().then((python) => setCode(python ?? ''))}>
            Regenerate
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="relative h-full w-full">
      <div className="relative min-h-full w-full">
        <CodeMirror
          value={code}
          height="calc(100vh - var(--header-height) - 8rem)"
          theme={resolvedTheme === 'dark' ? vscodeDark : vscodeLight}
          extensions={[python()]}
          editable={false}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: false,
            highlightActiveLine: false,
          }}
          className="w-full text-xs whitespace-pre-wrap [&_.cm-content]:whitespace-pre-wrap [&_.cm-scroller]:whitespace-pre-wrap"
        />
      </div>
      <div className="absolute flex items-center gap-2 right-2 top-12 z-10">
        {code && (
          <>
            <CopyButton content={code} />
            <DownloadButton
              data={code}
              label="Download"
              filename={`${project?.name ?? 'flow2py'}.py`}
            />
          </>
        )}
      </div>
    </ScrollArea>
  );
};

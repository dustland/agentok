import { RedocViewer } from './redoc-viewer';

export const metadata = {
  title: 'API Reference',
  description: 'Agentok Studio OpenAPI reference.',
};

export default function ApiDocsPage() {
  return (
    <main className="api-docs-page">
      <RedocViewer />
    </main>
  );
}

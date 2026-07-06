import type { Metadata } from 'next';
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import { Footer, Layout, Navbar } from 'nextra-theme-docs';
import 'nextra-theme-docs/style.css';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Agentok Studio',
    template: '%s | Agentok Studio',
  },
  description:
    'AG2 Visualized - build agentic apps with drag-and-drop simplicity.',
};

const navbar = (
  <Navbar
    logo={
      <span className="agentok-logo">
        <img src="/img/logo.svg" alt="" aria-hidden="true" />
        <strong>Agentok Studio</strong>
      </span>
    }
    projectLink="https://github.com/hughlv/agentok"
  />
);

const footer = (
  <Footer>
    <span>Copyright © {new Date().getFullYear()} Agentok Team.</span>
  </Footer>
);

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head>
        <link rel="icon" href="/img/favicon.ico" />
      </Head>
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/hughlv/agentok/tree/main/website/content"
          editLink="Edit this page"
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          toc={{ backToTop: true }}
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import type { ComponentType, ReactNode } from 'react';
import { generateStaticParamsFor, importPage } from 'nextra/pages';
import { useMDXComponents as getMDXComponents } from '../../../mdx-components';

type PageProps = {
  params: Promise<{
    mdxPath?: string[];
  }>;
};

export const generateStaticParams = generateStaticParamsFor('mdxPath');

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { mdxPath } = await params;
  const { metadata } = await importPage(mdxPath);
  return metadata;
}

const Wrapper = getMDXComponents({}).wrapper as ComponentType<{
  children: ReactNode;
  toc: unknown;
  metadata: unknown;
  sourceCode: string;
}>;

export default async function Page({ params }: PageProps) {
  const { mdxPath } = await params;
  const result = await importPage(mdxPath);
  const { default: MDXContent, toc, metadata, sourceCode } = result;

  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <MDXContent />
    </Wrapper>
  );
}

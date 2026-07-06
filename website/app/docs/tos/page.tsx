import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service',
};

export default function TermsRedirectPage() {
  return (
    <main className="home-page">
      <meta httpEquiv="refresh" content="0; url=/docs/legal/tos" />
      <p>
        Terms of Service moved to{' '}
        <Link href="/docs/legal/tos">/docs/legal/tos</Link>.
      </p>
    </main>
  );
}

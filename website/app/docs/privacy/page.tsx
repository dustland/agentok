import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyRedirectPage() {
  return (
    <main className="home-page">
      <meta httpEquiv="refresh" content="0; url=/docs/legal/privacy" />
      <p>
        Privacy Policy moved to{' '}
        <Link href="/docs/legal/privacy">/docs/legal/privacy</Link>.
      </p>
    </main>
  );
}

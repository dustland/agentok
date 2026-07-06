import Link from 'next/link';

const features = [
  {
    title: 'Multi-agent foundations',
    image: '/img/knowledge-3.png',
    description: 'Built on AG2 for orchestrating collaborative agent workflows.',
  },
  {
    title: 'Visual workflow builder',
    image: '/img/flow-3.png',
    description:
      'Design agents, tools, and conversation paths directly on the canvas.',
  },
  {
    title: 'Code-ready outputs',
    image: '/img/api-3.png',
    description:
      'Inspect, extend, and integrate the generated Python and API surfaces.',
  },
];

export default function Home() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero__copy">
          <img src="/img/logo.svg" className="home-hero__logo" alt="" />
          <h1>Agentok Studio</h1>
          <p>
            AG2 visualized. Build, test, and share agentic apps with a focused
            drag-and-drop workflow.
          </p>
          <div className="home-hero__actions">
            <Link href="/docs/getting-started">Getting Started</Link>
            <Link href="https://studio.agentok.ai/">Start to Build</Link>
          </div>
        </div>
        <img
          src="/img/screenshot-studio-1.png"
          className="home-hero__image"
          alt="Agentok Studio workflow canvas"
        />
      </section>
      <section className="home-features" aria-label="Product capabilities">
        {features.map(feature => (
          <article key={feature.title} className="home-feature">
            <img src={feature.image} alt="" />
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

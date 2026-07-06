'use client';

import Script from 'next/script';
import { createElement, useEffect, useMemo, useState } from 'react';

const darkTheme = {
  colors: {
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
      disabled: '#ffffff',
      hint: '#ffffff',
      icon: '#ffffff',
      divider: '#ffffff',
      light: '#ffffff',
      dark: '#ffffff',
      contrastText: '#ffffff',
    },
  },
  sidebar: {
    backgroundColor: '#1f2937',
    textColor: '#ffffff',
  },
};

function getTheme() {
  if (typeof document === 'undefined') {
    return 'light';
  }

  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export function RedocViewer() {
  const [theme, setTheme] = useState(getTheme);

  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(getTheme()));

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const redocKey = useMemo(() => `redoc-${theme}`, [theme]);

  return (
    <>
      <Script
        src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"
        strategy="afterInteractive"
      />
      <div id="redoc-container">
        {createElement('redoc', {
          key: redocKey,
          'spec-url': 'https://api.agentok.ai/openapi.json',
          'expand-responses': 'all',
          'hide-download-button': 'true',
          'scroll-y-offset': 'nav',
          theme: JSON.stringify(theme === 'dark' ? darkTheme : {}),
        })}
      </div>
    </>
  );
}

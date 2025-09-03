// app/components/MetadataComponent.tsx
'use client';

import { usePathname } from 'next/navigation';
import Head from 'next/head';

export default function MetadataComponent() {
  const pathname = usePathname() || '';
  let title = 'My App';
  let description = 'Welcome to My App';

  if (pathname.startsWith('/admin-dashboard')) {
    title = 'Admin Dashboard | My App';
    description = 'Admin panel for managing the application';
  } else if (pathname === '/') {
    title = 'Home | My App';
    description = 'Home page of My App';
  } else if (pathname === '/about') {
    title = 'About | My App';
    description = 'Learn more about My App';
  }

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content="nextjs, app, admin" />
    </Head>
  );
}
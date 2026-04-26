import type { Metadata, Viewport } from 'next';
import './globals.css';
import { IDENTITY } from '@/lib/profile';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#04060e',
};

export const metadata: Metadata = {
  title: {
    default: `${IDENTITY.name} — Senior Full Stack Architect`,
    template: '%s · ' + IDENTITY.name,
  },
  description: IDENTITY.summary[0],
  applicationName: 'Ankit Khandelwal — Profile',
  authors: [{ name: IDENTITY.name }],
  openGraph: {
    type: 'website',
    title: `${IDENTITY.name} — Profile`,
    description: IDENTITY.summary[0],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen overflow-x-hidden">{children}</body>
    </html>
  );
}

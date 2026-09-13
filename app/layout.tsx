import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Appleui — A considered workspace',
  description: 'A quiet, carefully crafted workspace for your people, ideas, and everyday work.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" suppressHydrationWarning><body>{children}</body></html>;
}

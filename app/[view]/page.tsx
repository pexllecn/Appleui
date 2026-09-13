import { notFound } from 'next/navigation';
import { WorkspaceApp, type View } from '@/components/workspace-app';
const views = ['people', 'documents', 'analytics', 'social', 'general', 'hours', 'appearance', 'integrations'] as const;
export function generateStaticParams() { return views.map(view => ({ view })); }
export default async function Page({ params }: { params: Promise<{ view: string }> }) {
  const { view } = await params;
  if (!views.includes(view as typeof views[number])) notFound();
  return <WorkspaceApp view={view as View} />;
}

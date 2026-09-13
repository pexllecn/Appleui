import Link from 'next/link';
export default function NotFound() { return <div className="app-stage"><div className="empty-state"><h1>This page isn’t here</h1><p>Let’s get you back to your workspace.</p><Link className="button button-primary" href="/">Back to workspace</Link></div></div>; }

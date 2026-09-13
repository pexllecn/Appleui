'use client';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { ArrowLeft, ChevronLeft, ChevronsUpDown, LayoutGrid, UsersRound, FileText, ChartNoAxesCombined, Music2, Settings2, Clock3, Palette, Blocks, CircleUserRound, PanelLeftClose, PanelLeftOpen, Search, Sun, Moon, Menu, Check, BookOpen, X } from 'lucide-react';
import { Avatar, Button, IconButton, Modal, StarMark, Toast } from './ui';
import { AppearanceScreen, GeneralScreen, HoursScreen, WorkspaceScreen, type ThemeChoice } from './screens/settings';
import { useStoredState } from '@/lib/storage';

const PeopleScreen = dynamic(() => import('./screens/people').then(m => m.PeopleScreen));
const DocumentsScreen = dynamic(() => import('./screens/documents').then(m => m.DocumentsScreen));
const AnalyticsScreen = dynamic(() => import('./screens/analytics').then(m => m.AnalyticsScreen));
const SocialScreen = dynamic(() => import('./screens/social').then(m => m.SocialScreen));

export type View = 'workspace' | 'people' | 'documents' | 'analytics' | 'social' | 'general' | 'hours' | 'appearance' | 'integrations';
const navigation = [
  { id: 'workspace', label: 'Overview', icon: LayoutGrid, group: 'settings' },
  { id: 'general', label: 'General', icon: Settings2, group: 'settings' },
  { id: 'hours', label: 'Business hours', icon: Clock3, group: 'settings' },
  { id: 'appearance', label: 'Appearance', icon: Palette, group: 'settings' },
  { id: 'integrations', label: 'Integrations', icon: Blocks, group: 'settings' },
  { id: 'analytics', label: 'Dashboard', icon: ChartNoAxesCombined, group: 'work' },
  { id: 'people', label: 'People', icon: UsersRound, group: 'work' },
  { id: 'documents', label: 'Documents', icon: FileText, group: 'work' },
  { id: 'social', label: 'Discover & chat', icon: Music2, group: 'work' },
] as const;

export function WorkspaceApp({ view = 'workspace' }: { view?: View }) {
  const router = useRouter();
  const [theme, setTheme] = useStoredState<ThemeChoice>('theme', 'system');
  const [systemDark, setSystemDark] = useState(false);
  const [collapsed, setCollapsed] = useStoredState('sidebar-collapsed', false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [colors, setColors] = useStoredState('brand-colors', { light: '#191A1C', dark: '#F5F5F5' });
  const [message, setMessage] = useState('');
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [command, setCommand] = useState(false);
  const [commandQuery, setCommandQuery] = useState('');
  const [projectOpen, setProjectOpen] = useState(false);
  const [project, setProject] = useStoredState('project', 'Personal');
  const [aboutOpen, setAboutOpen] = useState(false);
  const projectRef = useRef<HTMLDivElement>(null);
  const dark = theme === 'dark' || (theme === 'system' && systemDark);
  const settingsView = ['workspace', 'general', 'hours', 'appearance', 'integrations'].includes(view);
  useEffect(() => {
    const match = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemDark(match.matches);
    const listener = () => setSystemDark(match.matches);
    match.addEventListener('change', listener);
    return () => match.removeEventListener('change', listener);
  }, []);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setCommand(open => !open); }
      if (event.key === 'Escape') { setMobileOpen(false); setProjectOpen(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); if (timeout.current) clearTimeout(timeout.current); };
  }, []);
  useEffect(() => {
    if (!projectOpen) return;
    const close = (event: PointerEvent) => { if (!projectRef.current?.contains(event.target as Node)) setProjectOpen(false); };
    window.addEventListener('pointerdown', close);
    return () => window.removeEventListener('pointerdown', close);
  }, [projectOpen]);
  useEffect(() => { setMobileOpen(false); setProjectOpen(false); }, [view]);
  function notify(text: string) { setMessage(text); if (timeout.current) clearTimeout(timeout.current); timeout.current = setTimeout(() => setMessage(''), 3500); }
  function navigate(id: View) { setCommand(false); setCommandQuery(''); router.push(id === 'workspace' ? '/' : `/${id}`); }
  const primary = dark ? colors.dark : colors.light;
  function inkFor(hex: string) {
    const rgb = hex.match(/[a-f\d]{2}/gi)?.map(c => parseInt(c, 16)) ?? [0, 0, 0];
    const luminance = rgb.reduce((total, n, i) => { const srgb = n / 255; return total + (srgb <= .04045 ? srgb / 12.92 : ((srgb + .055) / 1.055) ** 2.4) * [.2126, .7152, .0722][i]; }, 0);
    return luminance > .179 ? '#18181A' : '#FFFFFF';
  }
  const customStyle = { '--primary': primary, '--on-primary': inkFor(primary) } as CSSProperties;
  const navItem = (item: typeof navigation[number]) => <Link href={item.id === 'workspace' ? '/' : `/${item.id}`} key={item.id} className={`nav-item ${view === item.id ? 'active' : ''}`} aria-current={view === item.id ? 'page' : undefined} title={collapsed ? item.label : undefined} onClick={() => setMobileOpen(false)}><item.icon /><span>{item.label}</span></Link>;
  return <div className="app-stage" data-theme={dark ? 'dark' : 'light'} style={customStyle}>
    <div className="app-window">
      <div className="mobile-bar"><Link href="/" className="mobile-brand"><StarMark />Appleui</Link><div className="mobile-actions"><IconButton label="Search workspace" onClick={() => setCommand(true)}><Search size={18} /></IconButton><IconButton label="Open navigation" aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X size={20} /> : <Menu size={20} />}</IconButton></div></div>
      {mobileOpen && <button className="sidebar-scrim" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
      <aside className={`sidebar ${collapsed && !mobileOpen ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`} aria-label="Main navigation">
        <div className="sidebar-top">{collapsed && !mobileOpen ? <Link href="/" className="sidebar-back" aria-label="Workspace overview"><StarMark /></Link> : settingsView ? <Button className="sidebar-back" onClick={() => navigate('people')}><ChevronLeft />Settings</Button> : <Link href="/" className="button button-ghost"><ArrowLeft size={15} />Workspace</Link>}<IconButton className="sidebar-collapse" label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} onClick={() => setCollapsed(!collapsed)}>{collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}</IconButton></div>
        {!settingsView && <div ref={projectRef} className="project-menu-wrap"><button className="project-switcher" onClick={() => setProjectOpen(!projectOpen)} aria-expanded={projectOpen} aria-label="Switch workspace"><span className="project-logo"><StarMark /></span><span className="project-copy"><span>Workspace</span><strong>{project}</strong></span><ChevronsUpDown size={16} color="var(--text-secondary)" /></button>{projectOpen && <div className="project-menu">{['Personal', 'Marketing'].map(name => <button key={name} onClick={() => { setProject(name); setProjectOpen(false); notify(`${name} preview selected`); }}><span className="project-logo"><StarMark /></span>{name}{project === name && <Check size={14} />}</button>)}</div>}</div>}
        <nav className="sidebar-nav">{(settingsView ? ['settings', 'work'] : ['work', 'settings']).map(group => <div key={group} className="nav-group"><div className="nav-label">{group === 'settings' ? <><LayoutGrid />Workspace</> : 'Your work'}</div>{navigation.filter(item => item.group === group).map(navItem)}</div>)}<div className="nav-group"><div className="nav-label"><CircleUserRound />My account</div><button className="nav-item" onClick={() => setCommand(true)} title={collapsed ? 'Search workspace' : undefined}><Search /><span>Search</span>{!collapsed && <span className="nav-badge">⌘ K</span>}</button><button className="nav-item" onClick={() => setAboutOpen(true)} title={collapsed ? 'About this workspace' : undefined}><BookOpen /><span>About Appleui</span></button></div></nav>
        <div className="sidebar-profile"><Avatar name="Michael Korks" size={36} /><div className="profile-copy"><strong>Michael Korks</strong><span>Personal workspace</span></div><IconButton label={dark ? 'Switch to light mode' : 'Switch to dark mode'} onClick={() => setTheme(dark ? 'light' : 'dark')}>{dark ? <Sun size={17} /> : <Moon size={17} />}</IconButton></div>
      </aside>
      <main className="main-surface" id="main-content" key={view}>
        {view === 'workspace' && <WorkspaceScreen notify={notify} />}
        {view === 'integrations' && <WorkspaceScreen notify={notify} integrationsOnly />}
        {view === 'general' && <GeneralScreen notify={notify} />}
        {view === 'hours' && <HoursScreen notify={notify} />}
        {view === 'appearance' && <AppearanceScreen theme={theme} setTheme={setTheme} notify={notify} colors={colors} setBrandColors={setColors} />}
        {view === 'people' && <PeopleScreen notify={notify} />}
        {view === 'documents' && <DocumentsScreen notify={notify} />}
        {view === 'analytics' && <AnalyticsScreen notify={notify} />}
        {view === 'social' && <SocialScreen notify={notify} />}
      </main>
    </div>
    <Toast message={message} />
    <Modal open={command} onClose={() => setCommand(false)} title="Go to…"><input className="command-search" type="search" autoFocus aria-label="Find a page" placeholder="Search your workspace…" value={commandQuery} onChange={e => setCommandQuery(e.target.value)} /><div className="shortcut-list">{navigation.filter(item => item.label.toLowerCase().includes(commandQuery.toLowerCase())).map(item => <button key={item.id} onClick={() => navigate(item.id)}><item.icon />{item.label}</button>)}</div>{!navigation.some(item => item.label.toLowerCase().includes(commandQuery.toLowerCase())) && <p className="modal-description">No pages match “{commandQuery}”.</p>}</Modal>
    <Modal open={aboutOpen} onClose={() => setAboutOpen(false)} title="A considered workspace"><p className="modal-description">Appleui is a working study of a quiet, native design language. Warm surfaces, deliberate spacing, fine borders, and a little color where it matters.</p><p className="modal-description">Explore people, documents, analytics, and settings from the sidebar. Your edits stay on this device. Analytics and conversations use sample data.</p><div className="modal-actions"><Button onClick={() => setAboutOpen(false)}>Keep exploring</Button><a className="button button-primary" href="https://github.com/pexllecn/Appleui" target="_blank" rel="noreferrer">View repository</a></div></Modal>
  </div>;
}

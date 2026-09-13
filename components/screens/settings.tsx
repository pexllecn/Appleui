'use client';
import { useEffect, useState, type CSSProperties } from 'react';
import { ArrowLeftRight, Rocket, RefreshCw, PanelsTopLeft, ShieldCheck, ChevronRight, Github, Gitlab, Check, Plus, X, Monitor, Bell, CircleUserRound, ExternalLink } from 'lucide-react';
import { Button, IconButton, Modal, PageHeader, Badge } from '@/components/ui';
import { useStoredState } from '@/lib/storage';
import './settings.css';

const features = [
  { name: 'Issue Migration Assistant', description: 'Copy over existing issues from Jira, Shortcut, Asana or GitHub.', action: 'Migrate issues', icon: ArrowLeftRight, detail: 'Bring your work together. Import a CSV file with a title column to preview your issues before adding them to this workspace.' },
  { name: 'Initiatives', description: 'Plan strategic product work and monitor progress at scale.', action: 'Try initiatives', icon: Rocket, detail: 'Give your next big idea a home. Create an initiative to organize the projects that move your team forward.' },
  { name: 'Cycles', description: 'Track your team’s workload and velocity with Cycles.', action: 'Try Cycles', icon: RefreshCw, detail: 'Build a steady rhythm. Set a two-week cycle and give your team a clear focus for what comes next.' },
  { name: 'Views', description: 'Create filtered views that you can save and share with others.', action: 'Open views', icon: PanelsTopLeft, detail: 'See work your way. Save a focused view for the tasks, people, or projects you come back to every day.' },
  { name: 'Triage', description: 'Prioritize issues created from outside your team and customer support integrations.', action: 'Try Triage', icon: ShieldCheck, detail: 'Make room for what matters. Give incoming requests a dedicated place to be reviewed and prioritized.' },
];
const integrations = [
  { name: 'GitHub', description: 'Link pull requests, commits and automate workflows.', website: 'https://github.com' },
  { name: 'GitLab', description: 'Link merge requests and automate workflows.', website: 'https://gitlab.com' },
  { name: 'Slack', description: 'Send notifications to channels and create issues from messages.', website: 'https://slack.com' },
  { name: 'Figma', description: 'Embed file previews in issues.', website: 'https://figma.com' },
];
function IntegrationMark({ name }: { name: string }) {
  if (name === 'GitHub') return <Github className="integration-github" size={34} strokeWidth={2.3} />;
  if (name === 'GitLab') return <Gitlab className="integration-gitlab" size={35} fill="#fc6d26" stroke="#fc6d26" strokeWidth={1} />;
  if (name === 'Figma') return <span className="figma-mark" aria-hidden="true"><i /><i /><i /><i /><i /></span>;
  return <span className="slack-mark" aria-hidden="true"><i /><i /><i /><i /></span>;
}

export function WorkspaceScreen({ notify, integrationsOnly = false }: { notify: (message: string) => void; integrationsOnly?: boolean }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [integration, setIntegration] = useState<string | null>(null);
  const [enabled, setEnabled] = useStoredState<string[]>('features', []);
  const [featureName, setFeatureName] = useState('');
  const [importCount, setImportCount] = useState<number | null>(null);
  const feature = selected === null ? null : features[selected];
  function activateFeature() {
    if (!feature) return;
    setEnabled(previous => [...new Set([...previous, feature.name])]);
    notify(feature.name === 'Issue Migration Assistant' ? `${importCount ?? 0} issues imported into the demo workspace` : `${featureName || feature.name} added to your workspace`);
    setSelected(null); setFeatureName(''); setImportCount(null);
  }
  return <div className="page-content workspace-page">
    <PageHeader title={integrationsOnly ? 'Integrations' : 'Workspace'} description={integrationsOnly ? 'Bring your favorite tools into your workspace.' : <>Manage your workspace settings. Your workspace is in the <span className="region-label">United States</span> region.</>} />
    {!integrationsOnly && <section className="workspace-section"><h2>Explore features</h2><div className="feature-grid">{features.map((item, index) => <article className="feature-card" key={item.name}><span className="feature-icon"><item.icon size={19} strokeWidth={1.7} /></span><h3>{item.name}</h3><p>{item.description}</p><div className="feature-actions"><Button onClick={() => { setSelected(index); setFeatureName(''); setImportCount(null); }}>{enabled.includes(item.name) ? <><Check size={13} />Enabled</> : item.action}</Button><Button variant="link" onClick={() => setSelected(index)}>Learn more<ChevronRight size={14} /></Button></div></article>)}</div></section>}
    <section className="workspace-section integration-section"><h2>Integrations</h2><div className="integration-grid">{integrations.map(item => <article className="integration-card" key={item.name}><IntegrationMark name={item.name} /><h3>{item.name}</h3><p>{item.description}</p><Button onClick={() => setIntegration(item.name)}>Connect</Button></article>)}</div></section>
    <Modal open={feature !== null} onClose={() => setSelected(null)} title={feature?.name ?? 'Explore feature'}>
      {feature && <><p className="modal-description">{feature.detail}</p>{feature.name === 'Issue Migration Assistant' ? <label className="import-issues">Choose a CSV file<input type="file" accept=".csv,text/csv" onChange={async e => { const file = e.target.files?.[0]; if (!file) return; const text = await file.text(); const rows = text.trim().split(/\r?\n/); if (!rows[0]?.toLowerCase().includes('title') || rows.length < 2) { notify('Choose a CSV with a title column and at least one issue'); setImportCount(null); return; } setImportCount(rows.length - 1); }} />{importCount !== null && <Badge tone="green">{importCount} issues ready to import</Badge>}</label> : <label className="field-label">{feature.name === 'Cycles' ? 'Cycle name' : 'Name'}<input value={featureName} onChange={e => setFeatureName(e.target.value)} placeholder={feature.name === 'Initiatives' ? 'A better first impression' : `My ${feature.name.toLowerCase()}`} maxLength={80} /></label>}<p className="local-note">This is a local demo workspace. Changes are saved on this device.</p><div className="modal-actions"><Button onClick={() => setSelected(null)}>Cancel</Button><Button variant="primary" disabled={feature.name === 'Issue Migration Assistant' && importCount === null} onClick={activateFeature}>{enabled.includes(feature.name) ? 'Save changes' : feature.action}</Button></div></>}
    </Modal>
    <Modal open={integration !== null} onClose={() => setIntegration(null)} title={`Connect ${integration ?? ''}`}><p className="modal-description">{integration} brings your team’s work into one place. This preview shows the integration interface; connecting a real account requires an authorized integration service.</p><div className="integration-detail"><IntegrationMark name={integration ?? 'GitHub'} /><div><strong>{integration}</strong><span>Account connection</span></div><Badge>Preview</Badge></div><div className="modal-actions"><Button onClick={() => setIntegration(null)}>Done</Button><a className="button button-primary" href={integrations.find(item => item.name === integration)?.website} target="_blank" rel="noreferrer">Visit {integration}<ExternalLink size={14} /></a></div></Modal>
  </div>;
}

type Shift = { start: string; end: string };
type Day = { name: string; active: boolean; shifts: Shift[] };
const defaultHours: Day[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((name, i) => ({ name, active: i < 5, shifts: i === 1 || i === 4 ? [{ start: '08:00', end: '12:30' }, { start: '14:30', end: i === 4 ? '19:00' : '19:30' }] : [{ start: i < 5 ? '08:00' : '', end: i < 5 ? '19:30' : '' }] }));
export function HoursScreen({ notify }: { notify: (message: string) => void }) {
  const [saved, setSaved] = useStoredState<Day[]>('business-hours', defaultHours);
  const [days, setDays] = useState(defaultHours);
  const [timezone, setTimezone] = useStoredState('timezone', 'Europe/Berlin');
  const [zoneOpen, setZoneOpen] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => setDays(saved), [saved]);
  const dirty = JSON.stringify(days) !== JSON.stringify(saved);
  const update = (dayIndex: number, updateDay: (day: Day) => Day) => setDays(previous => previous.map((day, i) => i === dayIndex ? updateDay(day) : day));
  const zones: Record<string, string> = { 'Europe/Berlin': 'Berlin, Germany', 'Europe/Dublin': 'Dublin, Ireland', 'Europe/London': 'London, United Kingdom', 'America/New_York': 'New York, United States', 'America/Los_Angeles': 'Los Angeles, United States', 'Asia/Dubai': 'Dubai, United Arab Emirates' };
  function save() {
    for (const day of days.filter(day => day.active)) {
      for (let i = 0; i < day.shifts.length; i++) {
        const shift = day.shifts[i];
        if (!shift.start || !shift.end || shift.start >= shift.end) { setError(`${day.name}: choose an ending time after the starting time.`); return; }
        if (i > 0 && shift.start < day.shifts[i - 1].end) { setError(`${day.name}: time intervals must be in order and cannot overlap.`); return; }
      }
    }
    setSaved(days); setError(''); notify('Business hours saved');
  }
  return <div className="page-content hours-page"><PageHeader title="Business hours" description={<>Your current timezone is set to <button className="timezone-chip" onClick={() => setZoneOpen(true)}>{zones[timezone] || timezone}</button>, which is what we’ll use to set<br className="desktop-break" /> your business hours. You can change it under account details.</>} />
    <div className="hours-table"><div className="hours-head"><span>Day</span><span>Starting time</span><span>Ending time</span><span /></div>{days.map((day, dayIndex) => <div className={`hours-row ${day.active ? '' : 'hours-inactive'}`} key={day.name}><label className="day-label"><input type="checkbox" checked={day.active} onChange={e => update(dayIndex, d => ({ ...d, active: e.target.checked, shifts: d.shifts.map(shift => ({ start: shift.start || '09:00', end: shift.end || '17:00' })) }))} />{day.name}</label><div className="day-shifts">{day.shifts.map((shift, shiftIndex) => <div className="shift-row" key={shiftIndex}><input type="time" aria-label={`${day.name} start ${shiftIndex + 1}`} value={shift.start} disabled={!day.active} onChange={e => update(dayIndex, d => ({ ...d, shifts: d.shifts.map((s, i) => i === shiftIndex ? { ...s, start: e.target.value } : s) }))} /><input type="time" aria-label={`${day.name} end ${shiftIndex + 1}`} value={shift.end} disabled={!day.active} onChange={e => update(dayIndex, d => ({ ...d, shifts: d.shifts.map((s, i) => i === shiftIndex ? { ...s, end: e.target.value } : s) }))} /><div className="shift-actions">{shiftIndex > 0 && <IconButton label={`Remove ${day.name} interval ${shiftIndex + 1}`} className="remove-shift" onClick={() => update(dayIndex, d => ({ ...d, shifts: d.shifts.filter((_, i) => i !== shiftIndex) }))}><X size={17} /></IconButton>}{shiftIndex === day.shifts.length - 1 && <IconButton label={`Add ${day.name} interval`} disabled={!day.active || day.shifts.length >= 4} onClick={() => update(dayIndex, d => ({ ...d, shifts: [...d.shifts, { start: '', end: '' }] }))}><Plus size={17} /></IconButton>}</div></div>)}</div></div>)}</div>
    <div className="hours-save">{error && <p role="alert" className="form-error">{error}</p>}<span>{dirty ? 'You have unsaved changes' : 'Your weekly availability'}</span><Button onClick={() => { setDays(saved); setError(''); }} disabled={!dirty}>Discard</Button><Button variant="primary" onClick={save} disabled={!dirty}>Save changes</Button></div>
    <Modal open={zoneOpen} onClose={() => setZoneOpen(false)} title="Workspace timezone"><p className="modal-description">Business hours are interpreted in this timezone.</p><label className="field-label">Timezone<select value={timezone} onChange={e => setTimezone(e.target.value)}>{Object.entries(zones).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label><div className="modal-actions"><Button variant="primary" onClick={() => { setZoneOpen(false); notify('Timezone updated'); }}>Done</Button></div></Modal>
  </div>;
}

export type ThemeChoice = 'system' | 'light' | 'dark';
function ThemePreview({ type }: { type: ThemeChoice }) {
  return <div className={`theme-mini theme-mini-${type}`} aria-hidden="true"><div className="mini-chrome"><i /><i /><i /></div><div className="mini-sidebar"><b /><b /><b /></div><div className="mini-content"><i /><i /><i /><i /></div>{type === 'system' && <div className="mini-dark-half"><div className="mini-chrome"><i /><i /><i /></div><div className="mini-sidebar"><b /><b /><b /></div><div className="mini-content"><i /><i /><i /><i /></div></div>}</div>;
}
export function AppearanceScreen({ theme, setTheme, notify, setBrandColors, colors }: { theme: ThemeChoice; setTheme: (theme: ThemeChoice) => void; notify: (message: string) => void; colors: { light: string; dark: string }; setBrandColors: (colors: { light: string; dark: string }) => void }) {
  const [light, setLight] = useState(colors.light);
  const [dark, setDark] = useState(colors.dark);
  const [error, setError] = useState('');
  useEffect(() => { setLight(colors.light); setDark(colors.dark); }, [colors]);
  function saveColors() {
    if (!/^#[0-9a-f]{6}$/i.test(light) || !/^#[0-9a-f]{6}$/i.test(dark)) { setError('Enter a six-digit hex color, such as #000000.'); return; }
    setBrandColors({ light, dark }); setError(''); notify('Appearance updated');
  }
  return <div className="page-content appearance-page"><div className="settings-breadcrumb"><span>Home</span><ChevronRight size={13} /><span>Settings</span><ChevronRight size={13} /><strong>Appearance</strong></div><PageHeader title="Appearance" />
    <section className="appearance-section"><h2>Theme</h2><p>Choose the theme you prefer to customise the application.</p><div className="theme-options">{(['system', 'light', 'dark'] as const).map(type => <button key={type} className={`theme-option ${theme === type ? 'selected' : ''}`} onClick={() => setTheme(type)} aria-pressed={theme === type}><ThemePreview type={type} /><span>{type === 'system' ? 'System default' : type === 'light' ? 'Light' : 'Dark'}</span></button>)}</div></section>
    <section className="appearance-section brand-section"><h2>Custom brand colors</h2><p>Customize your own brand colors.</p><div className="brand-fields">{[{ label: 'Brand color (Light theme)', value: light, change: setLight }, { label: 'Brand color (Dark theme)', value: dark, change: setDark }].map(field => <label className="brand-field" key={field.label}><span>{field.label}</span><div className="color-input-group"><input type="color" aria-label={`${field.label} picker`} value={/^#[0-9a-f]{6}$/i.test(field.value) ? field.value : '#000000'} onChange={e => field.change(e.target.value.toUpperCase())} /><input value={field.value} aria-label={field.label} maxLength={7} onChange={e => field.change(e.target.value)} spellCheck={false} /></div></label>)}</div>{error && <p role="alert" className="form-error">{error}</p>}<Button variant="primary" className="update-appearance" onClick={saveColors}>Update</Button></section>
  </div>;
}

export function GeneralScreen({ notify }: { notify: (message: string) => void }) {
  const [settings, setSettings] = useStoredState('general', { name: 'Personal', url: 'personal', notifications: true, digest: false });
  return <div className="page-content general-page"><PageHeader title="General" description="A few details that make this workspace yours." /><section className="general-section"><h2>Workspace details</h2><form onSubmit={e => { e.preventDefault(); notify('Workspace settings saved'); }}><label>Workspace name<input value={settings.name} required maxLength={60} onChange={e => setSettings(s => ({ ...s, name: e.target.value }))} /></label><label>Workspace URL<div className="url-field"><span>appleui.app/</span><input value={settings.url} pattern="[a-z0-9-]+" title="Use lowercase letters, numbers, and hyphens" required onChange={e => setSettings(s => ({ ...s, url: e.target.value }))} /></div></label><p className="local-note">Settings are stored locally in this demo.</p><Button type="submit" variant="primary">Save changes</Button></form></section><section className="general-section"><h2>Notifications</h2><div className="preference-row"><Bell size={19} /><div><strong>Desktop notifications</strong><p>Show updates while you’re using the workspace.</p></div><button className={`switch ${settings.notifications ? 'on' : ''}`} role="switch" aria-checked={settings.notifications} aria-label="Desktop notifications" onClick={() => setSettings(s => ({ ...s, notifications: !s.notifications }))}><i /></button></div><div className="preference-row"><Monitor size={19} /><div><strong>Weekly digest</strong><p>Keep a summary of your week in your workspace.</p></div><button className={`switch ${settings.digest ? 'on' : ''}`} role="switch" aria-checked={settings.digest} aria-label="Weekly digest" onClick={() => setSettings(s => ({ ...s, digest: !s.digest }))}><i /></button></div></section><div className="general-footnote"><CircleUserRound size={16} />Personal workspace · Local preview</div></div>;
}

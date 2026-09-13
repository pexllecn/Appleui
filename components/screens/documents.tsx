'use client';

import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { ChevronDown, Copy, Download, MoreHorizontal, Pencil, RotateCcw, Search, Trash2, X } from 'lucide-react';
import { Button, EmptyState, IconButton, Modal, PageHeader, downloadFile } from '@/components/ui';
import { useStoredState } from '@/lib/storage';
import './documents.css';

type Document = { id: string; title: string; content: string; updated: string; trashed: boolean };
const today = '2026-04-24T12:00:00.000Z';
const initialDocuments: Document[] = [
  { id: 'first-draft', title: 'First draft', content: "This document is your space to explore early ideas, jot down thoughts, and experiment with structure. It’s meant to evolve over time, start messy, refine as you go, and build something meaningful.\n\nA few ideas to explore\n\nWhat are we trying to make simpler?\nWho are we creating this for?\nWhat would a thoughtful first version look like?", updated: today, trashed: false },
  { id: 'meeting-notes', title: 'Meeting notes', content: 'Keep track of everything discussed during your meetings, from important decisions to action items and follow-ups. Having it all in one place ensures clarity and helps everyone stay aligned.\n\nDiscussion\nReview our priorities for the week and share progress.\n\nNext steps\nGather feedback on the first draft.\nSchedule a short review with the team.', updated: today, trashed: false },
  { id: 'project-checklist', title: 'Project checklist', content: 'Use this document to organize your workflow, break down complex goals into actionable tasks, and track your progress. It’s a simple yet powerful way to stay on top of what needs to get done.\n\n☐ Define the project scope\n☐ Gather references and inspiration\n☐ Create the first draft\n☐ Review with the team\n☐ Make final refinements\n☐ Share the finished work', updated: today, trashed: false },
  { id: 'shared-document', title: 'Shared document', content: "This file is open to collaboration, allowing your team to contribute, comment, and edit together in real time. Whether you're drafting content, collecting feedback, or planning something big, it starts with a shared idea.\n\nTeam notes\nUse this sample document to collect ideas in one place. Changes in this workspace are saved on your device.", updated: today, trashed: false },
  { id: 'personal-notes', title: 'Personal notes', content: "Capture your thoughts, reflections, or quick ideas in a space that’s just for you. It’s perfect for brainstorming, writing privately, or saving anything you’re not quite ready to share yet.\n\nMake room for small ideas.\nGive yourself time to think.\nKeep the things that matter close.", updated: today, trashed: false },
];

export function DocumentsScreen({ notify }: { notify: (message: string) => void }) {
  const [documents, setDocuments] = useStoredState<Document[]>('documents', initialDocuments);
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [period, setPeriod] = useState('all');
  const [trash, setTrash] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [editing, setEditing] = useState<Document | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const uploadRef = useRef<HTMLInputElement>(null);
  const visible = documents.filter(document => {
    if (document.trashed !== trash || !`${document.title} ${document.content}`.toLowerCase().includes(query.toLowerCase().trim())) return false;
    if (period === 'today') return new Date(document.updated).toDateString() === new Date().toDateString();
    if (period === 'week') return Date.now() - new Date(document.updated).getTime() < 7 * 24 * 60 * 60 * 1000;
    return true;
  });
  const trashCount = documents.filter(document => document.trashed).length;
  function openEditor(document?: Document) {
    setEditing(document || null); setTitle(document?.title || ''); setContent(document?.content || ''); setShowEditor(true); setMenu(null);
  }
  function saveDocument(event: FormEvent) {
    event.preventDefault();
    if (!title.trim()) return;
    const saved: Document = { id: editing?.id || crypto.randomUUID(), title: title.trim(), content, updated: new Date().toISOString(), trashed: false };
    setDocuments(current => editing ? current.map(document => document.id === editing.id ? saved : document) : [...current, saved]);
    setShowEditor(false); setTrash(false);
    notify(editing ? 'Document saved' : 'New document created');
  }
  async function uploadDocuments(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    const supported = files.filter(file => /\.(txt|md|markdown|csv)$/i.test(file.name) || file.type.startsWith('text/'));
    if (!supported.length) { notify('Choose a text, Markdown, or CSV file'); event.target.value = ''; return; }
    try {
      const uploaded = await Promise.all(supported.map(async file => ({ id: crypto.randomUUID(), title: file.name.replace(/\.[^.]+$/, ''), content: await file.text(), updated: new Date().toISOString(), trashed: false })));
      setDocuments(current => [...current, ...uploaded]); setTrash(false); setPeriod('all'); setQuery('');
      notify(`${uploaded.length === 1 ? 'Document' : `${uploaded.length} documents`} uploaded${supported.length !== files.length ? '; unsupported files skipped' : ''}`);
    } catch { notify('The file could not be read. Please try again.'); }
    event.target.value = '';
  }
  function moveToTrash(document: Document) {
    setDocuments(current => current.map(item => item.id === document.id ? { ...item, trashed: !document.trashed } : item));
    setMenu(null); notify(document.trashed ? 'Document restored' : 'Moved to Trash. You can restore it anytime.');
  }
  function duplicate(document: Document) {
    setDocuments(current => [...current, { ...document, id: crypto.randomUUID(), title: `${document.title} copy`, updated: new Date().toISOString() }]);
    setMenu(null); notify('Document duplicated');
  }
  function download(document: Document) { downloadFile(`${document.title.replace(/[/\\?%*:|"<>]/g, '-')}.txt`, document.content, 'text/plain;charset=utf-8'); setMenu(null); notify('Document downloaded'); }

  return <div className="page-content documents-page">
    <PageHeader title={trash ? 'Trash' : 'Documents'} action={<><Button className="document-upload" onClick={() => uploadRef.current?.click()}>Upload file</Button><Button variant="primary" onClick={() => openEditor()}>New document</Button></>} />
    <input ref={uploadRef} type="file" accept=".txt,.md,.markdown,.csv,text/plain,text/markdown,text/csv" multiple hidden onChange={uploadDocuments} aria-label="Upload documents" />
    <div className="documents-toolbar">
      {searchOpen ? <label className="document-search"><Search size={16} /><input autoFocus aria-label="Search documents" placeholder="Search documents" value={query} onChange={event => setQuery(event.target.value)} /><button type="button" aria-label="Close document search" onClick={() => { setSearchOpen(false); setQuery(''); }}><X size={15} /></button></label> : <IconButton label="Search documents" className="document-search-toggle" onClick={() => setSearchOpen(true)}><Search size={17} /></IconButton>}
      <label className="document-period"><select aria-label="Filter documents by date" value={period} onChange={event => setPeriod(event.target.value)}><option value="all">All time</option><option value="today">Today</option><option value="week">This week</option></select><ChevronDown size={14} /></label>
      <button type="button" className={`documents-trash-toggle ${trash ? 'active' : ''}`} onClick={() => { setTrash(!trash); setMenu(null); setPeriod('all'); }}>{trash ? <><RotateCcw size={14} />Back to documents</> : <><Trash2 size={14} />Trash{trashCount > 0 && <span>{trashCount}</span>}</>}</button>
    </div>
    {visible.length ? <div className="documents-grid">{visible.map(document => <article key={document.id} className="document-card">
      <button type="button" className="document-card-content" onClick={() => trash ? moveToTrash(document) : openEditor(document)} aria-label={trash ? `Restore ${document.title}` : `Edit ${document.title}`}><h2>{document.title}</h2><p>{document.content}</p></button>
      <div className="document-card-footer"><time dateTime={document.updated}>{new Date(document.updated).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</time><div className="document-menu-wrap"><IconButton label={`Actions for ${document.title}`} aria-expanded={menu === document.id} onClick={() => setMenu(menu === document.id ? null : document.id)}><MoreHorizontal size={17} /></IconButton>{menu === document.id && <div className="document-menu">{trash ? <button type="button" onClick={() => moveToTrash(document)}><RotateCcw size={14} />Restore document</button> : <><button type="button" onClick={() => openEditor(document)}><Pencil size={14} />Edit document</button><button type="button" onClick={() => duplicate(document)}><Copy size={14} />Duplicate</button><button type="button" onClick={() => download(document)}><Download size={14} />Download text</button><button type="button" className="document-trash-action" onClick={() => moveToTrash(document)}><Trash2 size={14} />Move to Trash</button></>}</div>}</div></div>
    </article>)}</div> : <EmptyState title={trash ? 'Trash is empty' : query || period !== 'all' ? 'No documents found' : 'A little room for your ideas'} description={trash ? 'Documents you move to Trash will appear here. You can restore them anytime.' : query || period !== 'all' ? 'Try a different search or choose another time period.' : 'Create your first document or upload a text file to get started.'}>{query || period !== 'all' ? <Button onClick={() => { setQuery(''); setPeriod('all'); }}>Clear filters</Button> : !trash && <Button onClick={() => openEditor()} variant="primary">New document</Button>}</EmptyState>}
    <Modal open={showEditor} onClose={() => setShowEditor(false)} title={editing ? 'Edit document' : 'New document'} className="document-editor">
      <form className="document-form" onSubmit={saveDocument}><label>Title<input autoFocus required value={title} placeholder="Untitled document" onChange={event => setTitle(event.target.value)} /></label><label>Document<textarea rows={12} value={content} placeholder="Start with a thought…" onChange={event => setContent(event.target.value)} /></label><div className="document-editor-bottom"><span>Saved on this device</span><div><Button onClick={() => setShowEditor(false)}>Cancel</Button><Button type="submit" variant="primary">{editing ? 'Save changes' : 'Create document'}</Button></div></div></form>
    </Modal>
  </div>;
}

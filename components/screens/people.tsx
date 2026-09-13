'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { ArrowDownUp, Check, ChevronDown, Download, ListFilter, Plus, Search, X } from 'lucide-react';
import { Avatar, Badge, Button, EmptyState, Modal, PageHeader, downloadFile } from '@/components/ui';
import { useStoredState } from '@/lib/storage';
import './people.css';

type Strength = 'Weak' | 'Good' | 'Strong';
type Person = { id: string; name: string; strength: Strength; followers: number; email: string; description: string };
type View = 'Table view' | 'Kanban view' | 'List view';
const records: Person[] = [
  { id: 'evelyn', name: 'Evelyn Harper', strength: 'Weak', followers: 45332, email: 'evelyn.harper@gmail.com', description: 'CEO of Harper & Co., a business consulting studio.' },
  { id: 'lucas', name: 'Lucas Bennett', strength: 'Strong', followers: 12928, email: 'lucas.bennett@gmail.com', description: 'CTO of TechWave Innovations, a technology company.' },
  { id: 'sophia', name: 'Sophia Whitfield', strength: 'Good', followers: 6534, email: 'sophia.whitfield@gmail.com', description: 'Marketing Director at Whitfield Media.' },
  { id: 'james', name: 'James Aldridge', strength: 'Good', followers: 22563, email: 'james.aldridge@gmail.com', description: 'Founder and CEO of Aldridge Ventures.' },
  { id: 'amelia', name: 'Amelia Langston', strength: 'Strong', followers: 88938, email: 'amelia.langston@gmail.com', description: 'COO of GreenLife Solutions, a company building a greener future.' },
  { id: 'oliver', name: 'Oliver Thornton', strength: 'Good', followers: 4837, email: 'oliver.thornton@gmail.com', description: 'Chief Product Officer at Thornton Technologies.' },
  { id: 'grace', name: 'Grace Willoughby', strength: 'Weak', followers: 8373, email: 'grace.willoughby@gmail.com', description: 'Head of Customer Success at Willow.' },
  { id: 'ethan', name: 'Ethan Caldwell', strength: 'Strong', followers: 10382, email: 'ethan.caldwell@gmail.com', description: 'CEO of Caldwell Industries, an independent design company.' },
  { id: 'lily', name: 'Lily Prescott', strength: 'Strong', followers: 34938, email: 'lily.prescott@gmail.com', description: 'Chief Financial Officer at Prescott Group.' },
  { id: 'noah', name: 'Noah Havers', strength: 'Strong', followers: 93928, email: 'noah.havers@gmail.com', description: 'VP of Sales at Havers Corp., a leading software company.' },
  { id: 'chloe', name: 'Chloe Marlowe', strength: 'Good', followers: 54246, email: 'chloe.marlowe@gmail.com', description: 'Chief Design Officer at Marlowe Creative.' },
  { id: 'henry', name: 'Henry Cartwright', strength: 'Weak', followers: 22958, email: 'henry.cartwright@gmail.com', description: 'CEO of Cartwright Enterprises, a multidisciplinary studio.' },
];
const blankPerson: Omit<Person, 'id'> = { name: '', strength: 'Good', followers: 0, email: '', description: '' };
const strengths: Strength[] = ['Weak', 'Good', 'Strong'];
function Connection({ strength }: { strength: Strength }) {
  return <Badge tone={strength === 'Strong' ? 'green' : strength === 'Good' ? 'blue' : 'red'}>{strength}</Badge>;
}

export function PeopleScreen({ notify }: { notify: (message: string) => void }) {
  const [people, setPeople] = useStoredState<Person[]>('people', records);
  const [view, setView] = useState<View>('Table view');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Strength[]>([]);
  const [sort, setSort] = useState('original');
  const [menu, setMenu] = useState<'filter' | 'sort' | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [editing, setEditing] = useState<Person | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(blankPerson);
  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();
    const result = people.filter(person => (!query || `${person.name} ${person.email} ${person.description}`.toLowerCase().includes(query)) && (!filters.length || filters.includes(person.strength)));
    if (sort === 'asc') result.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'desc') result.sort((a, b) => b.name.localeCompare(a.name));
    if (sort === 'followers') result.sort((a, b) => b.followers - a.followers);
    return result;
  }, [people, search, filters, sort]);
  const allSelected = visible.length > 0 && visible.every(person => selected.includes(person.id));
  const toggleSelection = (id: string) => setSelected(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  function openPerson(person?: Person) {
    setEditing(person || null);
    setForm(person ? { name: person.name, strength: person.strength, followers: person.followers, email: person.email, description: person.description } : { ...blankPerson });
    setShowForm(true);
    setMenu(null);
  }
  function savePerson(event: FormEvent) {
    event.preventDefault();
    if (!form.name.trim()) return;
    const saved: Person = { ...form, name: form.name.trim(), email: form.email.trim(), id: editing?.id || crypto.randomUUID() };
    setPeople(current => editing ? current.map(person => person.id === editing.id ? saved : person) : [...current, saved]);
    setShowForm(false);
    notify(editing ? 'Person updated' : `${saved.name} added to People`);
  }
  function exportPeople() {
    const list = selected.length ? people.filter(person => selected.includes(person.id)) : visible;
    const escape = (value: string | number) => `"${String(value).replaceAll('"', '""')}"`;
    const content = [['Name', 'Connection strength', 'IG Followers', 'Email address', 'Description'].map(escape).join(','), ...list.map(person => [person.name, person.strength, person.followers, person.email, person.description].map(escape).join(','))].join('\r\n');
    downloadFile('people.csv', content, 'text/csv;charset=utf-8');
    notify(`${list.length} ${list.length === 1 ? 'person' : 'people'} exported`);
  }

  return <div className="page-content people-page">
    <PageHeader title={<>People <span className="people-count">{people.length.toLocaleString('en-US')}</span></>} action={<Button variant="primary" onClick={() => openPerson()}><Plus size={16} />Add person</Button>} />
    <div className="people-tabs" role="tablist" aria-label="People view">{(['Table view', 'Kanban view', 'List view'] as View[]).map(item => <button type="button" key={item} role="tab" aria-selected={view === item} className={view === item ? 'active' : ''} onClick={() => setView(item)}>{item}</button>)}</div>
    <div className="people-toolbar">
      <label className="people-search"><Search size={15} /><input aria-label="Search people" placeholder="Search" value={search} onChange={event => setSearch(event.target.value)} />{search && <button type="button" aria-label="Clear people search" onClick={() => setSearch('')}><X size={13} /></button>}</label>
      <div className="people-menu-wrap">
        <Button aria-expanded={menu === 'filter'} onClick={() => setMenu(menu === 'filter' ? null : 'filter')}><ListFilter size={15} />Filter{filters.length > 0 && <span className="toolbar-count">{filters.length}</span>}</Button>
        {menu === 'filter' && <div className="people-popover"><p>Connection strength</p>{strengths.map(strength => <label key={strength}><input type="checkbox" checked={filters.includes(strength)} onChange={() => setFilters(current => current.includes(strength) ? current.filter(item => item !== strength) : [...current, strength])} /><Connection strength={strength} /></label>)}<button type="button" className="people-menu-action" onClick={() => { setFilters([]); setMenu(null); }}>Clear filters</button></div>}
      </div>
      <div className="people-menu-wrap">
        <Button aria-expanded={menu === 'sort'} onClick={() => setMenu(menu === 'sort' ? null : 'sort')}><ArrowDownUp size={15} />{sort === 'desc' ? 'Sort: Z - A' : sort === 'followers' ? 'Sort: Followers' : 'Sort: A - Z'}<ChevronDown size={14} /></Button>
        {menu === 'sort' && <div className="people-popover sort-popover">{[['original', 'Original order'], ['asc', 'Name: A to Z'], ['desc', 'Name: Z to A'], ['followers', 'Most followers']].map(([value, label]) => <button type="button" className="people-menu-action" key={value} onClick={() => { setSort(value); setMenu(null); }}>{label}{sort === value && <Check size={14} />}</button>)}</div>}
      </div>
      {selected.length > 0 && <button type="button" className="people-selection" onClick={() => setSelected([])}>{selected.length} selected<X size={13} /></button>}
      <Button className="people-export" onClick={exportPeople} disabled={!visible.length && !selected.length}><Download size={15} />Export<ChevronDown size={14} /></Button>
    </div>
    {visible.length === 0 ? <EmptyState title="No people found" description="Try another search or adjust your connection filters."><Button onClick={() => { setSearch(''); setFilters([]); }}>Clear search and filters</Button></EmptyState> : view === 'Table view' ?
      <div className="people-table-scroll"><table className="people-table"><colgroup><col className="check-col" /><col className="name-col" /><col className="strength-col" /><col className="followers-col" /><col className="email-col" /><col className="description-col" /></colgroup><thead><tr><th><input type="checkbox" aria-label="Select all visible people" checked={allSelected} onChange={() => setSelected(current => allSelected ? current.filter(id => !visible.some(person => person.id === id)) : [...new Set([...current, ...visible.map(person => person.id)])])} /></th><th scope="col">Name</th><th scope="col">Connection strength</th><th scope="col">IG Followers</th><th scope="col">Email address</th><th scope="col">Description</th></tr></thead><tbody>{visible.map(person => <tr key={person.id} className={selected.includes(person.id) ? 'is-selected' : ''}><td><input type="checkbox" aria-label={`Select ${person.name}`} checked={selected.includes(person.id)} onChange={() => toggleSelection(person.id)} /></td><td><button type="button" className="person-name" onClick={() => openPerson(person)}>{person.name}</button></td><td><Connection strength={person.strength} /></td><td>{person.followers.toLocaleString('en-US')}</td><td><span className="cell-ellipsis" title={person.email}>{person.email}</span></td><td><span className="cell-ellipsis" title={person.description}>{person.description}</span></td></tr>)}</tbody></table></div> : view === 'Kanban view' ?
      <div className="people-kanban">{strengths.map(strength => <section key={strength} className="people-column"><header><Connection strength={strength} /><span>{visible.filter(person => person.strength === strength).length}</span></header>{visible.filter(person => person.strength === strength).map(person => <button type="button" className="person-kanban-card" onClick={() => openPerson(person)} key={person.id}><strong>{person.name}</strong><span>{person.description}</span><small>{person.email}</small><span className="person-card-followers">{person.followers.toLocaleString('en-US')} followers</span></button>)}</section>)}</div> :
      <div className="people-list">{visible.map(person => <button type="button" key={person.id} className="person-list-row" onClick={() => openPerson(person)}><Avatar name={person.name} /><span className="person-list-copy"><strong>{person.name}</strong><span>{person.email}</span></span><span className="person-list-description">{person.description}</span><Connection strength={person.strength} /></button>)}</div>}
    <p className="people-footnote">{visible.length === people.length ? `${people.length} people` : `${visible.length} of ${people.length} people`}</p>
    <Modal open={showForm} onClose={() => setShowForm(false)} title={editing ? 'Edit person' : 'Add person'}>
      <form className="people-form" onSubmit={savePerson}>
        <label>Full name<input autoFocus required value={form.name} placeholder="e.g. Alex Morgan" onChange={event => setForm({ ...form, name: event.target.value })} /></label>
        <label>Email address<input type="email" value={form.email} placeholder="alex@example.com" onChange={event => setForm({ ...form, email: event.target.value })} /></label>
        <div className="people-form-pair"><label>Connection strength<select value={form.strength} onChange={event => setForm({ ...form, strength: event.target.value as Strength })}>{strengths.map(strength => <option key={strength}>{strength}</option>)}</select></label><label>Instagram followers<input type="number" min="0" step="1" value={form.followers} onChange={event => setForm({ ...form, followers: Math.max(0, Number(event.target.value)) })} /></label></div>
        <label>Description<textarea rows={3} value={form.description} placeholder="A little about this person…" onChange={event => setForm({ ...form, description: event.target.value })} /></label>
        <div className="people-form-actions"><Button onClick={() => setShowForm(false)}>Cancel</Button><Button variant="primary" type="submit">{editing ? 'Save changes' : 'Add person'}</Button></div>
      </form>
    </Modal>
  </div>;
}

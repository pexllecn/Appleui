'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowUp, BadgeCheck, Bookmark, Check, ChevronDown, Heart, House, MessageCircle, MoreHorizontal, Search, Sparkles } from 'lucide-react';
import { Button, IconButton, Modal } from '../ui';
import { useStoredState } from '../../lib/storage';
import './social.css';

type Message = { id: string; text: string; mine: boolean; reaction?: string };
type Contact = { id: string; name: string; photo: string; preview: string; time: string; online: boolean };
type Post = { id: string; name: string; photo: string; caption: string; likes: number; comments: string; saves: string; category: string };
const photos = {
  alex: 'photo-1506794778202-cad84cf45f1d', maya: 'photo-1524504388940-b1c1722653e1', michael: 'photo-1500648767791-00dcc994a43e',
  emily: 'photo-1534528741775-53994a69daeb', sarah: 'photo-1531123897727-8f129e1688ce', david: 'photo-1517841905240-472988babdf9',
  john: 'photo-1506794778202-cad84cf45f1d', jessica: 'photo-1524504388940-b1c1722653e1', james: 'photo-1535713875002-d1d0cf377fde',
};
const contacts: Contact[] = [
  { id: 'michael', name: 'Michael Thompson', photo: photos.michael, preview: 'The new collaboration is fire! We should listen to it together soon.', time: '5:02 PM', online: false },
  { id: 'emily', name: 'Emily Davis', photo: photos.emily, preview: "I just listened to the new album, and I can’t believe how amazing it is!", time: '2:30 PM', online: true },
  { id: 'sarah', name: 'Sarah Johnson', photo: photos.sarah, preview: 'I found some awesome merchandise from my favorite artist! Can’t wait to show you!', time: '11:15 AM', online: true },
  { id: 'david', name: 'David Miller', photo: photos.david, preview: "I heard there’s a new artist dropping a single this Friday. Excited to see what it’s like.", time: '9:07 AM', online: false },
  { id: 'john', name: 'John Anderson', photo: photos.john, preview: 'Did you catch the concert last night? It was insane! I can’t wait to hear the new album.', time: 'Yesterday', online: true },
  { id: 'jessica', name: 'Jessica Brown', photo: photos.jessica, preview: 'I just finished the documentary about hip-hop history. You have to check it out!', time: 'Yesterday', online: false },
  { id: 'james', name: 'James Wilson', photo: photos.james, preview: 'Looking forward to the music festival next month! It’s going to be epic!', time: 'Yesterday', online: true },
];
const posts: Post[] = [
  { id: 'alex', name: 'Alex Morgan', photo: photos.alex, caption: 'After hours. The new record, out Friday at midnight.', likes: 610000, comments: '2,910', saves: '324K', category: 'From your artists' },
  { id: 'maya', name: 'Maya Lane', photo: photos.maya, caption: 'A little closer to the music. See you on the road this summer.', likes: 423000, comments: '4,246', saves: '217K', category: 'Picked for you' },
];
const initialMessages: Record<string, Message[]> = {
  michael: [
    { id: 'm1', text: 'I can’t get enough of it! We should listen to it together soon!', mine: false },
    { id: 'm2', text: 'Absolutely! I love their vibe together. Which song is your favorite?', mine: true },
    { id: 'm3', text: 'I really like the beat on “Life Is Good.” It’s such a banger!', mine: false, reaction: '😍' },
    { id: 'm4', text: 'That one’s a classic! I’ve been playing it on repeat. Are you planning to go to the concert next month?', mine: true },
    { id: 'm5', text: 'For sure! I already got my tickets. Can’t wait to see them live!', mine: false },
    { id: 'm6', text: 'Nice! Let’s make it a group thing. I can invite a few friends too!', mine: true },
    { id: 'm7', text: 'Sounds great! The more, the merrier.', mine: false },
    { id: 'm8', text: 'Looking forward to it!', mine: false, reaction: '👍' },
  ],
};
const photoUrl = (id: string, width = 96) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

function UserPhoto({ photo, name, online, size = 42 }: { photo: string; name: string; online?: boolean; size?: number }) {
  const [failed, setFailed] = useState(false);
  return <span className="social-avatar" style={{ width: size, height: size }} aria-hidden="true">{failed ? name.split(' ').map(part => part[0]).join('') : <Image src={photoUrl(photo)} alt="" width={size} height={size} unoptimized onError={() => setFailed(true)} />}{online !== undefined && <i className={online ? 'social-online' : 'social-offline'} />}</span>;
}

export function SocialScreen({ notify }: { notify: (message: string) => void }) {
  const [tab, setTab] = useState<'home' | 'discover' | 'chat'>('home');
  const [selectedId, setSelectedId] = useState('michael');
  const [chatOpen, setChatOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useStoredState<Record<string, Message[]>>('social-messages', initialMessages);
  const [likes, setLikes] = useStoredState<string[]>('social-likes', []);
  const [saved, setSaved] = useStoredState<string[]>('social-saved', []);
  const [following, setFollowing] = useStoredState<string[]>('social-following', ['alex']);
  const [hidden, setHidden] = useState<string[]>([]);
  const [postMenu, setPostMenu] = useState<string | null>(null);
  const [commentPost, setCommentPost] = useState<Post | null>(null);
  const [comments, setComments] = useStoredState<Record<string, string[]>>('social-comments', {});
  const [commentDraft, setCommentDraft] = useState('');
  const chatEnd = useRef<HTMLDivElement>(null);
  const selected = contacts.find(contact => contact.id === selectedId) || contacts[0];
  const activeMessages = messages[selectedId] || [{ id: `${selectedId}-initial`, text: selected.preview, mine: false }];
  const visibleContacts = contacts.filter(contact => contact.name.toLowerCase().includes(search.toLowerCase()));
  const visiblePosts = (tab === 'discover' ? [...posts].reverse() : posts).filter(post => !hidden.includes(post.id));
  useEffect(() => { chatEnd.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }, [selectedId, messages]);
  useEffect(() => {
    if (!postMenu) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setPostMenu(null); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [postMenu]);
  function toggleSaved(id: string) {
    const isSaved = saved.includes(id);
    setSaved(old => isSaved ? old.filter(item => item !== id) : [...old, id]);
    notify(isSaved ? 'Post removed from saved posts' : 'Post saved on this device');
    setPostMenu(null);
  }
  function selectContact(contact: Contact) { setSelectedId(contact.id); setChatOpen(true); setDraft(''); }
  function sendMessage(event: FormEvent) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setMessages(old => ({ ...old, [selectedId]: [...(old[selectedId] || [{ id: `${selectedId}-initial`, text: selected.preview, mine: false }]), { id: crypto.randomUUID(), text, mine: true }] }));
    setDraft('');
  }
  function addComment(event: FormEvent) {
    event.preventDefault();
    if (!commentDraft.trim() || !commentPost) return;
    setComments(old => ({ ...old, [commentPost.id]: [...(old[commentPost.id] || []), commentDraft.trim()] }));
    setCommentDraft('');
    notify('Comment saved to this demo');
  }
  return <div className={`page-content social-screen social-tab-${tab} ${chatOpen ? 'social-chat-open' : ''}`}>
    <header className="social-page-header"><div><h1>Music</h1><p>Your artists. Your people.</p></div><span className="social-demo-label">Demo conversations</span></header>
    <nav className="social-mobile-tabs" aria-label="Music views">{[{ id: 'home', label: 'Home', icon: House }, { id: 'discover', label: 'Discover', icon: Sparkles }, { id: 'chat', label: 'Chat', icon: MessageCircle }].map(item => <button key={item.id} onClick={() => { setTab(item.id as typeof tab); if (item.id === 'chat') setChatOpen(false); }} aria-current={tab === item.id ? 'page' : undefined}><item.icon size={17} />{item.label}</button>)}</nav>
    <div className="social-layout">
      <section className="social-feed" aria-label={tab === 'discover' ? 'Discover new artists' : 'Your music feed'}>
        <header className="social-section-header"><div className="social-feed-tabs"><button className={tab !== 'discover' ? 'is-selected' : ''} onClick={() => setTab('home')}>Home</button><button className={tab === 'discover' ? 'is-selected' : ''} onClick={() => setTab('discover')}>Discover</button></div><IconButton label="Open conversations" onClick={() => { setTab('chat'); setChatOpen(false); }}><MessageCircle size={20} /></IconButton></header>
        <div className="social-posts">{visiblePosts.map(post => <article className="social-post" key={post.id}>
          <Image className="social-post-photo" src={photoUrl(post.photo, 800)} alt={`Black and white portrait of ${post.name}`} fill unoptimized sizes="(max-width: 700px) 100vw, 400px" priority={post.id === 'alex'} />
          <div className="social-post-top"><span>{post.category}</span><div className="social-post-menu-anchor"><IconButton label={`More options for ${post.name}’s post`} aria-expanded={postMenu === post.id} onClick={() => setPostMenu(old => old === post.id ? null : post.id)}><MoreHorizontal size={18} /></IconButton>{postMenu === post.id && <div className="social-post-menu"><button onClick={() => toggleSaved(post.id)}><Bookmark size={14} />{saved.includes(post.id) ? 'Unsave post' : 'Save post'}</button><button onClick={() => { setHidden(old => [...old, post.id]); setPostMenu(null); }}>Hide this post</button></div>}</div></div>
          <div className="social-post-caption"><div className="social-artist"><UserPhoto photo={post.photo} name={post.name} size={23} /><strong>{post.name}</strong><BadgeCheck size={14} className="social-verified" aria-label="Demo verified artist" /><button className={`social-follow ${following.includes(post.id) ? 'is-following' : ''}`} aria-pressed={following.includes(post.id)} onClick={() => setFollowing(old => old.includes(post.id) ? old.filter(id => id !== post.id) : [...old, post.id])}>{following.includes(post.id) ? <><Check size={11} />Following</> : 'Follow'}</button></div><p>{post.caption}</p><div className="social-post-actions"><button aria-label={`${likes.includes(post.id) ? 'Unlike' : 'Like'} ${post.name}’s post`} aria-pressed={likes.includes(post.id)} className={likes.includes(post.id) ? 'is-liked' : ''} onClick={() => setLikes(old => old.includes(post.id) ? old.filter(id => id !== post.id) : [...old, post.id])}><Heart size={16} fill={likes.includes(post.id) ? 'currentColor' : 'white'} />{likes.includes(post.id) ? (post.likes + 1).toLocaleString('en-US') : (post.likes / 1000).toFixed(0) + 'K'}</button><button aria-label={`Open comments on ${post.name}’s post`} onClick={() => setCommentPost(post)}><MessageCircle size={16} />{comments[post.id]?.length ? (Number(post.comments.replace(',', '')) + comments[post.id].length).toLocaleString('en-US') : post.comments}</button><button aria-label={`${saved.includes(post.id) ? 'Unsave' : 'Save'} ${post.name}’s post`} aria-pressed={saved.includes(post.id)} onClick={() => toggleSaved(post.id)}><Bookmark size={15} fill={saved.includes(post.id) ? 'currentColor' : 'none'} />{post.saves}</button></div></div>
        </article>)}{hidden.length > 0 && <Button variant="ghost" className="social-restore" onClick={() => setHidden([])}>Show hidden posts</Button>}</div>
      </section>
      <section className="social-conversations" aria-label="Conversations"><header className="social-section-header"><h2>Chat <span className="social-unread">1</span></h2><span className="social-chat-subtitle">Your people</span></header><label className="social-search"><Search size={16} /><input aria-label="Search conversations" placeholder="Search" value={search} onChange={event => setSearch(event.target.value)} /></label><div className="social-contact-list">{visibleContacts.length ? visibleContacts.map((contact, index) => {
        const recent = messages[contact.id]?.at(-1);
        const hasNewMessage = recent?.mine && !recent.id.startsWith('m');
        return <button key={contact.id} className={`social-contact ${selectedId === contact.id ? 'is-selected' : ''}`} onClick={() => selectContact(contact)} aria-label={`Open conversation with ${contact.name}`}><UserPhoto photo={contact.photo} name={contact.name} online={contact.online} size={43} /><span className="social-contact-copy"><span className="social-contact-title"><strong>{contact.name}</strong><time>{hasNewMessage ? 'Now' : contact.time}</time></span><span className={index === 0 ? 'social-preview-unread' : ''}>{hasNewMessage ? `You: ${recent.text}` : contact.preview}</span></span></button>;
      }) : <p className="social-no-results">No conversations found for “{search}”.</p>}</div><p className="social-local-note">Messages stay on this device.</p></section>
      <section className="social-chat" aria-label={`Demo conversation with ${selected.name}`}>
        <header className="social-chat-header"><IconButton label="Back to conversations" className="social-chat-back" onClick={() => setChatOpen(false)}><ArrowLeft size={18} /></IconButton><UserPhoto photo={selected.photo} name={selected.name} size={34} /><div><h2>{selected.name}</h2><span>{selected.online ? 'Online in demo' : 'Active 2m ago · demo'}</span></div><IconButton label="Choose conversation" className="social-chat-switch" onClick={() => { setChatOpen(false); setTab('chat'); }}><ChevronDown size={16} /></IconButton></header>
        <div className="social-messages" role="log" aria-label="Conversation messages" aria-live="polite"><div className="social-conversation-date">Today, 5:02 PM</div>{activeMessages.map(message => <div className={`social-message-row ${message.mine ? 'is-mine' : ''} ${message.reaction ? 'has-reaction' : ''}`} key={message.id}><div className="social-message">{message.text}{message.reaction && <span className="social-reaction" aria-label={`Reaction ${message.reaction}`}>{message.reaction}</span>}</div></div>)}<div ref={chatEnd} /></div>
        <form className="social-composer" onSubmit={sendMessage}><input aria-label={`Demo message to ${selected.name}`} placeholder="Message…" value={draft} maxLength={2000} onChange={event => setDraft(event.target.value)} /><button type="submit" aria-label="Add message to demo conversation" disabled={!draft.trim()}><ArrowUp size={18} /></button></form>
        <span className="social-composer-note">Local demo · no messages are sent</span>
      </section>
    </div>
    <Modal open={commentPost !== null} onClose={() => setCommentPost(null)} title={`Comments${commentPost ? ` · ${commentPost.name}` : ''}`} className="social-comments-modal"><p className="social-comments-intro">Add a thought to this demo post.</p><div className="social-comment-list">{commentPost && (comments[commentPost.id] || []).map((comment, index) => <div className="social-comment" key={index}><span className="social-comment-avatar">Y</span><div><strong>You <small>· on this device</small></strong><p>{comment}</p></div></div>)}{commentPost && !comments[commentPost.id]?.length && <div className="social-comments-empty"><MessageCircle size={24} /><p>Start the conversation.</p></div>}</div><form className="social-comment-form" onSubmit={addComment}><input aria-label="Demo comment" placeholder="Add a comment…" value={commentDraft} maxLength={2000} onChange={event => setCommentDraft(event.target.value)} /><Button type="submit" variant="primary" disabled={!commentDraft.trim()}>Post</Button></form></Modal>
  </div>;
}

'use client';
import { useEffect, useRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Check, X } from 'lucide-react';

export function Button({ variant = 'secondary', className = '', children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' | 'link'; children: ReactNode }) {
  return <button type="button" className={`button button-${variant} ${className}`} {...props}>{children}</button>;
}
export function IconButton({ label, children, className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { label: string; children: ReactNode }) {
  return <button type="button" className={`icon-button ${className}`} aria-label={label} title={label} {...props}>{children}</button>;
}
export function PageHeader({ title, description, action }: { title: ReactNode; description?: ReactNode; action?: ReactNode }) {
  return <header className="page-header"><div><h1>{title}</h1>{description && <p className="page-description">{description}</p>}</div>{action && <div className="page-actions">{action}</div>}</header>;
}
export function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'green' | 'blue' | 'red' | 'purple' }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}
export function Modal({ open, onClose, title, children, className = '' }: { open: boolean; onClose: () => void; title: string; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (open && !dialog?.open) dialog?.showModal();
    if (!open && dialog?.open) dialog?.close();
  }, [open]);
  return <dialog ref={ref} className={`modal ${className}`} onCancel={onClose} onClick={e => { const rect = e.currentTarget.getBoundingClientRect(); if (e.target === e.currentTarget && (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom)) onClose(); }} aria-label={title}><div className="modal-header"><h2>{title}</h2><IconButton label="Close dialog" onClick={onClose}><X size={18} /></IconButton></div>{children}</dialog>;
}
export function EmptyState({ title, description, children }: { title: string; description: string; children?: ReactNode }) {
  return <div className="empty-state"><h3>{title}</h3><p>{description}</p>{children}</div>;
}
export function Toast({ message }: { message: string }) {
  return <div role="status" aria-live="polite" className={`toast ${message ? 'toast-visible' : ''}`}><Check size={16} />{message}</div>;
}
export function Avatar({ name, color = 'sand', size = 36 }: { name: string; color?: string; size?: number }) {
  return <span className={`avatar avatar-${color}`} style={{ width: size, height: size, fontSize: size * .33 }} aria-label={name}>{name.split(' ').map(s => s[0]).slice(0, 2).join('')}</span>;
}
export function StarMark({ className = '' }: { className?: string }) {
  return <svg className={`star-mark ${className}`} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16 2c2 10.8 3.2 12 14 14-10.8 2-12 3.2-14 14C14 19.2 12.8 18 2 16 12.8 14 14 12.8 16 2Z" /></svg>;
}
export function downloadFile(name: string, content: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const anchor = document.createElement('a'); anchor.href = url; anchor.download = name;
  document.body.appendChild(anchor); anchor.click(); anchor.remove(); URL.revokeObjectURL(url);
}

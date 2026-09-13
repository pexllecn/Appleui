'use client';
import { useEffect, useState } from 'react';

export function useStoredState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`appleui:v1:${key}`);
      if (saved !== null) setValue(JSON.parse(saved));
    } catch { /* Storage may be unavailable in private browsing. */ }
    setLoaded(true);
  }, [key]);
  useEffect(() => {
    if (loaded) {
      try { localStorage.setItem(`appleui:v1:${key}`, JSON.stringify(value)); } catch { /* Keep working in memory. */ }
    }
  }, [key, loaded, value]);
  return [value, setValue] as const;
}

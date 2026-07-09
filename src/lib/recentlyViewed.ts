import { useSyncExternalStore } from "react";

export interface RecentEntry {
  href: string;
  title: string;
  icon: string;
  visitedAt: number;
}

const STORAGE_KEY = "opsdeck-recently-viewed";
const EVENT_NAME = "opsdeck-recently-viewed-change";
const MAX_ENTRIES = 8;
const EMPTY: RecentEntry[] = [];

let cache: RecentEntry[] | null = null;

function readFromStorage(): RecentEntry[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as RecentEntry[]) : [];
  } catch {
    return [];
  }
}

function getSnapshot(): RecentEntry[] {
  if (cache === null) cache = readFromStorage();
  return cache;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener(EVENT_NAME, callback);
  return () => window.removeEventListener(EVENT_NAME, callback);
}

export function recordVisit(entry: Omit<RecentEntry, "visitedAt">): void {
  const current = getSnapshot().filter((e) => e.href !== entry.href);
  const next = [{ ...entry, visitedAt: Date.now() }, ...current].slice(0, MAX_ENTRIES);
  cache = next;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function useRecentlyViewed() {
  return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
}

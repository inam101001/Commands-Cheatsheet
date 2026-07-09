import { useSyncExternalStore } from "react";

export interface Bookmark {
  id: string;
  toolSlug: string;
  tool: string;
  cmd: string;
  desc: string;
  href: string;
}

const STORAGE_KEY = "opsdeck-bookmarks";
const EVENT_NAME = "opsdeck-bookmarks-change";
const EMPTY: Bookmark[] = [];

let cache: Bookmark[] | null = null;

function readFromStorage(): Bookmark[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Bookmark[]) : [];
  } catch {
    return [];
  }
}

function getSnapshot(): Bookmark[] {
  if (cache === null) cache = readFromStorage();
  return cache;
}

function setBookmarks(next: Bookmark[]): void {
  cache = next;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(EVENT_NAME));
}

function subscribe(callback: () => void): () => void {
  window.addEventListener(EVENT_NAME, callback);
  return () => window.removeEventListener(EVENT_NAME, callback);
}

export function isBookmarked(id: string): boolean {
  return getSnapshot().some((b) => b.id === id);
}

export function toggleBookmark(bookmark: Bookmark): void {
  const current = getSnapshot();
  const exists = current.some((b) => b.id === bookmark.id);
  setBookmarks(exists ? current.filter((b) => b.id !== bookmark.id) : [...current, bookmark]);
}

export function removeBookmark(id: string): void {
  setBookmarks(getSnapshot().filter((b) => b.id !== id));
}

export function useBookmarks() {
  const bookmarks = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
  return { bookmarks, toggleBookmark, removeBookmark };
}

import { useSyncExternalStore } from "react";

const EMPTY_PROGRESS: Record<string, boolean> = {};
const cache = new Map<string, Record<string, boolean>>();

function storageKey(checklistId: string): string {
  return `opsdeck-checklist-${checklistId}`;
}

function eventName(checklistId: string): string {
  return `opsdeck-checklist-change-${checklistId}`;
}

function readFromStorage(checklistId: string): Record<string, boolean> {
  try {
    const raw = window.localStorage.getItem(storageKey(checklistId));
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

function getSnapshot(checklistId: string): Record<string, boolean> {
  if (!cache.has(checklistId)) {
    cache.set(checklistId, readFromStorage(checklistId));
  }
  return cache.get(checklistId)!;
}

function setProgress(checklistId: string, next: Record<string, boolean>): void {
  cache.set(checklistId, next);
  window.localStorage.setItem(storageKey(checklistId), JSON.stringify(next));
  window.dispatchEvent(new Event(eventName(checklistId)));
}

function subscribe(checklistId: string, callback: () => void): () => void {
  const name = eventName(checklistId);
  window.addEventListener(name, callback);
  return () => window.removeEventListener(name, callback);
}

export function useChecklistProgress(checklistId: string) {
  const progress = useSyncExternalStore(
    (callback) => subscribe(checklistId, callback),
    () => getSnapshot(checklistId),
    () => EMPTY_PROGRESS,
  );

  function toggle(itemId: string) {
    const current = getSnapshot(checklistId);
    setProgress(checklistId, { ...current, [itemId]: !current[itemId] });
  }

  function reset() {
    setProgress(checklistId, {});
  }

  return { progress, toggle, reset };
}

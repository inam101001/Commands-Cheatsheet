"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";

interface ToastContextValue {
  copy: (text: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useCopy(): (text: string) => void {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useCopy must be used within ToastProvider");
  return ctx.copy;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setMessage("Copied to clipboard!");
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setMessage(null), 2000);
    });
  }, []);

  return (
    <ToastContext.Provider value={{ copy }}>
      {children}
      <div
        className={`fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-full border border-accent-cyan/40 bg-surface-2 px-5 py-2.5 font-sans text-sm font-medium text-accent-cyan shadow-lg transition-all duration-300 ${
          message ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
        role="status"
        aria-live="polite"
      >
        {message}
      </div>
    </ToastContext.Provider>
  );
}

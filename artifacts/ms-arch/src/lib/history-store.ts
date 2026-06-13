export type HistoryEntry = {
  id: string;
  concept: string;
  stack: string;
  mode: "fast" | "deep";
  created_at: string;
  results: {
    architecture: string;
    schema: string;
    readme: string;
    prompt: string;
  };
};

const KEY = "ms-arch-history";
const MAX = 50;

function safeWindow(): Window | null {
  return typeof window === "undefined" ? null : window;
}

export function loadHistory(): HistoryEntry[] {
  const w = safeWindow();
  if (!w) return [];
  try {
    const raw = w.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as HistoryEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveHistoryEntry(
  entry: Omit<HistoryEntry, "id" | "created_at">,
) {
  const w = safeWindow();
  if (!w) return;
  const next: HistoryEntry = {
    ...entry,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  };
  const existing = loadHistory();
  const updated = [next, ...existing].slice(0, MAX);
  try {
    w.localStorage.setItem(KEY, JSON.stringify(updated));
  } catch {
    /* quota — ignore */
  }
}

export function clearHistory() {
  const w = safeWindow();
  if (!w) return;
  w.localStorage.removeItem(KEY);
}

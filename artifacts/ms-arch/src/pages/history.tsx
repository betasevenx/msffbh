import { useEffect, useState } from "react";
import { Link } from "wouter";
import { AppShell } from "@/components/app-shell";
import { loadHistory, clearHistory, type HistoryEntry } from "@/lib/history-store";

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export function HistoryPage() {
  const [items, setItems] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setItems(loadHistory());
    setLoading(false);
  }, []);

  const handleClear = () => {
    if (!window.confirm("Clear all saved generations on this device?")) return;
    clearHistory();
    setItems([]);
  };

  return (
    <AppShell>
      <div className="page-transition px-5 md:px-10 py-6 md:py-10 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Library
            </div>
            <h1 className="mt-1 text-2xl md:text-3xl font-semibold tracking-tight">
              Architecture History
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {loading
                ? "Loading…"
                : `${items.length} generations · this browser`}
            </p>
          </div>
          {items.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="text-[11px] uppercase tracking-[0.14em] border border-border bg-surface px-3 py-2 hover:border-foreground transition"
            >
              Clear History
            </button>
          )}
        </div>

        {!loading && items.length === 0 && (
          <div className="border border-dashed border-border bg-surface px-6 py-16 text-center">
            <p className="text-sm text-muted-foreground">
              No generations yet. Head to the workspace and generate your first
              architecture.
            </p>
          </div>
        )}

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="border border-border bg-surface hover:bg-surface-elevated transition-colors p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold tracking-tight line-clamp-2">
                    {item.concept}
                  </h3>
                </div>
                <span className="shrink-0 inline-flex items-center border border-border bg-surface-elevated px-2 py-0.5 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                  {item.mode}
                </span>
              </div>
              <div className="mt-5 flex items-center justify-between">
                <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  {item.stack} · {timeAgo(item.created_at)}
                </div>
                <Link
                  href="/"
                  className="text-[11px] uppercase tracking-[0.14em] border border-border bg-surface-elevated px-3 py-1.5 text-foreground hover:border-foreground transition"
                >
                  Open
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AppShell>
  );
}

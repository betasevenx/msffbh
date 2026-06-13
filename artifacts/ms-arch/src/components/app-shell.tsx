import { Link, useLocation } from "wouter";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { to: "/", label: "Workspace" },
  { to: "/history", label: "History" },
] as const;

function Logo({ className }: { className?: string }) {
  return (
    <span
      className={`font-mono font-bold tracking-tight text-foreground ${className ?? ""}`}
    >
      MS<span className="text-muted-foreground">/</span>Arch
    </span>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [pathname] = useLocation();

  return (
    <div className="lg:h-screen lg:overflow-hidden min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-background text-foreground flex flex-col lg:flex-row">
      <aside className="hidden lg:flex w-60 shrink-0 flex-col border-r border-border bg-surface">
        <div className="flex items-center px-5 h-20 border-b border-border">
          <Logo className="text-xl" />
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                href={item.to}
                className={`flex items-center px-3 py-2 text-sm border transition-colors ${
                  active
                    ? "border-foreground bg-surface-elevated text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border flex items-center justify-between gap-2">
          <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            v0.1
          </span>
          <ThemeToggle />
        </div>
      </aside>

      <header className="lg:hidden sticky top-0 z-40 h-16 px-4 flex items-center justify-between border-b border-border bg-background">
        <Link href="/" className="flex items-center">
          <Logo className="text-lg" />
        </Link>
        <div className="flex items-center gap-3">
          <nav className="hidden sm:flex items-center gap-1">
            {navItems.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  href={item.to}
                  className={`px-3 py-1.5 text-[12px] uppercase tracking-[0.16em] border ${
                    active
                      ? "border-foreground text-foreground bg-surface"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 min-w-0 pb-16 sm:pb-0 lg:h-screen lg:overflow-hidden">
        {children}
      </main>

      <nav className="sm:hidden fixed bottom-0 inset-x-0 z-40 h-14 border-t border-border bg-background flex">
        {navItems.map((item) => {
          const active = pathname === item.to;
          return (
            <Link
              key={item.to}
              href={item.to}
              className={`flex-1 flex items-center justify-center text-[11px] uppercase tracking-[0.18em] border-t-2 ${
                active
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

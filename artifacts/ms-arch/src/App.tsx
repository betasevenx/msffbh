import { Switch, Route } from "wouter";
import { Toaster } from "sonner";
import { WorkspacePage } from "@/pages/workspace";
import { HistoryPage } from "@/pages/history";

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground font-mono">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center bg-accent text-accent-foreground px-4 py-2 text-sm font-medium transition hover:opacity-90"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={WorkspacePage} />
        <Route path="/history" component={HistoryPage} />
        <Route component={NotFound} />
      </Switch>
      <Toaster />
    </>
  );
}

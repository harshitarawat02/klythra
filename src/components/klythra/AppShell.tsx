import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Factory,
  Brain,
  Sparkles,
  LineChart,
  Network,
  Database,
  ShieldCheck,
  FlaskConical,
  ScrollText,
  Settings,
  Bell,
  Search,
  MessageSquare,
  Menu,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AiAssistant } from "./AiAssistant";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/live-plant", label: "Live Plant", icon: Factory },
  { to: "/decision-center", label: "Decision Center", icon: Brain },
  { to: "/recommendations", label: "AI Recommendations", icon: Sparkles },
  { to: "/timeline", label: "Predictive Timeline", icon: LineChart },
  { to: "/knowledge-graph", label: "Knowledge Graph", icon: Network },
  { to: "/memory", label: "Industrial Memory", icon: Database },
  { to: "/compliance", label: "Compliance", icon: ShieldCheck },
  { to: "/simulation", label: "Simulation Lab", icon: FlaskConical },
  { to: "/audit", label: "Audit Logs", icon: ScrollText },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);

  return (
    <div className="min-h-screen flex w-full text-foreground">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-40 h-screen w-64 shrink-0 transition-transform duration-300",
          "glass-strong border-r border-sidebar-border",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex h-16 items-center gap-3 px-5 border-b border-sidebar-border">
          <div className="relative">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[oklch(0.65_0.22_258)] to-[oklch(0.75_0.16_210)] flex items-center justify-center glow-primary">
              <span className="font-display font-bold text-lg">K</span>
            </div>
            <span className="absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full bg-emerald animate-pulse-glow" />
          </div>
          <div>
            <div className="font-display font-bold text-lg tracking-wider">KLYTHRA</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Safety Intelligence
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="ml-auto lg:hidden p-1.5 rounded-md hover:bg-accent"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-4rem-5rem)]">
          {nav.map((item) => {
            const active =
              item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all group",
                  active
                    ? "bg-gradient-to-r from-primary/20 to-cyan/10 text-foreground border border-primary/30 shadow-[0_0_20px_-8px_oklch(0.65_0.22_258/0.6)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 transition-colors",
                    active ? "text-cyan" : "text-muted-foreground group-hover:text-foreground",
                  )}
                />
                <span>{item.label}</span>
                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-glow" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-cyan/40 to-primary/40 flex items-center justify-center text-xs font-semibold">
              AR
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium truncate">Arjun Rao</div>
              <div className="text-[11px] text-muted-foreground">Shift Supervisor · Zone C</div>
            </div>
          </div>
        </div>
      </aside>

      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-30"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-30 h-16 glass border-b border-border flex items-center gap-4 px-4 lg:px-8">
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden p-2 rounded-md hover:bg-accent"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search zones, permits, incidents…"
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-input/40 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition"
            />
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs px-3 py-1.5 rounded-full glass border border-emerald/30">
            <span className="h-2 w-2 rounded-full bg-emerald animate-pulse-glow" />
            <span className="text-muted-foreground">Live · 12 sensors streaming</span>
          </div>

          <button className="relative p-2 rounded-lg hover:bg-accent">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-critical glow-danger" />
          </button>

          <button
            onClick={() => setAssistantOpen(true)}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-primary/30 to-cyan/20 border border-primary/40 text-sm font-medium hover:from-primary/40 hover:to-cyan/30 transition"
          >
            <MessageSquare className="h-4 w-4" />
            Klythra AI
          </button>
        </header>

        <main className="flex-1 p-4 lg:p-8 max-w-[1600px] w-full mx-auto animate-slide-up">
          {children}
        </main>
      </div>

      <button
        onClick={() => setAssistantOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-br from-primary to-cyan glow-primary flex items-center justify-center z-40"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      <AiAssistant open={assistantOpen} onClose={() => setAssistantOpen(false)} />
    </div>
  );
}

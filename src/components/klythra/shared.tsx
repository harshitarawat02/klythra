import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
      <div>
        {eyebrow && (
          <div className="text-xs uppercase tracking-[0.2em] text-cyan mb-2 flex items-center gap-2">
            <span className="h-1 w-6 bg-cyan rounded-full" /> {eyebrow}
          </div>
        )}
        <h1 className="text-3xl lg:text-4xl font-bold text-gradient">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function GlassCard({
  className,
  children,
  interactive,
}: {
  className?: string;
  children: ReactNode;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-6 transition-all duration-300",
        interactive && "hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-20px_oklch(0.65_0.22_258/0.4)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function StatusPill({
  status,
  children,
}: {
  status: "safe" | "warn" | "critical" | "info";
  children: ReactNode;
}) {
  const styles = {
    safe: "bg-emerald/15 text-emerald border-emerald/30",
    warn: "bg-amber/15 text-amber border-amber/30",
    critical: "bg-critical/15 text-critical border-critical/30",
    info: "bg-cyan/15 text-cyan border-cyan/30",
  }[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border",
        styles,
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full animate-pulse-glow",
          status === "safe" && "bg-emerald",
          status === "warn" && "bg-amber",
          status === "critical" && "bg-critical",
          status === "info" && "bg-cyan",
        )}
      />
      {children}
    </span>
  );
}

import { X, Send, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const suggestions = [
  "Explain current recommendation",
  "Why is risk high in Zone C?",
  "Show similar incidents",
  "Generate compliance report",
  "Predict next 2 hours",
];

type Msg = { role: "user" | "ai"; text: string };

const seed: Msg[] = [
  {
    role: "ai",
    text: "I'm Klythra AI. I've analyzed 12 live signals across 8 zones. Ask me anything about current risk, permits, or predicted operational state.",
  },
];

export function AiAssistant({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [msgs, setMsgs] = useState<Msg[]>(seed);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    const user: Msg = { role: "user", text };
    const ai: Msg = {
      role: "ai",
      text:
        "Based on current CRI of 0.81 in Zone C: gas concentration is 22% above ventilation threshold, permit HW-4471 overlaps with maintenance ticket #M-882, and 4 workers are within blast radius. Recommend delaying hot work 18 min while ventilation is boosted (94% confidence).",
    };
    setMsgs((m) => [...m, user, ai]);
    setInput("");
  };

  return (
    <div
      className={cn(
        "fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] transition-transform duration-300 glass-strong border-l border-border flex flex-col",
        open ? "translate-x-0" : "translate-x-full",
      )}
    >
      <div className="h-16 px-5 flex items-center gap-3 border-b border-border">
        <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-cyan flex items-center justify-center glow-primary">
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <div className="font-semibold">Klythra AI</div>
          <div className="text-[11px] text-emerald flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse-glow" />
            Online · Confidence 94%
          </div>
        </div>
        <button onClick={onClose} className="p-2 rounded-md hover:bg-accent">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {msgs.map((m, i) => (
          <div
            key={i}
            className={cn(
              "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm animate-slide-up",
              m.role === "ai"
                ? "glass border border-primary/20"
                : "ml-auto bg-primary/90 text-primary-foreground",
            )}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-border space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="text-[11px] px-2.5 py-1 rounded-full glass border border-border hover:border-primary/40 text-muted-foreground hover:text-foreground transition"
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
            placeholder="Ask Klythra AI…"
            className="flex-1 h-10 px-3 rounded-lg bg-input/40 border border-border text-sm focus:outline-none focus:border-primary/60"
          />
          <button
            onClick={() => send(input)}
            className="h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center glow-primary"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

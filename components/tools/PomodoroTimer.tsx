"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Settings, Volume2, VolumeX } from "lucide-react";

type Phase = "work" | "shortBreak" | "longBreak";

const PHASE_LABEL: Record<Phase, string> = {
  work: "Focus",
  shortBreak: "Short Break",
  longBreak: "Long Break",
};

const PHASE_COLOR: Record<Phase, string> = {
  work: "from-red-500 via-rose-500 to-pink-500",
  shortBreak: "from-emerald-500 via-teal-500 to-cyan-500",
  longBreak: "from-blue-500 via-indigo-500 to-violet-500",
};

function fmt(secs: number) {
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = Math.floor(secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function beep() {
  try {
    const Ctx =
      (window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext })
        .AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g);
    g.connect(ctx.destination);
    o.type = "sine";
    o.frequency.value = 880;
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.4, ctx.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.7);
    o.start();
    o.stop(ctx.currentTime + 0.7);
  } catch {
    /* noop */
  }
}

export default function PomodoroTimer() {
  const [workMin, setWorkMin] = useState(25);
  const [shortMin, setShortMin] = useState(5);
  const [longMin, setLongMin] = useState(15);
  const [longEvery, setLongEvery] = useState(4);

  const [phase, setPhase] = useState<Phase>("work");
  const [secs, setSecs] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [muted, setMuted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const phaseRef = useRef(phase);
  const completedRef = useRef(completed);
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);
  useEffect(() => {
    completedRef.current = completed;
  }, [completed]);

  const totalForPhase = (p: Phase) =>
    (p === "work" ? workMin : p === "shortBreak" ? shortMin : longMin) * 60;

  function transitionTo(next: Phase) {
    setPhase(next);
    setSecs(totalForPhase(next));
  }

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSecs((s) => {
        if (s > 1) return s - 1;
        // phase complete
        if (!muted) beep();
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification(`${PHASE_LABEL[phaseRef.current]} complete!`, {
            body:
              phaseRef.current === "work"
                ? "Time for a break."
                : "Back to focus mode.",
          });
        }
        const wasWork = phaseRef.current === "work";
        if (wasWork) {
          const n = completedRef.current + 1;
          setCompleted(n);
          completedRef.current = n;
          const next: Phase = n % longEvery === 0 ? "longBreak" : "shortBreak";
          phaseRef.current = next;
          setPhase(next);
          return totalForPhase(next);
        } else {
          phaseRef.current = "work";
          setPhase("work");
          return totalForPhase("work");
        }
      });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, muted, longEvery, workMin, shortMin, longMin]);

  function toggleRun() {
    if (!running && "Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().catch(() => {});
    }
    setRunning((r) => !r);
  }

  function reset() {
    setRunning(false);
    transitionTo("work");
  }

  const total = totalForPhase(phase);
  const progress = ((total - secs) / total) * 100;

  return (
    <div className="space-y-5">
      {/* Phase tabs */}
      <div className="grid grid-cols-3 gap-1 rounded-xl border border-border bg-muted/20 p-1">
        {(["work", "shortBreak", "longBreak"] as Phase[]).map((p) => (
          <button
            key={p}
            onClick={() => {
              setRunning(false);
              transitionTo(p);
            }}
            className={`text-xs sm:text-sm py-2 rounded-lg font-medium transition-all ${
              phase === p
                ? "bg-background shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {PHASE_LABEL[p]}
          </button>
        ))}
      </div>

      {/* Timer */}
      <div className={`relative rounded-2xl bg-gradient-to-br ${PHASE_COLOR[phase]} p-8 text-white shadow-xl`}>
        <div className="flex items-center justify-between text-xs uppercase tracking-wider opacity-80">
          <span>{PHASE_LABEL[phase]}</span>
          <span>Round {completed + 1}</span>
        </div>
        <div className="mt-3 text-center text-6xl sm:text-8xl font-bold tabular-nums tracking-tight drop-shadow-sm">
          {fmt(secs)}
        </div>
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/25">
          <div
            className="h-full bg-white transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={toggleRun}
          className="flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-600 transition-colors"
        >
          {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {running ? "Pause" : "Start"}
        </button>
        <button
          onClick={reset}
          className="flex items-center gap-2 rounded-xl border border-border bg-muted/20 px-4 py-2.5 text-sm font-medium hover:bg-muted/40 transition-colors"
        >
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
        <button
          onClick={() => setMuted((m) => !m)}
          className="flex items-center gap-2 rounded-xl border border-border bg-muted/20 px-4 py-2.5 text-sm font-medium hover:bg-muted/40 transition-colors"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
        <button
          onClick={() => setShowSettings((s) => !s)}
          className="flex items-center gap-2 rounded-xl border border-border bg-muted/20 px-4 py-2.5 text-sm font-medium hover:bg-muted/40 transition-colors"
        >
          <Settings className="w-4 h-4" /> Settings
        </button>
      </div>

      {/* Settings */}
      {showSettings && (
        <div className="rounded-xl border border-border bg-muted/20 p-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Focus (min)", value: workMin, set: setWorkMin, max: 90 },
            { label: "Short (min)", value: shortMin, set: setShortMin, max: 30 },
            { label: "Long (min)", value: longMin, set: setLongMin, max: 60 },
            { label: "Long every", value: longEvery, set: setLongEvery, max: 10 },
          ].map((f) => (
            <div key={f.label} className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">{f.label}</label>
              <input
                type="number"
                min={1}
                max={f.max}
                value={f.value}
                onChange={(e) => {
                  const v = Math.max(1, Math.min(f.max, Number(e.target.value) || 1));
                  f.set(v);
                  if (!running) {
                    if (f.label.startsWith("Focus") && phase === "work") setSecs(v * 60);
                    if (f.label.startsWith("Short") && phase === "shortBreak") setSecs(v * 60);
                    if (f.label.startsWith("Long ") && phase === "longBreak") setSecs(v * 60);
                  }
                }}
                className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-mono outline-none focus:ring-2 focus:ring-blue-500/40"
              />
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
        <span>Completed sessions: <strong className="text-foreground">{completed}</strong></span>
        <span>Long break every {longEvery} sessions</span>
      </div>
    </div>
  );
}

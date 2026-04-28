"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  MessageSquare,
  Send,
  Sparkles,
  X,
  RotateCcw,
  Loader2,
  AlertCircle,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";
import {
  useChatUI,
  useChatStore,
  newMessage,
  hydrateChatSession,
} from "@/lib/stores/chat-store";
import { sendChatMessage } from "@/lib/api/chat";

const SUGGESTED_PROMPTS = [
  "What does Smit do?",
  "Show me a recent project",
  "How can I hire Smit?",
  "Which free tools are available?",
];

const WELCOME =
  "Hi! 👋  I'm Smit's assistant. Ask me about his work, projects, services, or how to get in touch.";

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-2" aria-label="Assistant is typing">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce"
          style={{ animationDelay: `${i * 120}ms` }}
        />
      ))}
    </div>
  );
}

function MarkdownBubble({ content }: { content: string }) {
  return (
    <div
      className={cn(
        "prose prose-sm dark:prose-invert max-w-none",
        "prose-p:my-1.5 prose-ul:my-1.5 prose-ol:my-1.5 prose-li:my-0.5",
        "prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline",
        "prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:text-[0.85em] prose-code:before:content-none prose-code:after:content-none",
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children, ...rest }) => {
            const isInternal = href?.startsWith("/");
            if (isInternal && href) {
              return (
                <Link href={href} {...rest}>
                  {children}
                </Link>
              );
            }
            return (
              <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default function ChatWidget() {
  const { isOpen, open, close } = useChatUI();
  const messages = useChatStore((s) => s.messages);
  const isSending = useChatStore((s) => s.isSending);
  const error = useChatStore((s) => s.error);
  const reset = useChatStore((s) => s.reset);
  const pathname = usePathname();

  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  /* Hydrate sessionId from localStorage (client-only) */
  useEffect(() => {
    hydrateChatSession();
  }, []);

  /* Autoscroll on new messages */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, isSending]);

  /* Focus input on open */
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  /* Esc to close */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  async function submit(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;

    const store = useChatStore.getState();
    const userMsg = newMessage("user", trimmed);
    const placeholder = newMessage("assistant", "");

    store.appendMessage(userMsg);
    store.appendMessage(placeholder);
    store.setSending(true);
    store.setError(null);
    setInput("");

    try {
      const { reply } = await sendChatMessage(
        [...messages, userMsg],
        pathname || undefined,
        useChatStore.getState().sessionId || undefined,
      );
      useChatStore.getState().patchLastAssistant(reply);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Something went wrong.";
      const fallback =
        "Sorry - I couldn't reach the assistant just now. Please try again, or use the [contact page](/contact).";
      useChatStore.getState().patchLastAssistant(fallback);
      useChatStore.getState().setError(msg);
    } finally {
      useChatStore.getState().setSending(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    submit(input);
  }

  function handleKey(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit(input);
    }
  }

  const hasMessages = messages.length > 0;

  return (
    <>
      {/* Floating launcher */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="launcher"
            type="button"
            onClick={open}
            initial={{ opacity: 0, scale: 0.8, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 12 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className={cn(
              "fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[60]",
              "h-14 w-14 rounded-full",
              "bg-gradient-to-br from-blue-500 via-blue-500 to-cyan-500",
              "text-white shadow-lg shadow-blue-500/30",
              "flex items-center justify-center",
              "hover:scale-105 active:scale-95 transition-transform",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
            aria-label="Open chat with Smit's assistant"
          >
            <span className="absolute inset-0 rounded-full bg-blue-500/40 animate-ping opacity-60" />
            <MessageSquare className="relative h-6 w-6" strokeWidth={2.2} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            role="dialog"
            aria-label="Chat assistant"
            className={cn(
              "fixed z-[60] flex flex-col overflow-hidden border bg-background shadow-2xl",
              "border-border",
              // mobile: full-screen sheet
              "inset-x-2 bottom-2 top-2 rounded-2xl",
              // desktop: floating panel bottom-right
              "sm:inset-auto sm:bottom-6 sm:right-6 sm:top-auto sm:left-auto",
              "sm:h-[600px] sm:w-[400px] sm:rounded-2xl",
            )}
          >
            {/* Header */}
            <div
              className={cn(
                "relative flex items-center gap-3 px-4 py-3",
                "bg-gradient-to-br from-blue-500 via-blue-500 to-cyan-500 text-white",
              )}
            >
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur">
                <Bot className="h-5 w-5" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-blue-500 bg-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold leading-tight">
                  Smit&apos;s Assistant
                </p>
                <p className="text-[11px] text-white/80 leading-tight">
                  Ask about Smit&apos;s work, projects &amp; services
                </p>
              </div>
              {hasMessages && (
                <button
                  type="button"
                  onClick={reset}
                  title="Clear conversation"
                  aria-label="Clear conversation"
                  className="rounded-md p-1.5 text-white/85 hover:bg-white/15 transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              )}
              <button
                type="button"
                onClick={close}
                title="Close chat"
                aria-label="Close chat"
                className="rounded-md p-1.5 text-white/90 hover:bg-white/15 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className={cn(
                "flex-1 overflow-y-auto px-4 py-4 space-y-3",
                "bg-gradient-to-b from-muted/30 to-background",
              )}
            >
              {/* Welcome */}
              <div className="flex items-start gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-blue-500">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <div className="rounded-2xl rounded-tl-sm border border-border bg-card px-3.5 py-2.5 text-sm text-foreground/90 max-w-[85%]">
                  {WELCOME}
                </div>
              </div>

              {/* Suggested prompts (only when no messages yet) */}
              {!hasMessages && (
                <div className="pt-2 pl-9">
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
                    Try asking
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTED_PROMPTS.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => submit(p)}
                        disabled={isSending}
                        className={cn(
                          "rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium",
                          "text-foreground/80 hover:border-blue-500/50 hover:text-blue-500 transition-colors",
                          "disabled:opacity-50 disabled:cursor-not-allowed",
                        )}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages */}
              {messages.map((m, idx) => {
                const isUser = m.role === "user";
                const isLast = idx === messages.length - 1;
                const isPlaceholder =
                  !isUser && !m.content && isSending && isLast;

                return (
                  <div
                    key={m.id}
                    className={cn(
                      "flex items-start gap-2",
                      isUser && "justify-end",
                    )}
                  >
                    {!isUser && (
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-blue-500">
                        <Bot className="h-3.5 w-3.5" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed",
                        isUser
                          ? "rounded-2xl rounded-tr-sm bg-blue-500 text-white"
                          : "rounded-2xl rounded-tl-sm border border-border bg-card text-foreground/90",
                      )}
                    >
                      {isPlaceholder ? (
                        <TypingDots />
                      ) : isUser ? (
                        <span className="whitespace-pre-wrap">{m.content}</span>
                      ) : (
                        <MarkdownBubble content={m.content} />
                      )}
                    </div>
                  </div>
                );
              })}

              {error && !isSending && (
                <div className="flex items-center gap-2 pl-9 text-xs text-destructive">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span className="leading-snug">{error}</span>
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-border bg-background p-3"
            >
              <div
                className={cn(
                  "flex items-end gap-2 rounded-xl border border-border bg-card",
                  "focus-within:border-blue-500/60 focus-within:ring-2 focus-within:ring-blue-500/15",
                  "transition-colors",
                )}
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask anything about Smit's work…"
                  rows={1}
                  maxLength={1500}
                  disabled={isSending}
                  className={cn(
                    "flex-1 resize-none bg-transparent px-3 py-2.5 text-sm",
                    "outline-none placeholder:text-muted-foreground/70",
                    "max-h-32 min-h-[40px]",
                  )}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isSending}
                  aria-label="Send message"
                  className={cn(
                    "m-1.5 flex h-8 w-8 items-center justify-center rounded-lg",
                    "bg-blue-500 text-white shadow-sm",
                    "hover:bg-blue-600 active:scale-95 transition-all",
                    "disabled:opacity-40 disabled:pointer-events-none",
                  )}
                >
                  {isSending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="mt-1.5 text-center text-[10px] text-muted-foreground">
                Powered by AI · Answers may be imprecise - verify important info
              </p>
            </form>

            {/* Decorative avatar attribution (optional, hidden on small screens) */}
            <span className="sr-only">
              <Image
                src="/images/Smit-Parekh-Home.png"
                alt="Smit Parekh"
                width={1}
                height={1}
              />
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

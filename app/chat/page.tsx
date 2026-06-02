"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "ai/react";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { Send, User, Bot, Loader2, ArrowRight } from "lucide-react";

export default function ChatPage() {
  const router = useRouter();
  const { apiKey, provider, completeInterview, _hasHydrated } = useAppStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isFinishing, setIsFinishing] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading, append, error } = useChat({
    api: "/api/chat",
    body: {
      provider,
      apiKey,
    },
    onFinish: (message) => {
      // Check if the response contains LaTeX code. 
      // If it starts with \documentclass or contains it, it's the final output.
      if (message.content.includes("\\documentclass")) {
        setIsFinishing(true);
        // Extract latex if wrapped in markdown, or take raw.
        let latex = message.content;
        const match = latex.match(/```latex\n([\s\S]*?)```/);
        if (match) latex = match[1];
        
        completeInterview(latex);
        router.push("/output");
      }
    }
  });

  useEffect(() => {
    if (_hasHydrated && !apiKey) {
      router.push("/");
    }
  }, [_hasHydrated, apiKey, router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!_hasHydrated) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-background gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!apiKey || isFinishing) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-background gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        {isFinishing && <p className="text-slate-500 font-medium animate-pulse">Generating your professional LaTeX resume...</p>}
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 shrink-0 shadow-sm z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">Resume <span className="text-primary">Interview</span></h1>
          <div className="text-sm font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
            {provider === 'gemini' ? 'Gemini' : 'OpenAI'} Powered
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 scroll-smooth">
        <div className="max-w-4xl mx-auto space-y-6 pb-20">
          {messages.length === 0 ? (
             <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
               <div className="bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Bot className="w-12 h-12 text-primary" />
               </div>
               <h2 className="text-3xl font-semibold mb-3 tracking-tight">Ready to build your resume?</h2>
               <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8 text-lg">
                 I'll ask you a series of questions across 11 sections. Just answer naturally, and I'll format everything perfectly into an ATS-friendly layout.
               </p>
               <button 
                 onClick={() => {
                   append({ role: "user", content: "Hi, I'm ready to start." });
                 }}
                 className="bg-primary text-white px-8 py-4 rounded-xl font-medium shadow-lg hover:bg-primary/90 transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-2 mx-auto"
               >
                 Start Interview <ArrowRight className="w-5 h-5" />
               </button>
             </div>
          ) : (
            messages.map((m) => (
              <div key={m.id} className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                {m.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1 shadow-sm border border-primary/20">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                )}
                <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-5 shadow-sm ${m.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-sm shadow-primary/20' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-tl-sm text-slate-800 dark:text-slate-200'}`}>
                  <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
                </div>
                {m.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0 mt-1 shadow-sm border border-slate-300 dark:border-slate-700">
                    <User className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  </div>
                )}
              </div>
            ))
          )}
          
          {isLoading && !error && (
            <div className="flex gap-4 justify-start animate-in fade-in duration-300">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1 shadow-sm border border-primary/20">
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm rounded-tl-sm flex items-center gap-2 text-slate-500">
                <span className="font-medium text-sm">AI is thinking</span>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 p-5 rounded-2xl border border-red-200 dark:border-red-900/50 mb-6 flex items-start gap-3 shadow-sm animate-in fade-in zoom-in duration-300">
              <div>
                <h3 className="font-semibold text-red-700 dark:text-red-400">Connection Error</h3>
                <p className="text-sm mt-1 leading-relaxed">{error.message || "An unexpected error occurred while communicating with the AI. Please verify your API key is correct and has sufficient quota."}</p>
                <button onClick={() => window.location.reload()} className="mt-3 text-xs bg-red-100 dark:bg-red-900/50 px-4 py-2 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/80 font-medium transition-colors shadow-sm">
                  Restart Interview
                </button>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 p-4 shrink-0">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative group">
          <textarea
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 pr-16 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none min-h-[60px] max-h-[200px] shadow-inner"
            placeholder={messages.length === 0 ? "Click Start Interview to begin..." : "Type your answer here... (Shift+Enter for new line)"}
            value={input}
            disabled={isLoading || isFinishing}
            rows={1}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as any);
              }
            }}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim() || isFinishing}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:hover:bg-primary transition-all shadow-md shadow-primary/20 active:scale-90"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}

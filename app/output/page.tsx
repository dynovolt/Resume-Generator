"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { Check, Copy, Download, RefreshCcw, FileCode2, Info } from "lucide-react";

export default function OutputPage() {
  const router = useRouter();
  const { latexOutput, isInterviewComplete, resetInterview } = useAppStore();
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && (!isInterviewComplete || !latexOutput)) {
      router.push("/");
    }
  }, [mounted, isInterviewComplete, latexOutput, router]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(latexOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([latexOutput], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.tex";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRestart = () => {
    if(confirm("Are you sure you want to start over? Your current resume will be lost.")) {
      resetInterview();
      router.push("/");
    }
  };

  if (!mounted || !isInterviewComplete || !latexOutput) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-8 flex flex-col items-center">
      <header className="w-full max-w-5xl flex items-center justify-between mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-3 rounded-2xl shadow-sm border border-primary/20">
            <FileCode2 className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Your Resume is Ready!</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Successfully generated ATS-friendly LaTeX source code.</p>
          </div>
        </div>
        
        <button 
          onClick={handleRestart}
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400 transition-colors bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-5 py-2.5 rounded-xl shadow-sm hover:border-red-200 dark:hover:border-red-900/50"
        >
          <RefreshCcw className="w-4 h-4" /> Start Over
        </button>
      </header>

      <main className="w-full max-w-5xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[75vh] animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 p-4 sm:px-6 flex justify-between items-center shrink-0">
          <div className="flex gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-red-400 border border-red-500/20" />
            <div className="w-3.5 h-3.5 rounded-full bg-amber-400 border border-amber-500/20" />
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 border border-emerald-500/20" />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 text-sm font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-95 text-slate-700 dark:text-slate-300 shadow-sm"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy Code"}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 text-sm font-medium bg-primary text-primary-foreground px-5 py-2 rounded-xl hover:bg-primary/90 transition-all active:scale-95 shadow-md shadow-primary/20"
            >
              <Download className="w-4 h-4" />
              Download .tex
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto bg-[#0d1117] text-[#e6edf3] p-6 sm:p-8 font-mono text-sm leading-relaxed selection:bg-primary/30">
          <pre className="whitespace-pre-wrap word-break-all"><code>{latexOutput}</code></pre>
        </div>
      </main>

      <div className="mt-8 max-w-5xl w-full flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 p-4 rounded-2xl border border-blue-200 dark:border-blue-800/50 animate-in fade-in duration-1000 delay-300">
        <Info className="w-6 h-6 shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-semibold mb-1">What to do next?</p>
          <p className="opacity-90 leading-relaxed">
            You can compile this code into a beautiful PDF using any LaTeX editor. We recommend pasting it into <a href="https://www.overleaf.com/" target="_blank" rel="noreferrer" className="underline hover:text-blue-600 dark:hover:text-blue-200">Overleaf</a> for an easy, web-based compilation experience.
          </p>
        </div>
      </div>
    </div>
  );
}

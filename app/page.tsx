"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore, Provider } from "@/lib/store";
import { FileText, Key, Shield, ArrowRight } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const { apiKey, setApiKey, provider, setProvider } = useAppStore();
  
  const [inputKey, setInputKey] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<Provider>("gemini");

  useEffect(() => {
    // Sync store state after hydration to avoid SSR mismatch
    if (apiKey) setInputKey(apiKey);
    if (provider) setSelectedProvider(provider);
  }, [apiKey, provider]);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputKey.trim()) return;
    setApiKey(inputKey.trim());
    setProvider(selectedProvider);
    router.push("/chat");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden bg-background">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[100px] pointer-events-none" />

      <main className="w-full max-w-2xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl z-10 relative">
        <div className="flex flex-col items-center text-center space-y-6 mb-10">
          <div className="bg-primary/10 p-4 rounded-2xl">
            <FileText className="w-12 h-12 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              AI Resume <span className="text-primary">Generator</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              Build a professional, ATS-optimized LaTeX resume through an intelligent conversational interview. 100% Free.
            </p>
          </div>
        </div>

        <form onSubmit={handleStart} className="space-y-6">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Select AI Provider
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setSelectedProvider("gemini")}
                className={`p-4 border rounded-xl flex items-center justify-center transition-all ${
                  selectedProvider === "gemini" 
                    ? "border-primary bg-primary/5 text-primary ring-1 ring-primary" 
                    : "border-slate-200 dark:border-slate-800 hover:border-primary/50 text-slate-600 dark:text-slate-400"
                }`}
              >
                Google Gemini
              </button>
              <button
                type="button"
                onClick={() => setSelectedProvider("openai")}
                className={`p-4 border rounded-xl flex items-center justify-center transition-all ${
                  selectedProvider === "openai" 
                    ? "border-primary bg-primary/5 text-primary ring-1 ring-primary" 
                    : "border-slate-200 dark:border-slate-800 hover:border-primary/50 text-slate-600 dark:text-slate-400"
                }`}
              >
                OpenAI (ChatGPT)
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="apiKey" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              API Key
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Key className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="password"
                id="apiKey"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder={`Enter your ${selectedProvider === 'gemini' ? 'Gemini' : 'OpenAI'} API Key`}
                className="block w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                required
              />
            </div>
            <div className="pt-1 text-xs text-slate-500 dark:text-slate-400">
              {selectedProvider === 'gemini' ? (
                <span>Don't have a Gemini API key? Get one for free at <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Google AI Studio</a>.</span>
              ) : (
                <span>Don't have an OpenAI API key? Create one at the <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">OpenAI Platform</a>.</span>
              )}
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 flex items-start gap-3 border border-slate-100 dark:border-slate-800/50">
            <Shield className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Bring Your Own Key (BYOK):</strong> Your API key is stored securely in your browser's local storage and is never sent to our servers—only directly to the AI provider.
            </p>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground py-4 rounded-xl font-semibold transition-all shadow-lg shadow-primary/25 active:scale-[0.98]"
          >
            Start Resume Interview
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </main>
    </div>
  );
}

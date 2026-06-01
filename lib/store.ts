import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Provider = 'openai' | 'gemini';

export interface AppState {
  apiKey: string;
  provider: Provider;
  currentStep: number;
  chatHistory: { role: 'user' | 'assistant'; content: string }[];
  isInterviewComplete: boolean;
  latexOutput: string;
  setApiKey: (key: string) => void;
  setProvider: (provider: Provider) => void;
  setCurrentStep: (step: number) => void;
  addMessage: (message: { role: 'user' | 'assistant'; content: string }) => void;
  setChatHistory: (history: { role: 'user' | 'assistant'; content: string }[]) => void;
  completeInterview: (latexCode: string) => void;
  resetInterview: () => void;
  clearCredentials: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      apiKey: '',
      provider: 'gemini',
      currentStep: 1,
      chatHistory: [],
      isInterviewComplete: false,
      latexOutput: '',
      setApiKey: (key) => set({ apiKey: key }),
      setProvider: (provider) => set({ provider }),
      setCurrentStep: (step) => set({ currentStep: step }),
      addMessage: (message) => set((state) => ({ chatHistory: [...state.chatHistory, message] })),
      setChatHistory: (history) => set({ chatHistory: history }),
      completeInterview: (latexCode) => set({ isInterviewComplete: true, latexOutput: latexCode }),
      resetInterview: () => set({ currentStep: 1, chatHistory: [], isInterviewComplete: false, latexOutput: '' }),
      clearCredentials: () => set({ apiKey: '', provider: 'gemini' }),
    }),
    {
      name: 'ai-resume-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ apiKey: state.apiKey, provider: state.provider }), // Only persist API Key and Provider choice
    }
  )
);

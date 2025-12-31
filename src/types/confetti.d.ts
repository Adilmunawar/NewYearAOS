declare global {
  interface Window {
    confetti: (options?: any) => Promise<void>;
  }
}

export {};

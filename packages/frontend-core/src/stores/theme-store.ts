import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'dark' | 'light';

const getDomTheme = (): ThemeMode => {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
};

const applyTheme = (theme: ThemeMode) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  theme === 'dark' ? root.classList.add('dark') : root.classList.remove('dark');
};

export const useThemeStore = create<{
  theme: ThemeMode;
  applyTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}>()(
  persist(
    (set, get) => ({
      theme: 'light',
      applyTheme: (theme) => {
        applyTheme(theme);
        set({ theme });
      },

      toggleTheme: () => {
        const newTheme = get().theme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        set({ theme: newTheme });
      },
    }),
    {
      name: 'theme-storage-v1',
      skipHydration: true,
      onRehydrateStorage: () => (state) => {
        applyTheme(state?.theme ?? getDomTheme());
      },
    },
  ),
);

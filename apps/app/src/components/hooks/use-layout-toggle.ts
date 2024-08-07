import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface useSidebarToggleStore {
  isSidebarOpen: boolean;
  setIsSidebarOpen: () => void;
  isFullscreen: boolean;
  setIsFullscreen: () => void;
}

export const useSidebarToggle = create(
  persist<useSidebarToggleStore>(
    (set, get) => ({
      isSidebarOpen: true,
      setIsSidebarOpen: () => {
        set({ isSidebarOpen: !get().isSidebarOpen });
      },
      isFullscreen: false,
      setIsFullscreen: () => {
        set({ isFullscreen: !get().isFullscreen });
      },
    }),
    {
      name: 'sidebarOpen',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
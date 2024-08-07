import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface useSidebarToggleStore {
  isOpen: boolean;
  setIsOpen: () => void;
  isFullscreen: boolean;
  setIsFullscreen: () => void;
}

export const useSidebarToggle = create(
  persist<useSidebarToggleStore>(
    (set, get) => ({
      isOpen: true,
      setIsOpen: () => {
        set({ isOpen: !get().isOpen });
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
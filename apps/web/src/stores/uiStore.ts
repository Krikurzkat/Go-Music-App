import { create } from 'zustand';

type RightPanelView = 'queue' | 'lyrics' | 'activity' | 'hidden';

interface UIState {
  sidebarCollapsed: boolean;
  mobileSidebarOpen: boolean;
  rightPanelView: RightPanelView;
  searchQuery: string;
  searchOpen: boolean;
  contextMenu: { x: number; y: number; items: ContextMenuItem[] } | null;
  modalContent: React.ReactNode | null;
  toastQueue: string[];

  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  setRightPanel: (view: RightPanelView) => void;
  setSearchQuery: (q: string) => void;
  setSearchOpen: (open: boolean) => void;
  openContextMenu: (x: number, y: number, items: ContextMenuItem[]) => void;
  closeContextMenu: () => void;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}

export interface ContextMenuItem {
  label: string;
  icon?: string;
  onClick: () => void;
  danger?: boolean;
  divider?: boolean;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  mobileSidebarOpen: false,
  rightPanelView: 'queue',
  searchQuery: '',
  searchOpen: false,
  contextMenu: null,
  modalContent: null,
  toastQueue: [],

  toggleSidebar: () => set(s => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  toggleMobileSidebar: () => set(s => ({ mobileSidebarOpen: !s.mobileSidebarOpen })),
  setRightPanel: (view) => set({ rightPanelView: view }),
  setSearchQuery: (q) => set({ searchQuery: q }),
  setSearchOpen: (open) => set({ searchOpen: open }),
  openContextMenu: (x, y, items) => set({ contextMenu: { x, y, items } }),
  closeContextMenu: () => set({ contextMenu: null }),
  openModal: (content) => set({ modalContent: content }),
  closeModal: () => set({ modalContent: null }),
}));

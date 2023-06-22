import { create } from "zustand";

export interface SelectedContent {
  menu: string;
  title: string;
  component: React.ReactNode;
  width?: string;
  height: string;
  icon: any;
}

interface AppStore {
  scale: string | undefined;
  showBar: boolean;
  wallpaper: string;
  selectedContent: SelectedContent | undefined;
}

export const useAppStore = create<AppStore>(() => ({
  scale: undefined,
  showBar: false,
  wallpaper: "/assets/lovegame_background.png",
  selectedContent: undefined,
}));

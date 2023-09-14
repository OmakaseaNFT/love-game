import { StaticImageData } from "next/image";
import React, { useEffect } from "react";
import { createContext } from "react";

import VaporwaveArcade from "../../components/filetheme/VaporwaveArcade";
import Love from "../../components/filetheme/Love";

export type FileTheme = "love" | "vaporwave-arcade";

export interface FileThemeCustomOptions {
  name: string;
  EtherscanIcon: StaticImageData;
  LoveIcon: StaticImageData;
  FireIcon: StaticImageData;
  FarmIcon: StaticImageData;
  PaperIcon: StaticImageData;
  UniswapIcon: StaticImageData;
  WalletIcon: StaticImageData;
  SettingsIcon: StaticImageData;
  ShutdownIcon: StaticImageData;
  startLoveIcon: string;
  startIcon: string;
  closeIcon: string;
  background: string;
  telegram: string;
  twitter: string;
  heartbreakIcon: string;
  heartbreakActiveButton: StaticImageData;
  heartbreakExitButton: StaticImageData;
  heartbreakDeadButton: StaticImageData;
}

export interface IFileTheme {
  fileTheme: FileTheme;
  setFileTheme: (id: FileTheme) => void;
  files: FileThemeCustomOptions;
  wallpaper?: string;
  setWallpaper: (wallpaper: string) => void;
}

const defaultTheme: FileTheme = "love";

export const themeMap: { [key in FileTheme]: Partial<FileThemeCustomOptions> } =
  {
    love: Love,
    "vaporwave-arcade": VaporwaveArcade,
  };

export const FileThemeContext = createContext<IFileTheme>({} as IFileTheme);

export const FileThemeProvider = ({ children }: { children: any }) => {
  const [wallpaper, setWallpaper] = React.useState<string>();
  const [fileTheme, _setFileTheme] = React.useState<FileTheme>(() => {
    return defaultTheme;
  });

  useEffect(() => {
    const localStorageFileTheme = localStorage.getItem("fileTheme");
    if (!localStorageFileTheme) {
      return;
    }
    // const theme = JSON.parse(localStorageFileTheme) as FileTheme;
    // if (theme !== fileTheme) {
    //   _setFileTheme(theme);
    // }
  }, [])

  const files = React.useMemo(() => {
    return {
      ...themeMap[defaultTheme],
      ...themeMap[fileTheme],
    } as FileThemeCustomOptions;
  }, [fileTheme]);

  const setFileTheme = (fileTheme: FileTheme) => {
    _setFileTheme(fileTheme);
    localStorage.setItem("fileTheme", JSON.stringify(fileTheme));
  }

  return (
    <FileThemeContext.Provider
      value={{
        fileTheme,
        setFileTheme,
        files,
        setWallpaper,
        wallpaper,
      }}
    >
      <div key={fileTheme} className={`${fileTheme === 'love' ? `theme-love` : `theme-vaporwave-arcade`}`}>
        {children}
      </div>
    </FileThemeContext.Provider>
  );
};

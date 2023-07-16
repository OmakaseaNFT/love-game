import { StaticImageData } from "next/image";
import React, { useEffect } from "react";
import { createContext } from "react";

import VaporwaveArcade from "../../components/filetheme/VaporwaveArcade";
import Love from "../../components/filetheme/Love";
import useLocalStorage from "../hooks/useLocalStorage";

export type FileTheme = "love" | "vaporwave-arcade";

export interface FileThemeCustomOptions {
  name: string;
  Etherscan: StaticImageData;
  Farm: StaticImageData;
  Paper: StaticImageData;
  Uniswap: StaticImageData;
  Wallet: StaticImageData;
  startIcon: string;
  closeIcon: string;
  background: string;
  telegram: string;
  twitter: string;
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
  // const [fileTheme, setFileTheme] = React.useState<FileTheme>(defaultTheme);
  const [wallpaper, setWallpaper] = React.useState<string>();
  const [fileTheme, setFileTheme] = useLocalStorage<FileTheme>("fileTheme", defaultTheme);
  const files = React.useMemo(() => {
    return {
      ...themeMap[defaultTheme],
      ...themeMap[fileTheme],
    } as FileThemeCustomOptions;
  }, [fileTheme]);
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
      <div
        className={`${
          fileTheme === "love" ? "theme-love" : "theme-vaporwave-arcade"
        }`}
      >
        {children}
      </div>
    </FileThemeContext.Provider>
  );
};

import { StaticImageData } from "next/image";
import React, { useEffect } from "react";
import { createContext } from "react";

import Slavecoin from "../../components/filetheme/Slavecoin";
import Love from "../../components/filetheme/Love";

type FileTheme = "love" | "slavecoin";

export interface FileThemeCustomOptions {
  Etherscan: StaticImageData;
  Farm: StaticImageData;
  Paper: StaticImageData;
  Uniswap: StaticImageData;
  Wallet: StaticImageData;
  startIcon: string;
  background: string;
  telegram: string;
  twitter: string;
};

interface FileThemeContextOptions extends FileThemeCustomOptions {
  wallpaper: string;
  setWallpaper: (wallpaper: string) => void;
}

export interface IFileTheme {
  fileTheme: FileTheme;
  setFileTheme: (id: FileTheme) => void;
  files: FileThemeContextOptions;
}

const defaultTheme: FileTheme = "love";

const themeMap: { [key in FileTheme]: Partial<FileThemeContextOptions> } = {
  love: Love,
  slavecoin: Slavecoin,
};

export const FileThemeContext = createContext<IFileTheme>({} as IFileTheme);

export const FileThemeProvider = ({ children }: { children: any }) => {
  const [fileTheme, setFileTheme] = React.useState<FileTheme>("love");
  const [wallpaper, setWallpaper] = React.useState<string>();

  const files = React.useMemo(() => {
    return {
      ...themeMap[defaultTheme],
      ...themeMap[fileTheme],
      setWallpaper,
      wallpaper
    } as FileThemeContextOptions;
  }, [fileTheme]);
  return (
    <FileThemeContext.Provider
      value={{
        fileTheme,
        setFileTheme,
        files,
      }}
    >
      {children}
    </FileThemeContext.Provider>
  );
};

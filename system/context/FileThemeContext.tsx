import { StaticImageData } from "next/image";
import React, { useEffect } from "react";
import { createContext } from "react";

import VaporwaveArcade from "../../components/filetheme/VaporwaveArcade";
import Love from "../../components/filetheme/Love";
import TangGang from "../../components/filetheme/TangGang";

export type FileTheme = "love" | "vaporwave-arcade" | "tang-gang";

export interface FileThemeCustomOptions {
  name: string;
  EtherscanIcon: StaticImageData;
  FarmIcon: StaticImageData;
  LoveIcon: StaticImageData;
  FireIcon: StaticImageData;
  PaperIcon: StaticImageData;
  BridgeIcon: StaticImageData;
  MglthIcon: StaticImageData;
  OmakIcon: StaticImageData;
  BabiesIcon: StaticImageData;
  WTIcon: StaticImageData;
  GooeyIcon: StaticImageData;
  PokeganIcon: StaticImageData;
  UniswapIcon: StaticImageData;
  WalletIcon: StaticImageData;
  SettingsIcon: StaticImageData;
  ShutdownIcon: StaticImageData;
  startLoveIcon: string;
  startIcon: string;
  closeIcon: string;
  background: string;
  TelegramIcon: string;
  DiscordIcon: string;
  TwitterIcon: string;
  heartbreakIcon: string;
  heartbreakActiveButton: StaticImageData;
  heartbreakExitButton: StaticImageData;
  heartbreakDeadButton: StaticImageData;
  ChiaIcon: StaticImageData;
  GobyIcon: StaticImageData;
  SpaceIcon: StaticImageData;
  MintIcon:  StaticImageData;
  TradeIcon:  StaticImageData;
  DexieIcon:  StaticImageData;
  TibetIcon: StaticImageData;
  FarmerIcon: StaticImageData;
  CLinksIcon: StaticImageData;
  HoaIcon: StaticImageData;
  NinemmIcon: StaticImageData;
  TangbearsIcon: StaticImageData;
  BasebearsIcon: StaticImageData;
  DexscreenerIcon: StaticImageData;
  TGtwitterIcon: StaticImageData;
}

export interface IFileTheme {
  fileTheme: FileTheme;
  setFileTheme: (id: FileTheme) => void;
  files: FileThemeCustomOptions;
  wallpaper?: string;
  setWallpaper: (wallpaper: string) => void;
}

const defaultTheme: FileTheme = "vaporwave-arcade";

export const themeMap: { [key in FileTheme]: Partial<FileThemeCustomOptions> } =
  {
    love: Love,
    "vaporwave-arcade": VaporwaveArcade,
    "tang-gang": TangGang,
  };

export const FileThemeContext = createContext<IFileTheme>({} as IFileTheme);

export const FileThemeProvider = ({ children }: { children: any }) => {
  const [wallpaper, setWallpaper] = React.useState<string>();
  const [fileTheme, _setFileTheme] = React.useState<FileTheme>(() => {
    return defaultTheme;
  });

  const setBodyThemeClass = (theme: FileTheme) => {
    // tailwindcss adds theme class to a div that is not the parent of the rainbowkit modal
    // this code adds the theme class to the body so that the rainbowkit modal can be styled correctly
    const body = document.querySelector("body");
    body!.className = `theme-${theme}`;
  }

  useEffect(() => {
    const localStorageFileTheme = localStorage.getItem("fileTheme");
    if (!localStorageFileTheme) {
      setBodyThemeClass(defaultTheme as FileTheme);
      return;
    }
    setBodyThemeClass(localStorageFileTheme as FileTheme);
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
    localStorage.setItem("fileTheme", fileTheme);
    setBodyThemeClass(fileTheme);
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
      <div className={fileTheme === 'love' ? 'theme-love' : fileTheme === 'vaporwave-arcade' ? 'theme-vaporwave-arcade' : 'theme-tang-gang'}>
      {children}
      </div>
    </FileThemeContext.Provider>
  );
};

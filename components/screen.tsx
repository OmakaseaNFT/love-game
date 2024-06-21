import EtherscanIcon from "../assets/etherscan.png";
//import LoveIcon from "../assets/love-icon.png";
//import PaperIcon from "../assets/book.png";
//import FireIcon from "../assets/fire-icon.png";
//import BridgeIcon from "../assets/bridge-icon.png";
//import MglthIcon from "../assets/mglth-icon.png";

// import WarBanner from "../assets/war-banner.gif";
import { ReactNode, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Connect } from "./connect";
import {
  ETHERSCAN_LOVE_LINK,
  TELEGRAM_LINK,
  TWITTER_LINK,
  WAR3_TWITTER_LINK,
  WAR3_SWAP_LINK,
  DISCORD_LINK,
  BRIDGE_LINK,
} from "../utils/constant";

import { FileThemeContext } from "../system/context/FileThemeContext";
import { useAccount } from "wagmi";

//const DiscordIcon = "/assets/logo_discord.png";
//const TwitterIcon = "/assets/logo_twitter.png";
//const TelegramIcon = "/assets/logo_telegram.png";

interface ScreenProps {
  children: ReactNode;
  setSelected: (selected: string) => void;
  wallpaper: string;
  onTrigger: () => void;
}
const Screen = ({
  children,
  setSelected,
  wallpaper,
  onTrigger,
}: ScreenProps) => {  
  const { files: {PaperIcon, FireIcon, LoveIcon, MglthIcon, BridgeIcon, TwitterIcon, TelegramIcon, DiscordIcon } } = useContext(FileThemeContext)
  const { address, connector, isConnected } = useAccount();
  const [hide, setHide] = useState<boolean>(true);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const iconsLeft = [
    {
      onClick: () => window.open(DISCORD_LINK, "_blank"),
      icon: DiscordIcon,
      label: "Discord",
      logoHeight: 60,
    },
    {
      onClick: () => window.open(TWITTER_LINK, "_blank"),
      icon: TwitterIcon,
      label: "Love Twitter",
      logoHeight: 60,
    },
    {
      onClick: () => window.open(WAR3_TWITTER_LINK, "_blank"),
      icon: TwitterIcon,
      label: "War3 Twitter",
      logoHeight: 60,
    },
    {
      onClick: () => window.open(TELEGRAM_LINK, "_blank"),
      icon: TelegramIcon,
      label: "Telegram",
      logoHeight: 60,
    },
  ];

  const iconsCenter = [
    {
      onClick: () => setSelected("mglth"),
      icon: MglthIcon,
      label: "Megalith TV",

    },
    {
      onClick: () => window.open(BRIDGE_LINK, "_blank"),
      icon: BridgeIcon,
      label: "Warp Bridge",
    },
  ];

  const iconsRight = [
    {
      onClick: () => setSelected("farm"),
      icon: LoveIcon,
      label: "Farm $LOVE",
    },
    {
      onClick: () => window.open(WAR3_SWAP_LINK, "_blank"),
      icon: FireIcon,
      label: "Swap $WAR3",
    },
    {
      onClick: () => setSelected("paper"),
      icon: PaperIcon,
      label: "Paper",
    },
  ];

  useEffect(() => {
    setShowMenu(true);
  }, []);

  return (
    <div
      className="flex w-full h-full bg-cover bg-center relative overflow-auto mb-[10px]"
      style={{
        backgroundImage: `url(${wallpaper ?? ""})`,
      }}
    >
      <div className="w-full h-full flex">
        {children}
        <div className="flex flex-row justify-between w-full p-8 sm:p-0">
          <div className="w-[110px] sm:w-[200px]">
            {iconsLeft.map((item, index) => {
              return (
                <div
                  key={index}
                  className="h-36  flex-col flex justify-center flex items-center cursor-pointer"
                  onClick={item.onClick}
                >
                  <Image
                    src={item.icon}
                    alt="icon"
                    height={item.logoHeight ?? 80}
                    width={item.logoHeight ?? 80}
                  />
                  {item.label && (
                    <div className="text-[rgba(255,255,255,.80)] text-lg mt-2">
                      {item.label}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="w-[110px] sm:w-[200px] pt-[2px]">
            {showMenu &&
              iconsCenter.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="h-36 flex-col flex justify-center flex items-center cursor-pointer"
                    onClick={item.onClick}
                  >
                    <Image src={item.icon} alt="icon" height={55} />
                    {item.label && (
                      <div className="text-[rgba(255,255,255,.80)] text-lg mt-2">
                        {item.label}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          <div className="w-[110px] sm:w-[200px] pt-[2px]">
            <div className="h-36 flex-row justify-center flex items-center">
              {" "}
              <Connect />
            </div>
            {showMenu &&
              iconsRight.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="h-36 flex-col flex justify-center flex items-center cursor-pointer"
                    onClick={item.onClick}
                  >
                    <Image src={item.icon} alt="icon" height={55} />
                    {item.label && (
                      <div className="text-[rgba(255,255,255,.80)] text-lg mt-2">
                        {item.label}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screen;

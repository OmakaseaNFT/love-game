import DirectoryIcon from "../assets/closed-folder.png";
import EtherscanIcon from "../assets/etherscan.png";
import HeartbreakIcon from "../assets/half-heart-break.svg";
import LoveSmileIcon from "../assets/love-icon.png";
import LoveIcon from "../assets/heart-static.svg";
import UniswapIcon from "../assets/uniswap.png";
import PaperIcon from "../assets/book.png";
import FireIcon from "../assets/fire-icon.png";
// import WarBanner from "../assets/war-banner.gif";
import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { Connect } from "./connect";
import {
  ETHERSCAN_CLAIM_LINK,
  TELEGRAM_LINK,
  TWITTER_LINK,
  UNISWAP_LINK,
  WAR_SWAP_LINK,
  LOVE_SWAP_LINK,
} from "../utils/constant";

interface ScreenProps {
  children: ReactNode;
  setSelected: (selected: string) => void;
  wallpaper: string;
}
const Screen = ({ children, setSelected, wallpaper }: ScreenProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const iconsLeft = [
    {
      onClick: () => setSelected("heartbreak"),
      icon: HeartbreakIcon,
      label: "HeartBreak",
      logoHeight: 60,
    },
    {
      onClick: () => setSelected("charts"),
      icon: DirectoryIcon,
      label: "Charts",
      logoHeight: 60,
    },
    {
      onClick: () => setSelected("socials"),
      icon: DirectoryIcon,
      label: "Socials",
      logoHeight: 60,
    },
    {
      onClick: () => setSelected("contracts"),
      icon: DirectoryIcon,
      label: "Contracts",
      logoHeight: 60,
    },
  ];

  const iconsRight = [
    {
      onClick: () => setSelected("farm"),
      icon: LoveSmileIcon,
      label: "Farm $LOVE",
    },
    {
      onClick: () => setSelected("paper"),
      icon: PaperIcon,
      label: "Paper",
    },
    {
      onClick: () => window.open(WAR_SWAP_LINK, "_blank"),
      icon: FireIcon,
      label: "Buy War",
    },
    {
      onClick: () => window.open(LOVE_SWAP_LINK, "_blank"),
      icon: LoveIcon,
      label: "Buy Love",
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
                  className="h-36 flex-col flex justify-center flex items-center cursor-pointer"
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

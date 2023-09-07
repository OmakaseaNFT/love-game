import EtherscanIcon from "../assets/etherscan.png";
import LoveIcon from "../assets/love-icon.png";
import UniswapIcon from "../assets/uniswap.png";
import PaperIcon from "../assets/book.png";
import WarIcon from "../assets/war-icon.png";
import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { Connect } from "./connect";
import {
  ETHERSCAN_CLAIM_LINK,
  TELEGRAM_LINK,
  TWITTER_LINK,
  UNISWAP_LINK,
} from "../utils/constant";

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
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const iconsLeft = [
    {
      onClick: () => window.open(ETHERSCAN_CLAIM_LINK, "_blank"),
      icon: EtherscanIcon,
    },
    {
      onClick: () => window.open(UNISWAP_LINK, "_blank"),
      icon: UniswapIcon,
      label: "Uniswap",
      logoHeight: 60,
    },
    {
      onClick: () => window.open(TWITTER_LINK, "_blank"),
      icon: "/assets/logo_twitter.png",
      label: "Twitter",
      logoHeight: 60,
    },
    {
      onClick: () => window.open(TELEGRAM_LINK, "_blank"),
      icon: "/assets/logo_telegram.png",
      label: "Telegram",
      logoHeight: 60,
    },
  ];

  const iconsRight = [
    {
      onClick: () => setSelected("farm"),
      icon: LoveIcon,
      label: "Farm $LOVE",
    },
    {
      onClick: () => onTrigger(),
      icon: WarIcon,
      label: "Claim $WAR"
    },
    {
      onClick: () => setSelected("paper"),
      icon: PaperIcon,
      label: "Paper",
    }
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
                      <div className="text-[rgba(255,255,255,.7)] text-lg mt-[2px]">
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

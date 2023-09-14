import React, { FC } from "react";
import Image from "next/image";

import DiscordIcon from "../assets/discord.png";
import EtherscanIcon from "../assets/etherscan.png";
import GreenCandlesIcon from "../assets/greencandle-chart.png";
import TelegramIcon from "../assets/telegram.png";
import TwitterIcon from "../assets/twitter.png";

import { ETHLPAddy, WARLPAddy } from "../utils/constant";

interface LinksDirectoryProps {
  name: string;
}

const chartsLinks = [
  {
    icon: GreenCandlesIcon,
    label: "Love Chart",
    url: `https://dexscreener.com/ethereum/${ETHLPAddy}`,
  },
  {
    icon: GreenCandlesIcon,
    label: "War3 Chart",
    url: `https://dexscreener.com/ethereum/${WARLPAddy}`,
  },
];

const socialsLinks = [
  {
    icon: TelegramIcon,
    label: "Love Telegram",
    url: `https://t.me/loveethereum`,
  },
  {
    icon: TelegramIcon,
    label: "Love Holders Telegram",
    url: `https://telegram.me/collablandbot?start=VFBDI1RFTCNDT01NIy0xMDAxOTc5ODgwMjAz`,
  },
  {
    icon: TelegramIcon,
    label: "Omakasea Telegram",
    url: `https://t.me/Omakasea`,
  },
  {
    icon: TwitterIcon,
    label: "Chef Twitter",
    url: `https://twitter.com/M4573RCH`,
  },
  {
    icon: TwitterIcon,
    label: "Love Twitter",
    url: `https://twitter.com/lovegameeth`,
  },
  {
    icon: TwitterIcon,
    label: "War3 Twitter",
    url: `https://twitter.com/webwar3`,
  },
  {
    icon: DiscordIcon,
    label: "Love Discord",
    url: `https://discord.gg/loveethereum`,
  },
];

const contractLinks = [
  {
    icon: EtherscanIcon,
    label: "Love Contract",
    url: `https://dexscreener.com/ethereum/${ETHLPAddy}`,
  },
  {
    icon: EtherscanIcon,
    label: "War3 Contract",
    url: `https://dexscreener.com/ethereum/${WARLPAddy}`,
  },
];

const getLinks = (name: string) => {
  switch (name) {
    case "charts":
      return chartsLinks;
    case "socials":
      return socialsLinks;
    case "contracts":
      return contractLinks;
    default:
      return [];
  }
};

const LinksDirectory: FC<LinksDirectoryProps> = ({ name }) => {
  const links = getLinks(name);
  return (
    <div className="links">
      <div className="menu flex flex-row">
        <div className="p-2 border-r border-black border-1">
          <u>F</u>ile
        </div>
        <div className="p-2 border-r border-black border-1">
          <u>E</u>Edit
        </div>
        <div className="p-2 border-r border-black border-1">
          <u>V</u>View
        </div>
        <div className="p-2">
          <u>H</u>Help
        </div>
      </div>
      <div className="px-2 h-[100%] w-[100%] flex flex-wrap bg-white">
        {links.map(({ icon, label, url }, index) => (
          <div
            key={index}
            className="h-36 w-1/3 flex-col flex justify-center flex flex-basis items-center cursor-pointer"
            onClick={() => window.open(url)}
          >
            <Image alt="icon" src={icon} height={55} />
            <div className="text-[rgba(0,0,0,.80)] text-lg mt-2">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinksDirectory;

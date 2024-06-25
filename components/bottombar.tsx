import { useContext, useState, useRef, useEffect } from "react";
import { StartMenuListItem } from "./startMenuListItem";
import { PanelListItem } from "./panelListItem";
import { useCopyText } from "../system/hooks/useCopyText";
import { truncateEthAddress } from "../system/appUtils";
import {
  contractAddressLove,
  contractAddressWar,
  TipAddress,
  TipENS,
  BRIDGE_LINK,
  CHIA_LINK,
  CHIALINKS_LINK,
  SPACESCAN_LINK,
  GOBY_LINK,
  MINTGARDEN_LINK,
  XCHTRADE_LINK,
  DEXIE_LINK,
  TIBETSWAP_LINK,
  FARMERVERSE_LINK,
} from "../utils/constant";
import { FileThemeContext } from "../system/context/FileThemeContext";

interface Props {
  setSelected: (selected: string) => void;
}

const BottomBar = (props: Props) => {
  const [showSide, setShowSide] = useState<boolean>(false);
  const [sidePosition, setSidePosition] = useState<number | null>(null);

  const {
    files: {
      FarmIcon,
      PaperIcon,
      BridgeIcon,
      MglthIcon,
      ChiaIcon,
      GobyIcon,
      CLinksIcon,
      SpaceIcon,
      MintIcon,
      TradeIcon,
      DexieIcon,
      TibetIcon,
      FarmerIcon,
      heartbreakIcon,
      SettingsIcon,
      ShutdownIcon,
    },
  } = useContext(FileThemeContext);
  const { onCopyText, copied } = useCopyText();
  const list = [
    {
      menu: "chia",
      icon: ChiaIcon,
      name: "<u>C</u>hia",
      haveSub: true,
    },
    {
      menu: "bridge",
      icon: BridgeIcon,
      name: "Warp<u>B</u>ridge",
      link: BRIDGE_LINK,
    },
    {
      menu: "mglth",
      icon: MglthIcon,
      name: "<u>M</u>glth",
    },
    {
      menu: "farm",
      icon: FarmIcon,
      name: "<u>F</u>arm",
    },
    {
      menu: "paper",
      icon: PaperIcon,
      name: "<u>P</u>aper",
    },
    {
      menu: "heartbreak",
      icon: heartbreakIcon,
      name: "<u>H</u>EARTBREAK",
    },
    {
      menu: "settings",
      icon: SettingsIcon,
      name: "<u>S</u>ettings",
      haveSub: true,
    },
    {
      menu: "shutdown",
      icon: ShutdownIcon,
      name: "Sh<u>u</u>t Down",
    },
  ];

  const list_cp = [
    {
      menu: "cp",
      icon: SettingsIcon,
      name: "<u>C</u>ontrol Panel",
    },
  ];
  const list_chia = [
    {
      menu: "chia",
      icon: ChiaIcon,
      name: "Full <u>N</u>ode Wallet",
      link: CHIA_LINK,
    },
    {
      menu: "goby",
      icon: GobyIcon,
      name: "<u>B</u>rowser Wallet",
      link: GOBY_LINK,
    },
    {
      menu: "chia_links",
      icon: CLinksIcon,
      name: "Chia <u>L</u>inks",
      link: CHIALINKS_LINK,
    },
    {
      menu: "spacescan",
      icon: SpaceIcon,
      name: "<u>S</u>paceScan Explorer",
      link: SPACESCAN_LINK,
    },
    {
      menu: "mintgarden",
      icon: MintIcon,
      name: "<u>M</u>int Garden",
      link: MINTGARDEN_LINK,
    },
    {
      menu: "xchtrade",
      icon: TradeIcon,
      name: "<u>X</u>CH Trade",
      link: XCHTRADE_LINK,
    },
    {
      menu: "dexie",
      icon: DexieIcon,
      name: "<u>D</u>exie Swap",
      link: DEXIE_LINK,
    },
    {
      menu: "tibetswap",
      icon: TibetIcon,
      name: "<u>T</u>ibet Swap",
      link: TIBETSWAP_LINK,
    },
    {
      menu: "farmerverse",
      icon: FarmerIcon,
      name: "<u>F</u>armer Verse",
      link: FARMERVERSE_LINK,
    },
  ];

  const renderCopyAddress = (ca: string, label = "CA:") => {
    return (
      <div className="flex flex-row justify-between font-windows hover:text-white hover:bg-[#0A0080] cursor-pointer sm:hidden">
        <div className="flex flex-row items-center w-full">
          <div className="py-1 justify-center items-center w-[68px] flex">
            {label}
          </div>
          <div className="text-[22px] truncate" onClick={() => onCopyText(ca)}>
            {copied ? "Copied.........." : truncateEthAddress(ca)}
          </div>
        </div>
      </div>
    );
  };

  const renderCopyAddressTip = (ca: string, label = "CA:", label2 = TipENS) => {
    return (
      <div className="flex flex-row justify-between font-windows hover:text-white hover:bg-[#0A0080] cursor-pointer sm:hidden">
        <div className="flex flex-row items-center w-full">
          <div className="py-1 justify-center items-center w-[68px] flex">
            {label}
          </div>
          <div className="text-[22px] truncate" onClick={() => onCopyText(ca)}>
            {copied ? "Copied.........." : label2}
          </div>
        </div>
      </div>
    );
  };

  const handleShowSide = (show: boolean, index: number) => {
    setShowSide(show);
    setSidePosition(show ? index : null);
  };

  const calculatePanelPosition = () => {
    const maxHeight = window.innerHeight;
    const position = sidePosition !== null ? sidePosition * 36 : 0; // Assuming each item is 36px in height
    const panelHeight = 36 * list_chia.length; // Adjust as needed
  
    // Calculate the current bottom position of the panel
    const panelBottom = position + panelHeight;
    
    // Calculate max bottom position based on the bottom of the screen
    const maxBottomPosition = maxHeight - window.scrollY; // Adjust based on the current scroll position
    
    // Debugging output
    console.log("sidePosition:", sidePosition);
    console.log("Position:", position);
    console.log("Panel Height:", panelHeight);
    console.log("Panel Bottom:", panelBottom);
    console.log("Max Bottom Position:", maxBottomPosition);
    
    // Check if the panel exceeds the max bottom position
    if (panelBottom > maxBottomPosition) {
      // Calculate the negative offset to move the panel up
      const offset = -(panelBottom - maxBottomPosition);
      console.log("Offset:", offset);
      return offset;
    }
    
    // Default: no adjustment needed, return the calculated position
    console.log("No Offset");
    return position;
  };
  
  return (
    <div className="flex flex-row relative w-[372px] sm:w-[427px]">
      <div className="bg-[#C1C1C1] w-[185px] sm:w-[240px] border-r-2 border border-b-2 border-b-black border-r-black border-t-white border-l-white">
        {renderCopyAddress(contractAddressLove, "LOVE:")}
        {renderCopyAddress(contractAddressWar, "WAR3:")}
        {renderCopyAddressTip(TipAddress, "Tip:", TipENS)}
        {list.map((item, index) => (
          <StartMenuListItem
            key={`start-menu-list-item-${index}`}
            haveSub={item.haveSub}
            onSelected={(selected) => props.setSelected(selected)}
            onShowSide={(showSide) => handleShowSide(showSide, index)}
            icon={item.icon}
            name={item.name}
            menu={item.menu}
            link={item.link} // Pass the link prop
          />
        ))}
      </div>

      {showSide && sidePosition !== null && (
       <div
          className="absolute bg-[#C1C1C1] w-[185px] sm:w-[240px] border-r-2 border border-b-2 border-b-black border-r-black border-t-white border-l-white overflow-y-auto max-h-[32.5vh]"
          style={{
            top: `${calculatePanelPosition()}px`,
            left: "240px",
          }}
        >
          {list[sidePosition]?.menu === "settings" &&
            list_cp.map((item, index) => (
              <PanelListItem
                key={`cp-panel-list-item-${index}`}
                onSelected={(selected) => props.setSelected(selected)}
                onShowSide={(showSide) => handleShowSide(showSide, index)}
                icon={item.icon}
                name={item.name}
                menu={item.menu}
               
              />
            ))}

          {list[sidePosition]?.menu === "chia" &&
            list_chia.map((item, index) => (
              <PanelListItem
                key={`panel-list-item-${index}`}
                onSelected={(selected) => props.setSelected(selected)}
                onShowSide={(showSide) => handleShowSide(showSide, index)}
                icon={item.icon}
                name={item.name}
                menu={item.menu}
                link={item.link} // Pass the link prop
                
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default BottomBar;

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
  TG_DISCORD_LINK,
  TG_TWITTER_LINK,
  HOA_LINK,
  WHOA_9MM_LINK,
  WHOA_DS_LINK,
  TANGBEARS_LINK,
  BASE_TANGBEARS_LINK,
  GOOEYS_LINK,
  TG_WEB_LINK,
  WELCOME_LINK,
  WT_LINK,
  BABIES_LINK,
  NOTNINTENDO_LINK,
  SPEECHLESS_X_LINK,
  LOVEBEARS_LINK,
  AWIZARD_X_LINK,
  NEMO_X_LINK,
  NEMO_FISH_LINK,
  NEMO_RINOS_LINK,
  DBC_X_LINK,
  DBC_MOJO_LINK,
  PAIN_X_LINK,
  PAIN_F_LINK,
  VOTE_LINK,
  TYLER_X_LINK,
  QUANTUM_LINK,
  QUANTUM_GH_LINK,
} from "../utils/constant";
import { FileThemeContext } from "../system/context/FileThemeContext";

interface Props {
  setSelected: (selected: string) => void;
}

const BottomBar = (props: Props) => {
  const [showSide, setShowSide] = useState<boolean>(false);
  const [sidePosition, setSidePosition] = useState<number | null>(null);

  const [showSide2, setShowSide2] = useState<boolean>(false);
const [sidePosition2, setSidePosition2] = useState<number | null>(null);


  //const [menuItemId, setMenuItemId] = useState<string>("");

  const {
    files: {
      FarmIcon,
      PaperIcon,
      BridgeIcon,
      HeartBridgeIcon,
      MglthIcon,
      OmakIcon,
      BabiesIcon,
      WTIcon,
      GooeyIcon,
      PokeganIcon,
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
      TwitterIcon,
      DiscordIcon,
      HoaIcon,
      NinemmIcon,
      TangbearsIcon,
      BasebearsIcon,
      DexscreenerIcon,
      TGtwitterIcon,
      ArtIcon,
      SpeechlessIcon,
      DBCIcon,
      PainIcon,
      NemoIcon,
      NemoRinoIcon,
      LoveBearIcon,
      aWizardIcon,
      VoteIcon,
      TylerIcon,
      TylerQIcon,
      TylerGHIcon,
    },
  } = useContext(FileThemeContext);
  const { onCopyText, copied } = useCopyText();
  const list = [
    {
      menu: "featured",
      icon: ArtIcon,
      name: "<u>F</u>eatured",
      haveSub: true,
    },
    {
      menu: "tanggang",
      icon: HoaIcon,
      name: "<u>T</u>angGang",
      link: TG_WEB_LINK,
      haveSub: true,
    },
    {
      menu: "chia",
      icon: ChiaIcon,
      name: "<u>C</u>hia",
      haveSub: true,
    },
    {
      menu: "omakasea",
      icon: OmakIcon,
      name: "<u>O</u>makasea",
      link: WELCOME_LINK,
      haveSub: true,
    },
    {
      menu: "bridge",
      icon: HeartBridgeIcon,
      name: "Warp<u>B</u>ridge",
      link: BRIDGE_LINK,
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
      menu: "vote",
      icon: VoteIcon,
      name: "<u>V</u>ote",
      link: VOTE_LINK,
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


  const list_omak = [
        {
      menu: "gooeys",
      icon: GooeyIcon,
      name: "Eth <u>G</u>obblers",
      link: GOOEYS_LINK,
    },
    {
      menu: "mglth",
      icon: MglthIcon,
      name: "<u>M</u>glth",
    },
    {
      menu: "notnintendo",
      icon: PokeganIcon,
      name: "<u>N</u>ot Nintendo",
      link: NOTNINTENDO_LINK,
    },
    {
      menu: "turtles",
      icon: WTIcon,
      name: "<u>W</u>inged Turtles",
      link: WT_LINK,
    },
    {
      menu: "babies",
      icon: BabiesIcon,
      name: "80's <u>B</u>abies",
      link: BABIES_LINK,
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

  const list_tanggang = [
    {
      menu: "hoa_trade",
      icon: HoaIcon,
      name: "<u>H</u>OA on Chia",
      link: HOA_LINK,
    },
        {
      menu: "hoa_twitter",
      icon: TGtwitterIcon,
      name: "TG <u>T</u>witter",
      link: TG_TWITTER_LINK,
    },
    {
      menu: "hoa_discord",
      icon: DiscordIcon,
      name: "TG <u>D</u>iscord",
      link: TG_DISCORD_LINK,
    },
    {
      menu: "tangbears",
      icon: TangbearsIcon,
      name: "<u>T</u>ang Bears",
      link: TANGBEARS_LINK,
    },
    {
      menu: "hoa_9mm",
      icon: NinemmIcon,
      name: "wHOA <u>9</u>mm on Base",
      link: WHOA_9MM_LINK,
    },
    {
      menu: "hoa_ds",
      icon: DexscreenerIcon,
      name: "wHOA <u>D</u>exScreener",
      link: WHOA_DS_LINK,
    },
    {
      menu: "basetangbears",
      icon: BasebearsIcon,
      name: "<u>B</u>ase Tang Bears",
      link: BASE_TANGBEARS_LINK,
    },
  ];

  const list_featured = [
    {
      menu: "nemo",
      icon: NemoIcon,
      name: "<u>N</u>emo",
      link: NEMO_X_LINK,
      haveSub: true, // Ensure this is set to true
    },
        {
      menu: "pain",
      icon: PainIcon,
      name: "<u>P</u>ain",
      link: PAIN_X_LINK,
      haveSub: true, // Ensure this is set to true
    },
    {
      menu: "dbc",
      icon: DBCIcon,
      name: "<u>D</u>BC",
      link: DBC_X_LINK,
      haveSub: true, // Ensure this is set to true
    },
    {
      menu: "speechless",
      icon: SpeechlessIcon,
      name: "<u>S</u>peechless",
      link: SPEECHLESS_X_LINK,
      haveSub: true, // Ensure this is set to true
    },
    {
      menu: "tyler",
      icon: TylerIcon,
      name: "<u>T</u>yler",
      link: TYLER_X_LINK,
      haveSub: true, // Ensure this is set to true
    },
  ];

  const list_nemo = [
    {
      menu: "nmint",
      icon: NemoIcon,
      name: "<u>M</u>int",
      link: NEMO_FISH_LINK,
    },
    {
      menu: "nrinos",
      icon: NemoRinoIcon,
      name: "<u>R</u>inos",
      link: NEMO_RINOS_LINK,
    },
  ];

  const list_pain = [
    {
      menu: "pfoundation",
      icon: PainIcon,
      name: "<u>F</u>oundation",
      link: PAIN_F_LINK,
    },
  ];

  const list_dbc = [
    {
      menu: "dgarden",
      icon: DBCIcon,
      name: "<u>M</u>ojo",
      link: DBC_MOJO_LINK,
    },
  ];

  const list_speechless = [
    {
      menu: "lovebear",
      icon: LoveBearIcon,
      name: "<u>L</u>oveBears",
      link: LOVEBEARS_LINK,
    },
    {
      menu: "awizx",
      icon: aWizardIcon,
      name: "a<u>W</u>izard",
      link: AWIZARD_X_LINK,
    },
  ];

  const list_tyler = [
    {
      menu: "quantum",
      icon: TylerQIcon,
      name: "<u>Q</u>uantum",
      link: QUANTUM_LINK,
    },
    {
      menu: "quantum_gh",
      icon: TylerGHIcon,
      name: "<u>T</u>rade GH Bot",
      link: QUANTUM_GH_LINK,
    },
  ];


  const renderCopyAddress = (ca: string, label = "CA:") => {
    return (
      <div className="flex flex-row justify-between font-windows hover:text-white hover:bg-[#0A0080] cursor-pointer sm:hidden">
        <div className="flex flex-row items-center w-full">
          <div className="py-1 justify-center items-center w-[68px] flex">
            {label}
          </div>
          <div className="text-[18px] truncate" onClick={() => onCopyText(ca)}>
            {copied ? "Copied.........." : truncateEthAddress(ca)}
          </div>
        </div>
      </div>
    );
  };

  const renderCopyAddressTip = (ca: string, label1 = "CA:", label2 = TipENS) => {
    return (
      <div className="flex flex-row justify-between font-windows hover:text-white hover:bg-[#0A0080] cursor-pointer sm:hidden">
        <div className="flex flex-row items-center w-full">
          <div className="py-1 justify-center items-center w-[68px] flex">
            {label1}
          </div>
          <div className="text-[18px] truncate" onClick={() => onCopyText(ca)}>
            {copied ? "Copied.........." : label2}
          </div>
        </div>
      </div>
    );
  };

  const handleShowSide = (show: boolean, index: number) => {
    setShowSide(show);
    setSidePosition(show ? index : null);
    setShowSide2(false);
  };
  const handleShowSide2 = (show: boolean, index: number) => {
    setShowSide2(show);
    setSidePosition2(show ? index : null);
  };
  

  
  return (
    //<div className="bottom-bar-container">
    //</div><div className="start-menu-container">
      
    <div  className="flex flex-row relative w-[405px] sm:w-[460px]">
      <div className="bg-[#C1C1C1] w-[185px] sm:w-[240px] border-r-2 border border-b-2 border-b-black border-r-black border-t-white border-l-white">
        {renderCopyAddress(contractAddressLove, "LOVE:")}
        {renderCopyAddress(contractAddressWar, "WAR3:")}
        {renderCopyAddressTip(TipAddress, "Tip:", TipENS)}

        <div className="start-menu-list">
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
      </div>
      {showSide && sidePosition !== null && (
          <div className="relative">
           <div
             className="absolute bg-[#C1C1C1] w-[220px] border-r-2 border border-b-2 border-b-black border-r-black border-t-white border-l-white overflow-y-auto max-h-[100.0vh] ml-2"
             style={{
              bottom: list[sidePosition]?.menu === "settings" ? `${34}px` : 
              list[sidePosition]?.menu === "omakasea" ? `${71}px` : 
              list[sidePosition]?.menu === "chia" ? `${3}px` : 
              list[sidePosition]?.menu === "featured" ? `${165}px` :
              (list[sidePosition]?.menu === "tanggang" ? `${68}px` :   "auto"),

              left: "56%", // Position it to the right of the parent container
               transform: "translateX(-8px)", // Adjust as needed for alignment
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

          {list[sidePosition]?.menu === "omakasea" &&
            list_omak.map((item, index) => (
              <PanelListItem
                key={`omakasea-panel-list-item-${index}`}
                onSelected={(selected) => props.setSelected(selected)}
                onShowSide={(showSide) => handleShowSide(showSide, index)}
                icon={item.icon}
                name={item.name}
                menu={item.menu}
                link={item.link} // Pass the link prop
                    />
            ))}

          {list[sidePosition]?.menu === "chia" &&
            list_chia.map((item, index) => (
              <PanelListItem
                key={`chia-panel-list-item-${index}`}
                onSelected={(selected) => props.setSelected(selected)}
                onShowSide={(showSide) => handleShowSide(showSide, index)}
                icon={item.icon}
                name={item.name}
                menu={item.menu}
                link={item.link} // Pass the link prop
                    />
            ))}

          {list[sidePosition]?.menu === "tanggang" &&
            list_tanggang.map((item, index) => (
              <PanelListItem
                key={`tanggang-panel-list-item-${index}`}
                onSelected={(selected) => props.setSelected(selected)}
                onShowSide={(showSide) => handleShowSide(showSide, index)}
                icon={item.icon}
                name={item.name}
                menu={item.menu}
                link={item.link} // Pass the link prop
                    />
            ))}
          {list[sidePosition]?.menu === "featured" &&
              list_featured.map((item, index) => (
                <PanelListItem
                  key={`artist-panel-list-item-${index}`}
                  haveSub={item.haveSub}
                  onSelected={(selected) => props.setSelected(selected)}
                  //onShowSide={(showSide) => handleShowSide(showSide, index)}
                  icon={item.icon}
                  name={item.name}
                  menu={item.menu}
                  link={item.link} // Pass the link prop
                  onShowSide={(showSide) => handleShowSide2(showSide, index)}
                 // onSelected={(selected) => props.setSelected(selected)}
                      />
              ))}
        </div>
        </div>
        )}
        {showSide2 && sidePosition2 !== null && (
          <div className="sub-menu">
            <div
              className="absolute bg-[#C1C1C1] w-[160px] border-r-2 border border-b-2 border-b-black border-r-black border-t-white border-l-white overflow-y-auto max-h-[100.0vh] ml-2"
              style={{
                bottom: list_featured[sidePosition2]?.menu === "pain" ? `${266}px` :
                list_featured[sidePosition2]?.menu === "dbc" ? `${232}px` :
                list_featured[sidePosition2]?.menu === "speechless" ? `${165}px` :
                list_featured[sidePosition2]?.menu === "tyler" ? `${135}px` :
                list_featured[sidePosition2]?.menu === "nemo" ? `${268}px` : "auto",
                left: "100%", // Position it to the right of the parent container
                transform: "translateX(-8px)", // Adjust as needed for alignment
              }}
            >
              {list_featured[sidePosition2]?.menu === "nemo" &&
                list_nemo.map((item, index) => (
                  <PanelListItem
                    key={`nemo-panel-list-item-${index}`}
                    onSelected={(selected) => props.setSelected(selected)}
                    onShowSide={(showSide) => handleShowSide2(showSide, index)}
                    icon={item.icon}
                    name={item.name}
                    menu={item.menu}
                    link={item.link} // Pass the link prop
                  />
                ))}
              {list_featured[sidePosition2]?.menu === "pain" &&
                list_pain.map((item, index) => (
                  <PanelListItem
                    key={`pain-panel-list-item-${index}`}
                    onSelected={(selected) => props.setSelected(selected)}
                    onShowSide={(showSide) => handleShowSide2(showSide, index)}
                    icon={item.icon}
                    name={item.name}
                    menu={item.menu}
                    link={item.link} // Pass the link prop
                  />
                ))}

              {list_featured[sidePosition2]?.menu === "dbc" &&
                list_dbc.map((item, index) => (
                  <PanelListItem
                    key={`dbc-panel-list-item-${index}`}
                    onSelected={(selected) => props.setSelected(selected)}
                    onShowSide={(showSide) => handleShowSide2(showSide, index)}
                    icon={item.icon}
                    name={item.name}
                    menu={item.menu}
                    link={item.link} // Pass the link prop
                  />
                ))}

              {list_featured[sidePosition2]?.menu === "speechless" &&
                list_speechless.map((item, index) => (
                  <PanelListItem
                    key={`speechless-panel-list-item-${index}`}
                    onSelected={(selected) => props.setSelected(selected)}
                    onShowSide={(showSide) => handleShowSide2(showSide, index)}
                    icon={item.icon}
                    name={item.name}
                    menu={item.menu}
                    link={item.link} // Pass the link prop
                  />
                ))}

              {list_featured[sidePosition2]?.menu === "tyler" &&
                list_tyler.map((item, index) => (
                  <PanelListItem
                    key={`tyler-panel-list-item-${index}`}
                    onSelected={(selected) => props.setSelected(selected)}
                    onShowSide={(showSide) => handleShowSide2(showSide, index)}
                    icon={item.icon}
                    name={item.name}
                    menu={item.menu}
                    link={item.link} // Pass the link prop
                  />
                ))}

              </div>
            </div>
            )}

        
      
    </div>
    
  );
};

export default BottomBar;


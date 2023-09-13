import Image from "next/image";
import { useContext, useState } from "react";
import { StartMenuListItem } from "./startMenuListItem";
import { useCopyText } from "../system/hooks/useCopyText";
import { truncateEthAddress } from "../system/appUtils";
import { contractAddressLove, contractAddressWar } from "../utils/constant";
import { FileThemeContext } from "../system/context/FileThemeContext";

interface Props {
  setSelected: (selected: string) => void;
}

const BottomBar = (props: Props) => {
  const [showSide, setShowSide] = useState<boolean>(false);
  const { files: { FarmIcon, PaperIcon, startIcon, heartbreakIcon, SettingsIcon, ShutdownIcon }} = useContext(FileThemeContext);
  const { onCopyText, copied } = useCopyText();
  const list = [
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
      menu: "cp",
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

  const renderCopyAddress = (ca: string, label = "CA:") => {
    return (
      <div
        className={`flex flex-row justify-between font-windows hover:text-button-hover-text hover:bg-button-hover-bg cursor-pointer sm:hidden`}
      >
        <div className="flex flex-row items-center w-full">
          <div className="py-1 justify-center items-center w-[68px] flex">
            {label}
          </div>
          <div
            className="text-[22px] truncate"
            onClick={() => onCopyText(ca)}
          >
            {copied
              ? "Copied.........."
              : `${truncateEthAddress(ca)}`}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-row relative w-[372px] sm:w-[427px]">
      <div className="bg-[#C1C1C1] w-[185px] sm:w-[240px] border-r-2 border border-b-2 border-b-black border-r-black border-t-white border-l-white">
        {renderCopyAddress(contractAddressLove, "LOVE:")}
        {renderCopyAddress(contractAddressWar, "WAR3:")}
        {list.map((item, index) => (
          <StartMenuListItem
            key={`start-menu-list-item-${index}`}
            haveSub={item.haveSub}
            onSelected={(selected) => props.setSelected(selected)}
            onShowSide={(showSide) => setShowSide(showSide)}
            icon={item.icon}
            name={item.name}
            menu={item.menu}
          />
        ))}
      </div>

      {showSide ? (
        <div>
          <div
            onClick={() => {
              props.setSelected("cp");
            }}
            className={`flex flex-row justify-between font-windows hover:text-white  hover:bg-button-hover cursor-pointer  bg-gray-400 w-[187px] h-[39px] absolute bottom-[40px] right-0 border-r-2 border border-b-2 border-b-black border-r-black border-t-white border-l-white  
          }`}
          >
            <div className="flex flex-row w-full items-center">
              <div className="w-1/3 flex flex-row justify-center ">
                <Image src={SettingsIcon} width={29} height={29} alt="icon" />
              </div>
              <div className="text-[22px] whitespace-nowrap">
                <span>
                  <u>C</u>ontrol Panel
                </span>
              </div>
            </div>
            <div className="mt-2"></div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default BottomBar;

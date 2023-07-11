import Image from "next/image";
import Computer from "../assets/computer.png";
import Setting from "../assets/settings.png";
import Shutdown from "../assets/shutdown.png";
import { useContext, useState } from "react";
import { MdArrowRight } from "react-icons/md";
import { StartMenuListItem } from "./startMenuListItem";
import { useCopyText } from "../system/hooks/useCopyText";
import { truncateEthAddress } from "../system/appUtils";
import { contractAddressLove } from "../utils/constant";
import {
  FileTheme,
  FileThemeContext,
  themeMap,
} from "../system/context/FileThemeContext";

interface Props {
  setSelected: (selected: any) => void;
}

const ThemeBar = (props: Props) => {

  return (
    <div className="z-40 bg-white border-r-2 border border-b-2 border-b-black border-r-black border-t-white border-l-white">
      {Object.keys(themeMap).map((themeKey) => {
        const theme = themeMap[themeKey as FileTheme];
        return (
          <div
            key={`theme-bar-list-item-${theme.name}`}
            className={`hover:bg-[#0A0080] hover:border-dotted hover:border border border-white   cursor-pointer hover:text-white`}
          >
            <button
             className="w-full"
             onClick={() => {
              props.setSelected(themeKey)
            }}>
              {theme.name}
            </button>
          </div>
        );
      })}
    </div>
  );
};
export default ThemeBar;

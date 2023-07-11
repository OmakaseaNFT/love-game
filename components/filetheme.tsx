import { useContext, useState } from "react";
import {
  FileThemeContext,
  themeMap,
  FileTheme as FileThemeType,
} from "../system/context/FileThemeContext";
import Image from "next/image";
import ThemeBar from "./themebar";

interface FileThemeProps {}
export const FileTheme = ({}: FileThemeProps) => {
  const {
    setFileTheme,
    fileTheme,
  } = useContext(FileThemeContext);

  const [showBar, setShowBar] = useState(false);

  return (
    <div className="px-6">
      <div className="flex flex-row text-center gap-5 pt-3">
        <div className="text-[14px] my-auto">
          <u>T</u>heme:
        </div>
        <>
          <div
            onClick={() => {
              setShowBar(!showBar);
            }}
            className="relative cursor-pointer bg-white border-b-gray-300 border-r-gray-300 border-l-gray-600 text-sm border-t-gray-600 max-w-[500px] w-full h-[24px] border-[2px] text-[18px] rounded-[2px] flex flex-row justify-between items-center mr-2"
          >
            <div className="text-[14px] mb-0 pl-2">
              {themeMap[fileTheme].name}
            </div>
            <Image
              src={"/assets/win98ArrowDown.png"}
              width={20}
              height={20}
              alt="start icon"
              className="select-none"
            />
            {showBar ? (
              <div className="absolute z-50 mt-[70px] w-full">
                <ThemeBar setSelected={setFileTheme} />
              </div>
            ) : null}
          </div>
        </>
      </div>
    </div>
  );
};

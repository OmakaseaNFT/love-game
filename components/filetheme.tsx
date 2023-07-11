import { useContext } from "react";
import { FileThemeContext, themeMap, FileTheme as FileThemeType } from "../system/context/FileThemeContext";
import Image from "next/image";

interface FileThemeProps {}
export const FileTheme = ({}: FileThemeProps) => {
  const { setFileTheme, files: { startIcon } } = useContext(FileThemeContext);
  return (
    <div>
      <div className="px-1 my-auto border-b-gray-300 items-center border-r-gray-300 border-l-gray-600 text-sm border-t-gray-600 max-w-[160px] w-full h-[30px] border-[3px] text-[18px] rounded-[2px] flex flex-row justify-center items-center mr-2">
        <div>
          <Image
            alt=""
            // quality={100}
            width={20}
            height={20}
            src={startIcon}
            className="m-auto w-[20px] h-[20px] mr-2"
          />
        </div>
        <div className="text-[11px] truncate mb-0">
          = {111} ETH/${111}
        </div>
      </div>
      {Object.keys(themeMap).map((themeKey) => {
        const theme = themeMap[themeKey as FileThemeType];
        return (
          <button
            key={theme.name}
            onClick={() => setFileTheme(themeKey as FileThemeType)}
          >
            {theme.name}
          </button>
        )
      })}
    </div>
  );
};

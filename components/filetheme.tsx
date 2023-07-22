import { useContext, useState } from "react";
import {
  FileThemeContext,
  themeMap,
  FileTheme as FileThemeType,
} from "../system/context/FileThemeContext";
import Image from "next/image";
import ThemeBar from "./themebar";
import Dialog from "./dialog";
import MintSkin from "./mintskin";

interface FileThemeProps {}
export const FileTheme = ({}: FileThemeProps) => {
  const { setFileTheme, fileTheme } = useContext(FileThemeContext);
  const [testFileTheme, setTestFileTheme] = useState<FileThemeType>(fileTheme);

  const [showBar, setShowBar] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const openPayment = () => {
    setFileTheme(testFileTheme);
    // setShowPayment(true);
  };

  const closePayment = () => {
    setShowPayment(false);
  };

  return (
    <div className="px-6">
      {showPayment && (
        <div className="z-20">
          <Dialog
            closeMe={closePayment}
            width={"94%"}
            height={"200px"}
            title={"file.exe" ?? ""}
          >
            <MintSkin closeMe={closePayment} />
          </Dialog>
        </div>
      )}
      <div className="flex flex-row text-center gap-5 pt-3 w-[82%]">
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
              {themeMap[testFileTheme ?? fileTheme].name}
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
                <ThemeBar setSelected={setTestFileTheme} />
              </div>
            ) : null}
          </div>
        </>
      </div>
      {/* border-b-gray-300 border-r-gray-300 border-l-gray-600 text-sm border-t-gray-600  */}
      <div className="w-[70%] aspect-[1.3] m-auto my-5 border-2 border-b-gray-300 border-r-gray-300 border-l-gray-600 text-sm border-t-gray-600">
        <div
          className="w-full h-full bg-[#008081]"
          style={{
            backgroundImage: `url(${themeMap[testFileTheme].background})`,
            backgroundSize: "cover",
          }}
        />
      </div>
      <div className="flex justify-center">
        <button
          onClick={openPayment}
          className="btn w-auto h-[35px] m-auto mt-2 mb-4"
        >
          Ok
        </button>
        {/* <button
          onClick={openPayment}
          className="btn w-auto h-[35px] m-auto mt-2 mb-4"
        >
          Apply
        </button> */}
      </div>
    </div>
  );
};

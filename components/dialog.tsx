import React, { FC, ReactNode, useContext, useState } from "react";
import Image from "next/image";
import { FileThemeContext } from "../system/context/FileThemeContext";

interface DialogProps {
  children: ReactNode;
  title: string;
  buttonText?: string;
  width: string | number;
  height: string | number;
  maxHeight?: boolean;
  closeMe: () => void;
}

const Dialog: FC<DialogProps> = ({
  children,
  title,
  buttonText,
  width,
  height,
  maxHeight,
  closeMe,
}) => {
  const { files: { closeIcon } } = useContext(FileThemeContext);
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  return (
    <div className="w-full h-full flex justify-center items-center absolute">
      <div
        style={
          maxHeight
            ? { width, minHeight: height, maxHeight: height, height }
            : { width, minHeight: height }
        }
        className={`dialog bg-dialog backdrop-blur border-t-white border-l-white border-r-black border-b-black border-2 flex flex-col font-windows`}
      >
        <div className="h-[100%]">
          <div className=" flex justify-between items-center bg-[#0A0080] pl-1">
            <div className="font-bold text-white">{title}</div>
            <button onClick={() => closeMe()} className="mr-1">
              <Image
                alt=""
                src={closeIcon}
                width={16}
                height={16}
              />
            </button>
          </div>
          <div className="px-2 flex h-[100%]">{children}</div>
          {buttonText && (
            <div className="p-2 flex justify-center">
              <button
                className={`w-[67px] border h-[30px] bg-gray-400 flex justify-center items-center mr-2 
        ${
          !isPressed
            ? "border-t-white border-l-white border-r-[#000] border-b-[#000]"
            : "border-t-[#000] border-l-[#000] border-r-white border-b-white"
        }`}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                {buttonText}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dialog;

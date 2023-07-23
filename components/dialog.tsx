import React, { FC, ReactNode, useContext, useState } from "react";
import Image from "next/image";
import { FileThemeContext } from "../system/context/FileThemeContext";
interface DialogProps {
  id: string;
  children: ReactNode;
  title: string;
  buttonText?: string;
  width: string | number;
  height: string | number;
  maxHeight?: boolean;
  closeMe: () => void;
}

interface DialogWithThemeProps extends DialogProps {
  isPressed: boolean;
  setPressed: (isPressed: boolean) => void;
  handleMouseDown: () => void;
  handleMouseUp: () => void;
}

const DialogLove: FC<DialogWithThemeProps> = ({
  children,
  title,
  buttonText,
  width,
  height,
  maxHeight,
  closeMe,
  handleMouseDown,
  handleMouseUp,
  isPressed,
  setPressed,
}) => {
  const {
    files: { closeIcon },
  } = useContext(FileThemeContext);

  return (
    <div className="w-full h-full flex justify-center items-center absolute">
      <div
        style={
          maxHeight
            ? { width, minHeight: height, maxHeight: height, height }
            : { width, minHeight: height }
        }
        className={`dialog bg-dialog z-20 backdrop-blur border-t-white border-l-white border-r-black border-b-black border-2 flex flex-col font-windows`}
      >
        <div className="h-[100%]">
          <div className=" flex justify-between items-center bg-[#0A0080] pl-1">
            <div className="font-bold text-white">{title}</div>
            <button onClick={() => closeMe()} className="mr-1">
              <Image alt="" src={closeIcon} width={16} height={16} />
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

const DialogVaporwaveArcade: FC<DialogWithThemeProps> = ({
  id,
  children,
  title,
  buttonText,
  width,
  height,
  maxHeight,
  closeMe,
  handleMouseDown,
  handleMouseUp,
  isPressed,
  setPressed,
}) => {
  const {
    files: { closeIcon }, fileTheme
  } = useContext(FileThemeContext);

  return (
    <div className="w-full h-full flex justify-center items-center absolute">
      <div
        style={
          maxHeight
            ? {
                width,
                minHeight: height,
                maxHeight: height,
                height,
                backgroundImage: fileTheme == 'vaporwave-arcade' && id == 'heartbreak' ? "url('/assets/skins/vaporwave-arcade/heartbreak_background.png')" : "",
                backgroundSize: "100% 100%",
              }
            : {
                width,
                minHeight: height,
                backgroundImage: fileTheme == 'vaporwave-arcade' && id == 'heartbreak' ? "url('/assets/skins/vaporwave-arcade/heartbreak_background.png')" : "",
                backgroundSize: "100% 100%",
              }
        }
        className={`
        ${id === "heartbreak" ? "bg-opacity-50" : "bg-dialog"}
        dialog  rounded-lg z-20 backdrop-blur flex flex-col font-windows border-2 pb-2`}
      >
        <div className="h-[100%]">
          <div
            className={`${
              id === "heartbreak"
                ? "bg-[#E22D5988] border-[#E57395]"
                : "border-black bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#D14B9C99] via-[#D0F53B99] to-[#00C2FF99]"
            } 
          mx-2 mt-2 pl-3 py-2 flex justify-between items-center rounded  border`}
          >
            <div className="text-white text-sm">{title}</div>
            <button onClick={() => closeMe()} className="mr-1">
              <Image alt="" src={closeIcon} width={20} height={20} />
            </button>
          </div>
          <div className="px-2 flex h-[100%]">{children}</div>
          {buttonText && (
            <div className="flex justify-center">
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

const Dialog: FC<DialogProps> = ({
  children,
  title,
  buttonText,
  width,
  height,
  maxHeight,
  closeMe,
  id,
}) => {
  const { fileTheme } = useContext(FileThemeContext);
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  switch (fileTheme) {
    case "vaporwave-arcade":
      return (
        <>
          <DialogVaporwaveArcade
            id={id}
            title={title}
            buttonText={buttonText}
            width={width}
            height={height}
            maxHeight={maxHeight}
            closeMe={closeMe}
            handleMouseDown={handleMouseDown}
            handleMouseUp={handleMouseUp}
            isPressed={isPressed}
            setPressed={setIsPressed}
          >
            {children}{" "}
          </DialogVaporwaveArcade>
        </>
      );
    default:
      return (
        <>
          <DialogLove
            id={id}
            title={title}
            buttonText={buttonText}
            width={width}
            height={height}
            maxHeight={maxHeight}
            closeMe={closeMe}
            handleMouseDown={handleMouseDown}
            handleMouseUp={handleMouseUp}
            isPressed={isPressed}
            setPressed={setIsPressed}
          >
            {children}{" "}
          </DialogLove>
        </>
      );
  }
};

export default Dialog;

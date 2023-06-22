"use client";

import Image from "next/image";
import Link from "next/link";
import PaperIcon from "@/assets/book.png";
import Settings from "@/assets/settings.png";
import FarmIcon from "@/assets/three.png";
import { useURLParam } from "@/system/hooks/useUrlParams";
import Farm from "@/components/Farm";
import Paper from "@/components/Paper";
import ControlPanel from "@/components/ControlPanel";

export const dialogOptions = ["cp", "farm", "paper", "error"];
export const existingDialog = (param: string | null) =>
  !param ? false : dialogOptions.includes(param);

export const content = (value: string | null) => {
  switch (value) {
    case "cp":
      return {
        title: "Control Panel",
        menu: "cp",
        width: 400,
        height: 400,
        icon: Settings,
        component: <ControlPanel />,
      };
    case "farm":
      return {
        menu: "farm",
        title: "FARM",
        component: <Farm />,
        width: 720,
        height: 300,
        icon: FarmIcon,
      };
    case "paper":
      return {
        menu: "paper",
        title: "PAPER",
        component: <Paper />,
        width: 400,
        height: 400,
        icon: PaperIcon,
      };
    default:
      return {
        menu: "cp",
        title: "ERROR!",
        component: (
          <div className="w-full text-center">ADDRESS NOT FOUND !</div>
        ),
        width: 200,
        height: 80,
        icon: Settings,
      };
  }
};

const Dialog = () => {
  const { value } = useURLParam("dialog");
  if (!existingDialog(value)) return null;

  const { width, height, title, component } = content(value)!;

  return (
    <div className="absolute flex items-center justify-center w-full h-full">
      <div
        style={{ width, minHeight: height }}
        className="bg-[#C1C1C1] border-t-white border-l-white border-r-black border-b-black border-2 flex flex-col font-windows"
      >
        <div className="flex justify-between items-center bg-[#0A0080] pl-1">
          <div className="font-bold text-white">{title}</div>
          <Link href="/" className="mr-1">
            <Image alt="" src="/assets/win98Close.png" width={16} height={16} />
          </Link>
        </div>
        <div className="flex px-2">{component}</div>
      </div>
    </div>
  );
};

export default Dialog;

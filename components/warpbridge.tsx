import { useEffect, useState } from "react";
//import { useAccount } from "wagmi";
//import { useWrongNetwork } from "../system/hooks/useWrongNetwork";
//import { WalletConnectButton } from "./ui/WallectConnectButton";
//import WarpBridgePage from "./warpbridgepage"; // Import WarpBridgePage component
//import { Slot } from "@radix-ui/react-slot"; // Example import from Radix UI
//import { cva, VariantProps } from "class-variance-authority"; // Example import from class-variance-authority
//import * as TooltipPrimitive from "@radix-ui/react-tooltip"; // Import TooltipPrimitive from Radix UI

const WarpBridge = () => {
  const menuBars = [
    {
      text: "<u>H</u>ello",
    },
    {
      text: "<u>U</u>ser",
    },
    {
      text: "<u>W</u>arp",
    },
    {
      text: "<u>R</u>eady",
    },
  ];

  return (
    <div className="w-full flex flex-col">
      <div className="text-gray-500 mt-1">
        {menuBars.map((item, idx) => (
          <span
            key={idx}
            dangerouslySetInnerHTML={{ __html: item.text }}
            className="mr-2"
          />
        ))}
      </div>
      <div className="sm:order-first order-last flex flex-row gap-2 w-full mt-2">
        <div className="flex flex-col gap-2  w-[70%]">
          <div className="flex flex-row text-xl">
            {/* Additional content here */}
          </div>
        </div>
      </div>
      <div className="w-full h-[500px] overflow-y-auto border-l-gray-200 border-t-gray-200 border-r-gray-600 border-b-gray-600 portrait:border-b-0 border-2 p-2 mb-2">
        {/* Placeholder for additional content */}
        <iframe src="https://warp.awizard.dev/" width="100%" height="480px" frameborder="0" scrolling="auto"></iframe>
      </div>
      {/* <WarpBridgePage /> Insert WarpBridgePage component here */}
    </div>
  );
};

export default WarpBridge;

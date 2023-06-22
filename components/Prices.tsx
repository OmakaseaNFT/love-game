"use client";

import useLoveStore from "../system/stores/loveStore";
import Image from "next/image";

export default function Prices() {
  const { price, USDPrice } = useLoveStore();
  return (
    <div className="px-1 my-auto border-b-gray-300 border-r-gray-300 border-l-gray-600 text-sm border-t-gray-600 max-w-[160px] w-full h-[30px] border-[3px] text-[18px] rounded-[2px] flex flex-row justify-center items-center mr-2">
      <div>
        <Image
          alt="Start Icon"
          width={20}
          height={20}
          src="/assets/start-icon.png"
          className="m-auto mr-2"
        />
      </div>
      <div className="text-[11px] truncate mb-0">
        = {price} ETH/${USDPrice.toFixed(2)}
      </div>
    </div>
  );
}

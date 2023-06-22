"use client";

import { useEffect } from "react";
import Image from "next/image";
import { truncateEthAddress } from "@/system/appUtils";
import { useCopyText } from "@/system/hooks/useCopyText";
import { useURLParam } from "@/system/hooks/useUrlParams";
import { contractAddressLove } from "@/utils/constant";
import { useAppStore } from "@/system/stores/appStore";
import Prices from "@/components/Prices";
import ActiveButton from "@/components/ActiveButton";
import BottomBar from "@/components/BottomBar";
import Dialog from "@/components/Dialog";
import AppScreen from "@/components/AppScreen";

const Win98 = () => {
  const { scale, showBar } = useAppStore();
  const { value } = useURLParam("dialog");
  const { onCopyText, copied } = useCopyText();

  useEffect(() => {
    if (value) {
      useAppStore.setState({ showBar: false });
    }
  }, [value]);

  return !scale ? (
    <div />
  ) : (
    <div
      style={{
        transform: scale,
      }}
      className={`w-full h-full sm:w-[800px] sm:h-[600px] flex bg-[#008081] flex-col justify-between m-auto relative z-40`}
    >
      {showBar && (
        <div>
          <div
            onClick={() => useAppStore.setState({ showBar: false })}
            className="absolute z-40 flex w-full h-full"
          ></div>
          <div className="absolute bottom-[42px] left-0 z-50">
            <BottomBar />
          </div>
        </div>
      )}

      <AppScreen>
        <Dialog />
      </AppScreen>

      <div className="flex flex-row justify-between bg-gray-400 py-[1px] h-[42px] border-l-gray-200 border-t-gray-200 border-r-gray-600 border-b-gray-600 border-[1.6px] z-10 absolute bottom-0 right-0 left-0">
        <div className="flex flex-row">
          <button
            onClick={() => useAppStore.setState({ showBar: !showBar })}
            className="flex flex-row btn"
          >
            <Image
              alt="Start Love"
              width={80}
              height={22}
              src="/assets/startLove.png"
              className="m-auto"
            />
          </button>
          {value && <ActiveButton contentType={value} isSmall />}
          <ActiveButton
            text={
              copied
                ? "Copied.........."
                : `CA: ${truncateEthAddress(contractAddressLove)}`
            }
            onClick={() => onCopyText(contractAddressLove)}
            isSmall
            isInactive
          />
        </div>
        <Prices />
      </div>
    </div>
  );
};

export default Win98;

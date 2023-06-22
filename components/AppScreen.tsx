"use client";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Key, ReactNode, useState } from "react";
import { useAccount } from "wagmi";
import { iconsLeft, iconsRight } from "@/utils/constant";
import { useAppStore } from "@/system/stores/appStore";
import ConnectButton from "./ConnectButton";
import RandomDialog from "./RandomDialog";

const AppScreen = ({ children }: { children: ReactNode }) => {
  const [hide, setHide] = useState<boolean>(true);
  const router = useRouter();
  const { wallpaper } = useAppStore();
  const { address } = useAccount();

  const onClaim = async () => {
    router.replace("/?dialog=cp");

    try {
      const response = await axios.post(`/api/markle`, {
        address: address,
      });

      if (response) {
        router.push("/?dialog=success"); // need to add success page
      }
    } catch (error) {
      console.error("No Address Found!", error);
      router.push("/?dialog=error");
    }
  };

  return (
    <div
      className="flex w-full h-full bg-cover bg-center relative overflow-auto mb-[10px]"
      style={{
        backgroundImage: `url(${wallpaper ?? ""})`,
      }}
    >
      <RandomDialog hide={hide} setHide={setHide} setFinish={onClaim} />
      {hide ? (
        <div className="flex w-full h-full">
          {children}
          <div className="flex flex-row justify-between w-full p-8 sm:p-0">
            <div className="w-[110px] sm:w-[200px]">
              {iconsLeft.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center cursor-pointer h-36"
                    onClick={() => window.open(item.url, "_blank")}
                  >
                    <Image
                      src={item.icon}
                      alt="icon"
                      height={item.logoHeight ?? 80}
                      width={item.logoHeight ?? 80}
                    />
                    {item.label && (
                      <div className="text-[rgba(255,255,255,.80)] text-lg mt-2">
                        {item.label}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="w-[110px] sm:w-[200px]">
              <div className="flex flex-row items-center justify-center h-36">
                {" "}
                <ConnectButton />
              </div>
              {iconsRight.map((item, index: Key | null | undefined) => {
                return (
                  <Link
                    href={`/?dialog=${item.type}`}
                    key={index}
                    className="flex flex-row items-center justify-center cursor-pointer h-36"
                  >
                    <Image src={item.icon} alt="icon" height={80} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AppScreen;

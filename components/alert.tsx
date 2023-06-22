import React, { FC } from "react";
import Image from "next/image";
import LoadingBar from "./LoadingBar";

interface AlertProps {
  key:
    | "not_enough_eth"
    | "already_claimed"
    | "wrong_network"
    | "no_love_tokens"
    | "transaction_pending"
    | "transaction_success"
    | "transaction_error";
  text: string;
  icon?: string;
}

const Alert: FC<{
  alertKey: AlertProps["key"];
  close: () => void;
}> = ({ alertKey, close }) => {
  const alerts: AlertProps[] = [
    {
      key: "not_enough_eth",
      icon: "/assets/notEnoughETH.png",
      text: "Not Enough Goerli",
    },
    {
      key: "already_claimed",
      icon: "/assets/alreadyClaimed.png",
      text: "Already Claimed",
    },
    {
      key: "wrong_network",
      icon: "/assets/wrongNetwork.png",
      text: "Wrong Network",
    },
    {
      key: "no_love_tokens",
      icon: "/assets/erroricon.png",
      text: "Need LOVE in your wallet to use the farm",
    },
    {
      key: "transaction_pending",
      text: "Transaction Pending",
    },
    {
      key: "transaction_success",
      icon: "/assets/checkmark.png",
      text: "Transaction Successful",
    },
    {
      key: "transaction_error",
      text: "There was an error with your transaction",
      icon: "/assets/erroricon.png",
    },
  ];
  const alertData = alerts.find((i) => i.key === alertKey);

  return (
    <div
      style={{ zIndex: 100 }}
      className="w-full h-full flex justify-center items-center fixed top-0"
    >
      <div className="w-[220px] h-[110px] bg-[#C1C1C1] border-t-white border-l-white border-r-black border-b-black border-2 flex flex-col font-windows">
        <div className=" flex justify-between items-center bg-[#0A0080] pl-1">
          <div />

          <button onClick={() => close()} className="mr-[1px]">
            <Image alt="" src="/assets/win98Close.png" width={16} height={16} />
          </button>
        </div>
        <div className="flex flex-row items-center m-auto pb-4">
          {alertData?.icon && (
            <Image alt="" src={alertData?.icon ?? ""} width={48} height={48} />
          )}

          <div className={`px-2 flex min-w-[110px]`}>{alertData?.text}</div>
        </div>
        {alertData?.key == "transaction_pending" && <LoadingBar />}
      </div>
    </div>
  );
};

export default Alert;

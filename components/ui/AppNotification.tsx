import React from "react";
import Image from "next/image";
import LoadingBar from "./LoadingBar";

interface AppNotificationProps {
  notificationKey: string;
  text: string;
  icon?: string;
  onClose: () => void;
}

const AppNotification = ({
  text,
  icon,
  notificationKey,
  onClose,
}: AppNotificationProps) => {
  return (
    <div
      style={{ zIndex: 100 }}
      className="w-full h-full flex justify-center items-center fixed top-0"
    >
      <div className="w-[220px] h-[110px] bg-[#C1C1C1] border-t-white border-l-white border-r-black border-b-black border-2 flex flex-col font-windows">
        <div className=" flex justify-between items-center bg-[#0A0080] pl-1">
          <div />
          <button onClick={() => onClose()} className="mr-[1px]">
            <Image alt="" src="/assets/win98Close.png" width={16} height={16} />
          </button>
        </div>
        <div className="flex flex-row items-center m-auto h-[100%] items-center overflow-hidden">
          {icon && <Image alt="" src={icon ?? ""} width={48} height={48} />}

          <div
            className={`px-2 flex min-w-[110px] h-[100%] items-center overflow-x-hidden overflow-y-auto`}
          >
            <p style={{ width: "140px", maxHeight: "100%" }}>{text}</p>
          </div>
        </div>
        {notificationKey === "transaction_pending" && <LoadingBar />}
      </div>
    </div>
  );
};

export default AppNotification;

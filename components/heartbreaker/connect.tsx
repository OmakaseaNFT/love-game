import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

export const ConnectHeartBreak = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className="px-[13px] bg-[#0A0080] text-[12px] h-[18px]   border-[#ededed] text-white border-r-[#444444] border border-b-[#444444] px-[3px] text-center  py-[1px]"
                  >
                    SIGN IN
                  </button>
                );
              }
              return (
                <div className="flex flex-row items-center">
                  <div className="text-[8px] flex flex-col  items-end text-[#0A0080]">
                    <div>Wallet Connected</div>
                    <div> {account.displayName}</div>
                  </div>
                  <button
                    onClick={openConnectModal}
                    className="px-[13px] ml-1 bg-[#0A0080] text-[12px] h-[18px]   border-[#ededed] text-white border-r-[#444444] border border-b-[#444444] px-[3px] text-center  py-[1px]"
                  >
                    Hello!
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

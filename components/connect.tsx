import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { FileThemeContext } from "../system/context/FileThemeContext";
import { useContext } from "react";
//import Wallet from "../assets/wallet.png";
export const Connect = () => {
  const { files: { WalletIcon } } = useContext(FileThemeContext)
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
                    className="flex flex-col items-center"
                  >
                    <Image width={60} src={WalletIcon} alt="wallet" height={60} />
                    <div className="text-base text-white/80 text-center mt-2">
                      Connect Wallet
                    </div>
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button" className="flex flex-col items-center">
                    <Image width={60} src={WalletIcon} alt="wallet" height={60} />
                    <div className="text-base text-white/80 text-center mt-2">
                      Wrong network
                    </div>
                  </button>
                );
              }
              return (
                <div className="flex flex-col">
                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="flex flex-col items-center"
                  >
                    <Image width={60} src={WalletIcon} alt="wallet" height={60} />
                    <div className="text-sm text-white/80 text-center mt-2">
                      Wallet Connected
                    </div>
                    <div className="text-white/80 text-sm">
                      {account.displayName}
                    </div>
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

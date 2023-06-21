// import { Flex, TypographyProps, Text } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react"

type Props = {
    connectWalletElement: any;
    wrongNetworkElement?: any;
    walletConnectedElement?: any;
};

/**
 * Renders a button for connecting connecting and interacting
 * with a users wallet. Displays address when connected.
 *
 * @param props.connectWalletButton    Text/Image to display when no wallet is connected.
 */
export const WalletConnectButton = ({
    connectWalletElement,
    wrongNetworkElement,
    walletConnectedElement
}: Props) => {
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
                    (!authenticationStatus ||
                        authenticationStatus === "authenticated");
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
                                    <div
                                        style={{
                                            flexDirection: "column",
                                            cursor: "pointer",
                                        }}
                                        onClick={openConnectModal}
                                    >
                                        {connectWalletElement || "Wrong Network"}
                                    </div>
                                );
                            }
                            if (chain.unsupported) {
                                return (
                                    <div onClick={openChainModal}>
                                        <>
                                            {wrongNetworkElement ||
                                                "Wrong Network"}
                                        </>
                                    </div>
                                );
                            }
                            return <div>{walletConnectedElement || account.displayName}</div>;
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
};

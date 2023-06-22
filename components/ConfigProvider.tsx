"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { WagmiConfig as WagmiConfigProvider, useAccount } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig } from "wagmi";
import { mainnet, goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { ethers } from "ethers";
import { useEffect, useLayoutEffect } from "react";
import { hotjar } from "react-hotjar";
import { TermsAndConditionsWrapper } from "@/components/TermsAndConditionsWrapper";
import { AppContracts } from "@/system/contracts/AppContracts";
import { useAppStore } from "@/system/stores/appStore";
import getLovePrices from "@/system/getLovePrices";
import { HOT_JAR_SITE_ID, HOT_JAR_VERSION } from "@/utils/constant";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [goerli]
      : [mainnet]),
  ],
  [publicProvider()]
);

const wallets = getDefaultWallets({
  appName: "RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: wallets.connectors,
  publicClient: publicClient,
  webSocketPublicClient: webSocketPublicClient,
});

export default function ConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isConnected } = useAccount();

  useEffect(() => {
    if (window.location.hostname === "www.love.game") {
      hotjar.initialize(HOT_JAR_SITE_ID, HOT_JAR_VERSION);
    }

    // eslint-disable-next-line
    if ((window as any).ethereum) {
      const provider = new ethers.providers.Web3Provider(
        // eslint-disable-next-line
        (window as any).ethereum
      );
      const { ethLovePoolContract, usdEthPoolContract } = new AppContracts(
        provider
      );
      getLovePrices(ethLovePoolContract, usdEthPoolContract);
    }
  }, []);

  useLayoutEffect(() => {
    if (window) {
      // set the scale of the page
      const w = window.innerWidth;
      const h = window.innerHeight;
      let scale = 1;
      if (w >= 640) {
        if (w / h >= 4 / 3) {
          scale = h / 600;
        } else if (h / w >= 3 / 4) {
          scale = w / 800;
        }
      }
      useAppStore.setState({ scale: `scale(${scale}` });
    }
  }, []);

  return (
    <WagmiConfigProvider config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={null}
        id={isConnected ? "rainbowkitConnected" : "rainbowkitNotConnected"}
      >
        <TermsAndConditionsWrapper>{children}</TermsAndConditionsWrapper>
      </RainbowKitProvider>
    </WagmiConfigProvider>
  );
}

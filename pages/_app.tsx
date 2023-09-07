import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { configureChains, createConfig, WagmiConfig, useAccount } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { Analytics } from "@vercel/analytics/react";
import { useEffect } from "react";
import { hotjar } from "react-hotjar";
import {
  HOT_JAR_SITE_ID,
  HOT_JAR_VERSION,
} from "../utils/constant";
import { TermsAndConditionsWrapper } from "../components/ui/TermsAndConditionsWrapper";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [sepolia]
      : [mainnet]),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  const { isConnected } = useAccount()
  
  useEffect(() => {
    if (window.location.hostname === "www.love.game") {
      hotjar.initialize(HOT_JAR_SITE_ID, HOT_JAR_VERSION);
    }
  }, []);

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={null} id={isConnected ? "rainbowkitConnected" : "rainbowkitNotConnected"}>
        <TermsAndConditionsWrapper>
          <Component {...pageProps} />
        </TermsAndConditionsWrapper>
        <Analytics />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;

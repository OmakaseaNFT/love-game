import Head from 'next/head';
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { configureChains, createConfig, WagmiConfig, useAccount } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { Analytics } from "@vercel/analytics/react";
import { useEffect } from "react";
import { hotjar } from "react-hotjar";
import {
  HOT_JAR_SITE_ID,
  HOT_JAR_VERSION,
} from "../utils/constant";
import { TermsAndConditionsWrapper } from "../components/ui/TermsAndConditionsWrapper";
import { FileThemeProvider } from "../system/context/FileThemeContext";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [sepolia]
      : [mainnet]),
  ],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? 
        `https://crimson-empty-glitter.ethereum-sepolia.quiknode.pro/0d67f844110595a04f83b3ab1b0530d91526b619/` :
        `https://hidden-compatible-morning.quiknode.pro/c0ae6201d2c21e8169474f08851141fefdb1532f/`,
      }),
    }),
  ]
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
      <RainbowKitProvider
        chains={chains}
        theme={null}
        id={isConnected ? "rainbowkitConnected" : "rainbowkitNotConnected"}
      >
        <FileThemeProvider>
          <TermsAndConditionsWrapper>
          <Head>
              <meta charSet="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Love Game</title>
              <meta name="LOVE" content="Decentralized On Chain Love" />
              {/* Add more meta tags as needed */}
            </Head>
            <Component {...pageProps} />
          </TermsAndConditionsWrapper>
        </FileThemeProvider>
        <Analytics />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;

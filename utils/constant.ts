export const BE_URL: string = process.env.NEXT_PUBLIC_API || "";
export const rpc_url: string = process.env.NEXT_PUBLIC_JSON_RPC_URL || "";
export const HEARTBREAKER_SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL!;
export const contractAddressLoveFarm: string =
  process.env.NEXT_PUBLIC_CONTRACT_LOVE_FARM || "";
export const contractAddressLove: string =
  process.env.NEXT_PUBLIC_CONTRACT_LOVE || "";
export const contractAddressFaith =
  process.env.NEXT_PUBLIC_CONTRACT_FAITH || "";
export const contractAddressWar: string =
  process.env.NEXT_PUBLIC_CONTRACT_WAR || "";
export const contractAddressHeartbreak =
  process.env.NEXT_PUBLIC_CONTRACT_HEARTBREAKER!;
export const contractAddressLoveSkinMint = "";

export const ETHLOVEPoolAddy: string =
  "0xdd97fce8441dabf221b330269750b18ba82b0cd6";
export const USDTLOVEPoolAddy: string =
  "0xE24Ab719209A9844E59dBfEEe91ce7d8D482532e";
export const WARLOVEPoolAddy: string =
  "0x1c9189593669b5c1fbc33d7ff522b1b2dd0646e4";
export const contractAddressUsdt: string =
  "0xdAC17F958D2ee523a2206206994597C13D831ec7";
export const contractAddressWbtc: string =
  "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599";
export const contractAddressPepe: string =
  "0x6982508145454ce325ddbe47a25d4ec3d2311933";
export const contractAddressBobo: string =
  "0xb90b2a35c65dbc466b04240097ca756ad2005295";
export const contractAddressMog: string =
  "0xaaee1a9723aadb7afa2810263653a34ba2c21c7a";
export const contractAddressNina: string =
  "0x697a79AF2De4Af9E9aA0D08905374556AD1353bB";
export const contractAddressSpx: string =
  "0xE0f63A424a4439cBE457D80E4f4b51aD25b2c56C";
export const contractAddressBITCOIN: string =
  "0x72e4f9F808C49A2a61dE9C5896298920Dc4EEEa9";
export const contractAddressUSA: string =
  "0x806556cf7E17CFC743B003645429e92F4707312F";

export const TipAddress: string =
  "0xc14402bd424Ac35E296F4577C8F19c9A73C6e452";
export const TipENS: string =
  "Love.aWizard.eth";

export const ETHERSCAN_LOVE_LINK = `https://etherscan.io/address/${contractAddressLove}`;
export const ETHERSCAN_FARM_LINK = `https://etherscan.io/address/${contractAddressLoveFarm}`;

export const UNISWAP_LINK = `https://app.uniswap.org/#/add/v2/${contractAddressLove}/ETH`;
export const BIT_QUERY_LINK = `https://explorer.bitquery.io/ethereum/token/${contractAddressLove}`;
export const DEXSCREENER_LINK = `https://dexscreener.com/ethereum/${ETHLOVEPoolAddy}`;
export const LOVE_ETH_LP_LINK = `https://app.uniswap.org/#/add/v2/ETH/${contractAddressLove}`;
export const WAR3_SWAP_LINK = `https://app.uniswap.org/#/swap?theme=dark&inputCurrency=${contractAddressLove}&outputCurrency=${contractAddressWar}`;

export const ETHERSCAN_FAITH_LINK = `https://etherscan.io/address/${contractAddressFaith}`;

export const BLOCKS_PER_YEAR = 2591500;
export const HOT_JAR_SITE_ID = 3527265;
export const HOT_JAR_VERSION = 6;
export const TELEGRAM_LINK = "https://t.me/loveethereum";
export const TWITTER_LINK = "https://twitter.com/lovegameeth";
export const WAR3_TWITTER_LINK = "https://twitter.com/webwar3";
export const DISCORD_LINK = "https://discord.gg/loveethereum";
export const BRIDGE_LINK = "https://warp.jono.tech/bridge";

export const VOTE_LINK = "https://snapshot.org/#/love.awizard.eth";

//chia links
export const CHIA_LINK = "https://www.chia.net/downloads/";
export const GOBY_LINK = "https://www.goby.app";
export const CHIALINKS_LINK = "https://chialinks.com/";
export const SPACESCAN_LINK = "https://www.spacescan.io";
export const MINTGARDEN_LINK = "https://mintgarden.io";
export const XCHTRADE_LINK = "https://xch.trade";
export const DEXIE_LINK = "https://dexie.space/markets";
export const TIBETSWAP_LINK = "https://v2.tibetswap.io"; //"https://v2.tibetswap.io";
export const FARMERVERSE_LINK = "https://play.farmerverse.space";

//Omakasea links

export const GOOEYS_LINK = "https://ethgobblers.com";
export const WELCOME_LINK = "https://omakasea.notion.site/Welcome-to-Omakasea-30a1ff7a8ac34bfbb5d1b2cacb7850fe";
export const WT_LINK = "https://opensea.io/collection/winged-turtles";
export const BABIES_LINK = "https://x.com/80sBabiesNFT";
export const NOTNINTENDO_LINK = "https://notnintendo.omakasea.com/learn";

//tang gang links

export const TG_WEB_LINK = "https://www.tanggangchia.com";
export const TG_DISCORD_LINK = "https://discord.gg/vTQHH5Qfbf";
export const TG_TWITTER_LINK = "https://x.com/bytesandblocks";
export const HOA_LINK = "https://xch.trade/tokens/?cat=HOA";
export const WHOA_9MM_LINK = "https://base.9mm.pro/swap?chain=base&outputCurrency=0xee642384091f4bb9ab457b875E4e209b5a0BD147";
export const WHOA_DS_LINK = "https://dexscreener.com/base/0xfb1ba038e1bc3b614fb38fc266411d38e0e39201";
export const TANGBEARS_LINK = "https://mintgarden.io/collections/tangbears-on-chia-col1tezjkmzhnry4uhy3xpg0f2n2twdxy6mdrcsfknt5y845wut5jazqlv80yt";
export const BASE_TANGBEARS_LINK = "https://opensea.io/collection/tangbears-from-chia";

//featured collection links
export const PAIN_X_LINK = "https://x.com/poweredbypain";
export const PAIN_F_LINK = "https://foundation.app/@poweredbypain";

export const DBC_X_LINK = "https://x.com/dbc___";
export const DBC_MOJO_LINK = "https://mintgarden.io/collections/col1ls9uy90xygegve5yqurmnj0r733gc8407c70r5e5aepmt76x4tws9zv95l?tab=items";

export const NEMO_X_LINK = "https://x.com/cryptofish__";
export const NEMO_FISH_LINK = "https://cryptofish.us/mint";
export const NEMO_RINOS_LINK = "https://x.com/tinyrinos";

export const SPEECHLESS_X_LINK = "https://x.com/SpeechlessZi";
export const LOVEBEARS_LINK = "https://mintgarden.io/collections/love-bears-col1carm26r7stv647qncwpctcltuy8t277f2qyyum798ln447gex9vq9m86u6";
export const AWIZARD_X_LINK = "https://x.com/aWizardeth";

export const MAX_X_LINK = "https://x.com/_6ess";
export const MAX_LINK = "https://x.com/_6ess";
export const MAX_TREE_LINK = "https://dexie.space/assets/🌳";
export const MAX_ART_LINK = "https://dexie.space/assets/🌳";


export const IS_DEV_ENV = process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true";
export const CHAIN_ID = IS_DEV_ENV ? 11155111 : 1;

export const KV_REST_API_URL = IS_DEV_ENV
  ? process.env.KV_REST_API_URL || ""
  : process.env.KV_PROD_REST_API_URL || "";

export const KV_REST_API_TOKEN = IS_DEV_ENV
  ? process.env.KV_REST_API_TOKEN || ""
  : process.env.KV_PROD_REST_API_TOKEN || "";

export const LOVE_POOLS = [
  {
    name: "LOVE-ETH",
    icon: "/assets/love_eth.svg",
    token: "ETH",
    baseAsset: contractAddressLove,
  },
  {
    name: "LOVE-USDT",
    icon: "/assets/love_usdt.svg",
    token: contractAddressUsdt,
    baseAsset: contractAddressLove,
  },
  {
    name: "LOVE-WBTC",
    icon: "/assets/love_wbtc.svg",
    token: contractAddressWbtc,
    baseAsset: contractAddressLove,
  },
  {
    name: "LOVE-PEPE",
    icon: "/assets/love_pepe.svg",
    token: contractAddressPepe,
    baseAsset: contractAddressLove,
  },
  {
    name: "WAR3-ETH",
    icon: "/assets/war_eth.svg",
    token: "ETH",
    baseAsset: contractAddressWar,
  },
  {
    name: "LOVE-NINA",
    icon: "/assets/love_nina.svg",
    token: contractAddressNina,
    baseAsset: contractAddressLove,
  },
  {
    name: "LOVE-BOBO",
    icon: "/assets/love_bobo.svg",
    token: contractAddressBobo,
    baseAsset: contractAddressLove,
  },
  {
    name: "LOVE-MOG",
    icon: "/assets/love_mog.svg",
    token: contractAddressMog,
    baseAsset: contractAddressLove,
  },
  {
    name: "LOVE-SPX",
    icon: "/assets/love_spx.svg",
    token: contractAddressSpx,
    baseAsset: contractAddressLove,
  },
  {
    name: "LOVE-BITCOIN",
    icon: "/assets/love_harrypotterobamasonic10inu.svg",
    token: contractAddressBITCOIN,
    baseAsset: contractAddressLove,
  },
  {
    name: "LOVE-USA",
    icon: "/assets/love_usa.svg",
    token: contractAddressUSA,
    baseAsset: contractAddressLove,
  },
];

export const metadata = {
  title: 'LOVE',
  description: 'Generated by LOVE',
};

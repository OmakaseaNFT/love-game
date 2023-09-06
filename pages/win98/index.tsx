import BottomBar from "../../components/bottombar";
import { useEffect, useState, useLayoutEffect } from "react";
import moment from "moment";
import Dialog from "../../components/dialog";
import Screen from "../../components/screen";
import ActiveButton from "../../components/activeButton";
import ControlPanel from "../../components/controlPanel";
import ClaimWarTokens from "../../components/claimWarTokens";
import Paper from "../../components/paper";
import Farm from "../../components/farm";
import Computer from "../../assets/computer.png";
import Settings from "../../assets/settings.png";
import PaperIcon from "../../assets/book.png";
import FarmIcon from "../../assets/tree.png";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import LoveFarmABI from "../../utils/lovefarm.json";
import LoveClaimABI from "../../utils/loveclaim.json";
import {
  ETHLOVEPoolAddy,
  USDCAddress,
  contractAddressLoveClaim,
  contractAddressLoveFarm,
} from "../../utils/constant";
import merkleData from "../../utils/claimdata.json";
import axios from "axios";
import PoolABI from "../../utils/poolABI.json";
import { contractAddressLove } from "../../utils/constant";
import { truncateEthAddress } from "../../system/appUtils";
import { PoolAbi } from "../../system/PoolAbi";
import { AppContracts } from "../../system/AppContracts";
import { CopyAddressButton } from "../../components/copyAddressButton";
import { useWrongNetwork } from "../../system/hooks/useWrongNetwork";
import { HeartBreaker } from "../../components/heartbreaker";

interface Props {
  lock?: Boolean;
}

interface Content {
  menu: string;
  title: string;
  component: any;
  width?: string;
  height: string;
  icon: any;
  maxHeight?: boolean;
}

const Win98 = (props: Props) => {
  const [scale, setScale] = useState<string>();
  const [start, setStart] = useState<boolean>(false);
  const [showBar, setShowBar] = useState<boolean>(false);
  const [time, setTime] = useState(moment().format("HH:mm"));
  const { address } = useAccount();
  const [price, setPrice] = useState<number>(0);
  const [usdPrice, setUSDPrice] = useState<number>(0);
  const [wallpaper, setWallpaper] = useState<string>(
    "/assets/lovegame_background.png"
  );
  const [claimContract, setClaimContract] = useState<any>(null);

  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

  const claim: any = useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format("HH:mm"));
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if ((window as any).ethereum) {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      const { ethLovePoolContract, usdEthPoolContract } = new AppContracts(
        provider
      );
      getPriceOfLove(ethLovePoolContract, usdEthPoolContract);
    }
  }, []);

  const [selectedContent, setSelectedContent] = useState<Content | undefined>();
  const setSelected = (selected: string) => {
    setShowBar(false);
    setSelectedContent(contents.find((i) => i.menu === selected));
  };

  const getPriceOfLove = async (ETHLOVEPool: any, USDETHPool: PoolAbi) => {
    try {
      const ETHLOVEToken0 = await ETHLOVEPool.token0();
      const ETHLOVEReserves = await ETHLOVEPool.getReserves();

      let ETHReserves: any;
      let LOVEReserves: any;
      if (ETHLOVEToken0 === contractAddressLove) {
        LOVEReserves = ethers.utils.formatUnits(ETHLOVEReserves._reserve0, 18);
        ETHReserves = ethers.utils.formatUnits(ETHLOVEReserves._reserve1, 18);
      } else {
        LOVEReserves = ethers.utils.formatUnits(ETHLOVEReserves._reserve1, 18);
        ETHReserves = ethers.utils.formatUnits(ETHLOVEReserves._reserve0, 18);
      }

      const ETHUSDToken0 = await USDETHPool.token0();
      const ETHUSDToken1 = await USDETHPool.token1();
      const ETHUSDReserves = await USDETHPool.getReserves();

      let USDAmount: any;
      let ETHAmount: any;
      if (ETHUSDToken0 == USDCAddress) {
        USDAmount = ethers.utils.formatUnits(ETHUSDReserves._reserve0, 6);
        ETHAmount = ethers.utils.formatUnits(ETHUSDReserves._reserve1, 18);
      } else {
        USDAmount = ethers.utils.formatUnits(ETHUSDReserves._reserve1, 6);
        ETHAmount = ethers.utils.formatUnits(ETHUSDReserves._reserve0, 18);
      }
      const ETHPriceUSD = ETHAmount / USDAmount;
      const priceLOVEinETH = ETHReserves / LOVEReserves;

      setPrice(parseFloat(priceLOVEinETH.toFixed(8)));
      setUSDPrice(parseFloat((priceLOVEinETH / ETHPriceUSD).toFixed(8)));
    } catch (error) {
      console.log(error);
    }
  };

  const closeContent = () => {
    setSelectedContent(undefined);
  };

  const contents: Content[] = [
    {
      menu: "cp",
      title: "Control Panel",
      component: (
        <ControlPanel
          backgroundImage={wallpaper}
          onChangeBG={(val: string) => setWallpaper(val)}
          closeMe={closeContent}
        />
      ),
      width: "400px",
      height: "400px",
      icon: Settings,
    },
    {
      menu: "farm",
      title: "FARM",
      component: <Farm />,
      width: "720px",
      height: "300px",
      icon: FarmIcon,
    },
    {
      menu: "paper",
      title: "PAPER",
      component: <Paper />,
      width: "400px",
      height: "400px",
      icon: PaperIcon,
    },
    {
      menu: "heartbreak",
      title: "HEARTBREAK",
      component: <HeartBreaker />,
      width: "60%",
      height: "100%",
      icon: PaperIcon,
      maxHeight: true,
    },
    {
      menu: "cp",
      title: "ERROR!",
      component: <div className="text-center w-full">ADDRESS NOT FOUND !</div>,
      width: "200px",
      height: "80px",
      icon: Settings,
    },
    {
      menu: "claim",
      title: "CLAIM",
      component: <ClaimWarTokens />,
      width: "350px",
      height: "180px",
      icon: Computer
    },
  ];

  useIsomorphicLayoutEffect(() => {
    if (window) {
      var w = window.innerWidth;
      var h = window.innerHeight;
      var propotionWH = 4 / 3;
      var propotionHW = 3 / 4;
      var scale = 1;
      if (w >= 640) {
        if (w / h >= propotionWH) {
          scale = h / 600;
        } else if (h / w >= propotionHW) {
          scale = w / 800;
        }
      }

      setScale(`scale(${scale}`);
    }
  }, []);

  return !scale ? (
    <div />
  ) : (
    <div
      style={{
        transform: scale,
      }}
      className={`w-full h-full sm:w-[800px] sm:h-[600px] flex bg-[#008081] flex flex-col justify-between m-auto relative z-40`}
    >
      {showBar ? (
        <div>
          <div
            onClick={() => {
              setShowBar(false);
            }}
            className="w-full h-full flex absolute z-40"
          ></div>
          <div className="absolute bottom-[42px] left-0 z-50">
            <BottomBar setSelected={setSelected} />
          </div>
        </div>
      ) : null}

      <Screen
        wallpaper={wallpaper}
        setSelected={setSelected}
        onTrigger={() => setSelectedContent(contents[5])}
      >
        {selectedContent?.title && (
          <Dialog
            closeMe={closeContent}
            width={selectedContent?.width ?? "94%"}
            height={selectedContent?.height ?? "200px"}
            title={selectedContent?.title ?? ""}
            maxHeight={selectedContent?.maxHeight}
          >
            {selectedContent?.component}
          </Dialog>
        )}
      </Screen>

      <div className="flex flex-row justify-between bg-gray-400 py-[1px] h-[42px] border-l-gray-200 border-t-gray-200 border-r-gray-600 border-b-gray-600 border-[1.6px] z-10 absolute bottom-0 right-0 left-0">
        <div className="flex flex-row">
          <button
            onClick={() => setShowBar(!showBar)}
            className="flex flex-row btn"
          >
            <img
              alt=""
              width="0"
              height="0"
              // quality={100}
              src="/assets/startLove.png"
              className="m-auto w-[80px] h-[22px]"
            />
          </button>
          {selectedContent?.title && (
            <ActiveButton
              icon={selectedContent?.icon ?? Computer}
              text={selectedContent?.title ?? ""}
              isSmall
            />
          )}
          <CopyAddressButton address={contractAddressLove} />
        </div>
        <div className="px-1 my-auto border-b-gray-300 items-center border-r-gray-300 border-l-gray-600 text-sm border-t-gray-600 max-w-[180px] w-full h-[30px] border-[3px] text-[18px] rounded-[2px] flex flex-row justify-center items-center mr-2">
          <div>
            <img
              alt=""
              // quality={100}
              src="/assets/start-icon.png"
              className="m-auto w-[20px] h-[20px] mr-1 mb-[2px]"
            />
          </div>
          <div className="text-[11px] truncate mb-0">
            = {price} ETH/${usdPrice.toFixed(4)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Win98;

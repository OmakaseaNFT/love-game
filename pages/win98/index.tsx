import BottomBar from "../../components/bottombar";
import { useEffect, useState, useLayoutEffect } from "react";
import Dialog from "../../components/dialog";
import Screen from "../../components/screen";
import ActiveButton from "../../components/activeButton";
import ControlPanel from "../../components/controlPanel";
import Paper from "../../components/paper";
import Farm from "../../components/farm";
import WarpBridge from "../../components/warpbridge";
import MglthTv from "../../components/mglth";
import ComputerIcon from "../../assets/computer.png";
import SettingsIcon from "../../assets/settings.png";
import PaperIcon from "../../assets/book.png";
import LoveIcon from "../../assets/love-icon.png";
import BridgeIcon from "../../assets/bridge-icon.png";
import MglthIcon from "../../assets/mglth-icon.png";
import { ethers } from "ethers";
import { contractAddressLove, contractAddressWar } from "../../utils/constant";
import { PoolAbi } from "../../system/PoolAbi";
import { AppContracts } from "../../system/AppContracts";
import { CopyAddressButton } from "../../components/copyAddressButton";
import { HeartBreaker } from "../../components/heartbreaker";
import {
  fetchLovePriceUSDT,
  fetchLovePriceETH,
} from "../../system/hooks/poolCalcUtils";
import { useFetchTotalStaked } from "../../system/hooks/useFetchStakingTotal";
import { thousandSeparator } from "../../system/appUtils";

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
  const [showBar, setShowBar] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0);
  const [usdPrice, setUSDPrice] = useState<number>(0);
  const [wallpaper, setWallpaper] = useState<string>(
    "/assets/lovegame_background.png"
  );
  const { isFetchingTotals, totalStakedUSD } = useFetchTotalStaked();

  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

  useEffect(() => {
    if ((window as any).ethereum) {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      const { ethLovePoolContract, usdtLovePoolContract } = new AppContracts(
        provider
      );
      getPriceOfLove(ethLovePoolContract, usdtLovePoolContract);
    }
  }, []);

  const [selectedContent, setSelectedContent] = useState<Content | undefined>();
  const setSelected = (selected: string) => {
    setShowBar(false);
    setSelectedContent(contents.find((i) => i.menu === selected));
  };

  const getPriceOfLove = async (
    ethLovePoolContract: PoolAbi,
    usdtLovePoolContract: PoolAbi
  ) => {
    try {
      const lovePriceInUSDT = await fetchLovePriceUSDT(usdtLovePoolContract);
      const lovePriceInETH = await fetchLovePriceETH(ethLovePoolContract);

      setPrice(lovePriceInETH);
      setUSDPrice(lovePriceInUSDT);
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
      icon: SettingsIcon,
    },
    {
      menu: "farm",
      title: "FARM",
      component: <Farm />,
      width: "720px",
      height: "300px",
      icon: LoveIcon,
    },
    {
      menu: "warpbridge",
      title: "WarpBridge",
      component: <WarpBridge />,
      width: "800px",
      height: "600px",
      icon: BridgeIcon,
    },
    {
      menu: "mglth",
      title: "MglthTv",
      component: <MglthTv />,
      width: "800px",
      height: "600px",
      icon: MglthIcon,
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
      icon: SettingsIcon,
    },
    // {
    //   menu: "claim",
    //   title: "CLAIM",
    //   component: <ClaimWarTokens />,
    //   width: "180px",
    //   height: "180px",
    //   icon: FireIcon
    // },
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

  const formatFarmTitle = (str: string) =>
    str != "FARM"
      ? str
      : isFetchingTotals
      ? str
      : `${str} TVL: $${thousandSeparator(totalStakedUSD, 2, 2)}`;

  const closeDialog = () => {
        setSelectedContent(undefined);
  };
    
  const handleEmbeddedWindowClose = () => {
        // Logic to stop video playback when embedded window (dialog) is closed
        const video = document.getElementById("video") as HTMLVideoElement;
        if (video) {
          video.pause();
        }
  };

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
            title={formatFarmTitle(selectedContent?.title ?? "")}
            maxHeight={selectedContent?.maxHeight}
          >
            {selectedContent?.component}
          </Dialog>
        )}
      </Screen>

      <div className="flex flex-row justify-between bg-gray-400 py-[1px] h-[42px] border-l-gray-200 border-t-gray-200 border-r-gray-600 border-b-gray-600 border-[1.6px] z-50 absolute bottom-0 right-0 left-0">
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
              icon={selectedContent?.icon ?? ComputerIcon}
              text={selectedContent?.title ?? ""}
              isSmall
            />
          )}
          <CopyAddressButton address={contractAddressLove} label="LOVE:" />
          <CopyAddressButton address={contractAddressWar} label="WAR3:" />
        </div>
        <div className="px-1 my-auto border-b-gray-300 items-center border-r-gray-300 border-l-gray-600 text-sm border-t-gray-600 max-w-[162px] w-full h-[30px] border-[3px] text-[18px] rounded-[2px] flex flex-row justify-center items-center mr-2">
          <div>
            <img
              alt=""
              // quality={100}
              src="/assets/start-icon.png"
              className="m-auto w-[20px] h-[20px] mr-2"
            />
          </div>
          <div className="text-[11px] truncate mb-0">
            = {price.toFixed(8)} ETH/${usdPrice.toFixed(4)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Win98;

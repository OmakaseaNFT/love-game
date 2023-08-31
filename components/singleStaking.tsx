import { MdArrowRight } from "react-icons/md";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import PoolABI from "../utils/poolABI.json";
import {
  contractAddressLoveFarm,
  contractAddressLove,
  ETHLOVEPoolAddy,
  ETHERSCAN_FARM_LINK,
  contractAddressFaith,
  ETHERSCAN_FAITH_LINK,
} from "../utils/constant";
import { USDCAddress } from "../utils/constant";
import { formatUnits } from "ethers/lib/utils";
import { AppContracts } from "../system/AppContracts";
import { FaithAbi } from "../system/FaithAbi";
import { LoveTokenAbi } from "../system/LoveTokenAbi";

const listLive = [1];
type PoolData = {
  availableValue: any;
  stakedValue: any;
  availableBalance: any;
  stakeValue: any;
  aprValue: any;
  totalStakedLove: any;
  faithBalance: any;
  loveBalance: any;
  fee: any;
  lovePerUser: any;
};
const SingleStaking = () => {
  const [expanded, setExpanded] = useState<Number>(-1);
  const [farmData, setFarmData] = useState<any>([]);
  const [listPool, setListPool] = useState<any>([]);
  const { isConnected, address } = useAccount();
  const [poolAvailable, setPoolAvailable] = useState(false);
  const [stakeValue, setStakeValue] = useState<string>("");
  const [unStakeValue, setUnStakeValue] = useState<string>("");

  const getPoolLength = async (
    loveTokenContract: LoveTokenAbi,
    faithContract: FaithAbi
  ) => {
    try {
      let availableValue;
      let availableStaked;
      let realValue;
      let stakeValue;
      const arr = [];

      const faithBalance = await faithContract.balanceOf(address!);
      const loveBalance = await loveTokenContract.balanceOf(address!);
      const aprValue = await calculateRatioAPR(
        faithContract,
        loveTokenContract
      );
      const fee = await faithContract.faithFeePercent();
      // lovePerFaithRatio * faith.balanceOf(address) = LOVE equivalent
      const lovePerUser =
        Number(ethers.utils.formatEther(faithBalance)) * aprValue;
      const totalStakedLove = await totalFaithUSD();
      const data: PoolData = {
        availableValue: availableValue,
        stakedValue: availableStaked,
        availableBalance: realValue,
        stakeValue: stakeValue,
        aprValue: aprValue,
        totalStakedLove,
        faithBalance,
        loveBalance,
        fee: Number(fee),
        lovePerUser,
      };
      arr.push(data);
      console.log(arr);
      setListPool("stake");
      setFarmData(arr);
      setPoolAvailable(true);
    } catch (error) {
      console.log(error);
      setPoolAvailable(true);
    }
  };

  const fetchPoolData = async () => {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const signer = provider.getSigner();
    const {
      loveFarmContract,
      loveTokenContract,
      faithContract,
    } = new AppContracts(signer);

    await getPoolLength(loveTokenContract, faithContract);
  };

  useEffect(() => {
    if ((window as any).ethereum) {
      fetchPoolData();
      setExpanded(-1);
    }
  }, [isConnected]);

  async function totalFaithUSD() {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const signer = provider.getSigner();
    const {
      loveTokenContract,
      usdEthPoolContract,
      ethLovePoolContract,
    } = new AppContracts(signer);

    const loveBalanceInFaithContract = await loveTokenContract.balanceOf(
      contractAddressFaith
    );

    const ETHUSDToken0 = await usdEthPoolContract.token0();
    const ETHUSDReserves = await usdEthPoolContract.getReserves();

    let USDAmount;
    let ETHAmount;
    if (ETHUSDToken0 == USDCAddress) {
      USDAmount = ethers.utils.formatUnits(ETHUSDReserves._reserve0, 6);
      ETHAmount = ethers.utils.formatUnits(ETHUSDReserves._reserve1, 18);
    } else {
      USDAmount = ethers.utils.formatUnits(ETHUSDReserves._reserve1, 6);
      ETHAmount = ethers.utils.formatUnits(ETHUSDReserves._reserve0, 18);
    }

    const ETHPriceUSD = Number(USDAmount) / Number(ETHAmount);

    const ETHLOVEToken0 = await ethLovePoolContract.token0();
    const ETHLOVEReserves = await ethLovePoolContract.getReserves();

    let loveReservesBN;
    let ETHReservesBN;
    if (ETHLOVEToken0 == contractAddressLove) {
      loveReservesBN = ETHLOVEReserves._reserve0;
      ETHReservesBN = ETHLOVEReserves._reserve1;
    } else {
      loveReservesBN = ETHLOVEReserves._reserve1;
      ETHReservesBN = ETHLOVEReserves._reserve0;
    }

    const loveETHRatio = ETHReservesBN.mul(
      ethers.BigNumber.from(10000000000)
    ).div(loveReservesBN);
    const LOVEPriceETH = loveETHRatio.toNumber() / 10000000000;

    const LOVEValueETH = LOVEPriceETH * Number(loveBalanceInFaithContract);
    const loveValueUSD = (LOVEValueETH * ETHPriceUSD) / 1e18;
    return loveValueUSD;
  }

  const calculateRatioAPR = async (
    faithContract: FaithAbi,
    loveContract: LoveTokenAbi
  ) => {
    const loveBalanceInFaithContract = await loveContract.balanceOf(
      contractAddressFaith
    );
    const totalFaith = await faithContract.totalSupply();

    let lovePerFaith = loveBalanceInFaithContract
      .mul(ethers.BigNumber.from("1000"))
      .div(totalFaith);
    const lovePerFaithRatio = lovePerFaith.toNumber() / 1000;

    return lovePerFaithRatio;
  };

  const updateStakeAtIndex = (index: number, newValue: string) => {
    setListPool((prevStake: any) => {
      const newStake = [...prevStake];
      newStake[index] = newValue;

      return newStake;
    });
  };

  const deposit = async (amount: string) => {
    setPoolAvailable(false);

    try {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      const signer = provider.getSigner();
      const { loveTokenContract, faithContract } = new AppContracts(signer);
      const isApprovedForAll = await loveTokenContract.allowance(
        address!,
        contractAddressFaith!
      );

      let formattedAmount = ethers.utils.parseUnits(amount, "ether"); // convert stakeValue to wei
      if (isApprovedForAll.lt(formattedAmount)) {
        const tx = await loveTokenContract.approve(
          contractAddressFaith,
          formattedAmount
        );
        await tx.wait(1);
      }
      const tx = await faithContract.enter(formattedAmount);
      await tx.wait(1);
      setStakeValue("");
      await fetchPoolData();
      setPoolAvailable(true);
    } catch (error) {
      console.log(error);
      setPoolAvailable(true);
    }
  };

  const withdraw = async (amount: string) => {
    setPoolAvailable(false);
    try {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      const signer = provider.getSigner();
      const { faithContract } = new AppContracts(signer);

      const isApprovedForAll = await faithContract.allowance(
        address!,
        contractAddressFaith!
      );

      let formattedAmount = ethers.utils.parseUnits(amount, "ether"); // convert stakeValue to wei
      if (isApprovedForAll.lt(formattedAmount)) {
        const tx = await faithContract.approve(
          contractAddressFaith,
          formattedAmount
        );
        await tx.wait(1);
      }

      const tx = await faithContract.leave(formattedAmount);
      await tx.wait(1);
      setStakeValue("");
      await fetchPoolData();
      setPoolAvailable(true);
    } catch (error) {
      console.log(error);
      setPoolAvailable(true);
    }
  };

  const formatEther = (wei: number) => {
    if (!wei) return;
    const ether = ethers.utils.formatEther(wei.toString());
    return ether;
  };

  const thousandSeparator = (value: number) => {
    let formattedValue = value.toLocaleString("en-US", {
      style: "decimal",
      maximumFractionDigits: 3,
    });

    return formattedValue;
  };

  const boxStyle =
    "p-2 h-16 flex border-l-gray-200 border-t-gray-200 border-r-gray-600 border-b-gray-600 portrait:border-b-0 border-2 ml-[0.5px] borderBottomShadow";
  const boxStyle2 =
    "p-2 h-16 flex border-l-gray-200 border-t-gray-200 border-r-gray-600 border-b-gray-600 border-2 ml-[0.5px] borderBottomShadow";
  const boxStyle3 =
    "h-[130px] landscape:h-16 w-[5%] sm:w-[3%] flex border-l-gray-200 border-t-gray-200 border-r-gray-200 border-l-2 border-t-2 border-r-2 ml-[0.8px]";

  return (
    <>
      {poolAvailable ? (
        farmData.map((item: PoolData, idx: number) => (
          <div key={idx} className="w-full flex flex-col w-[600px]">
            <div
              key={idx}
              className="w-full flex flex-row border-2 border-gray-600 border-b-0 mt-2"
            >
              <div className="w-[95%] sm:w-[97%] flex flex-col landscape:flex-row">
                <div className="w-full portrait:border-b-gray-600 portrait:border-b-2 portrait:mb-[0.8px]">
                  <div className="w-full flex flex-row">
                    <div className={`w-[78%] ${boxStyle}`}>
                      <div className="w-full flex flex-row justify-between items-center px-1">
                        <Image
                          src="/assets/start-icon.png"
                          alt=""
                          width={20}
                          height={20}
                        />
                        <div className={`text-lg`}>LOVE</div>
                        <div>
                          <div className="w-full flex flex-col">
                            <div className="text-xs">DEP FEE</div>
                            <div className="text-gray-500">
                              <div>{item.fee}%</div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="w-full flex flex-col">
                            <div className="text-gray-500"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`${boxStyle}`}>
                      <div
                        className="w-full flex flex-col m-auto text-sm"
                        style={{ position: "relative" }}
                      >
                        <div className="text-xs">Ratio</div>
                        <div
                          style={{ position: "relative", whiteSpace: "nowrap" }}
                        >
                          {`${item.aprValue} LOVE / FAITH`}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="w-full flex flex-row">
                    <div className={`w-[100%] ${boxStyle2}`}>
                      <div className="w-full flex flex-col m-auto">
                        <div className="text-xs">Total Staked Love</div>
                        <div className="flex flex-row justify-between text-xs">
                          ${thousandSeparator(item.totalStakedLove)}
                          {/* <span className="text-white border-2 rounded-[2px] leading-3 h-[16px] mt-1 ml-1">
                                ?
                              </span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${boxStyle3} ${expanded == idx ? '' : 'embossBorderBottomExpanded'}`} style={{ marginBottom: "-10px" }}>
                <button
                  onClick={() => {
                    if (expanded != -1 && expanded == idx) {
                      setExpanded(-1);
                    } else {
                      setExpanded(idx);
                      updateStakeAtIndex(idx, "stake");
                    }
                  }}
                  className="relative"
                >
                  <MdArrowRight
                    className={`text-black text-[28px] sm:text-[32px] ml-[-8px] my-auto ${
                      expanded != -1 && expanded == idx
                        ? "-rotate-90"
                        : "rotate-90"
                      }`}
                  />
                  {expanded == idx && (
                    <div className="hidden sm:block farmExpandHideBottomBorder" />
                  )}
                </button>
              </div>
            </div>

            {expanded == idx && (
              <div className="w-full flex flex-row justify-between sm:border-2 sm:border-t-0 sm:border-l-gray-600 sm:border-b-gray-200 sm:border-r-gray-600">
                <div
                  className={`relative w-full flex ${
                    item.loveBalance || item.faithBalance
                      ? "flex-col"
                      : "flex-row"
                    } sm:flex-row justify-between pt-0 sm:pt-2 sm:border-2 sm:border-t-0 sm:border-l-gray-200 sm:border-b-gray-600 sm:border-r-gray-200 pb-[8px] pr-0 sm:pr-[8px]`}
                >
                  <div className="w-[31.9%] sm:w-[28%] flex border-2 sm:border-0 border-l-gray-600 border-r-0 sm:border-t-gray-600 border-t-0 border-b-0 sm:border-b-gray-100">
                    <div className="w-full border-l-gray-200 border-t-0 border-r-0 border-b-0 sm:border-b-gray-600 border-2 sm:border-0 flex">
                      <div
                        className={`flex flex-col text-[#0A0080] text-xs ml-2 ${
                          item.loveBalance || item.faithBalance
                            ? "sm:ml-8 mt-1 mb-[-10px] sm:mb-auto"
                            : "m-auto"
                          }`}
                      >
                        <div
                          onClick={() => {
                            window.open(ETHERSCAN_FAITH_LINK, "_blank");
                          }}
                          className="cursor-pointer mb-1"
                        >
                          View Contract
                        </div>

                        <div className="absolute top-0 right-0 flex sm:hidden">
                          <div className="embossBorderRight flex sm:hidden h-[62px] w-[6px]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`flex flex-col ${
                      item.loveBalance || item.faithBalance
                        ? "w-full"
                        : "w-[68.1%]"
                      } sm:w-[72%]`}
                  >
                    <div className="w-full flex flex-row border-l-gray-600 sm:border-t-gray-600 border-t-0 sm:border-t-2 border-r-gray-100 border-b-gray-100 border-2 p-[0.5px]">
                      <div className="pb-2 sm:pb-0 w-full flex border-l-gray-200 border-t-0 sm:border-t-2 border-r-gray-600 border-b-gray-600 border-2 pt-1">
                        {item.loveBalance || item.faithBalance ? (
                          <div className="w-full sm:w-auto flex flex-col sm:flex-row">
                            <div className="flex flex-col m-auto sm:ml-2">
                              <div>LOVE</div>
                              <div className="flex flex-row justify-between">
                                <div className="flex flex-col text-xs text-[#0A0080] my-2">
                                  <div>
                                    {thousandSeparator(item.lovePerUser)} LOVE
                                  </div>
                                </div>
                                <div className="flex flex-col justify-between">
                                  <div />
                                  <div
                                    className={`flex flex-row text-md h-[30px] ${
                                      listPool[idx] == "stake"
                                        ? "mb-[-2px]"
                                        : "mb-[-2px]"
                                      }`}
                                  >
                                    <div
                                      onClick={() => {
                                        updateStakeAtIndex(idx, "stake");
                                      }}
                                      style={{
                                        zIndex:
                                          (listPool[idx] ?? "stake") == "stake"
                                            ? 2
                                            : 0,
                                      }}
                                      className={`borderBottomNone px-4 py-1 flex flex-row border-l-gray-200 border-t-gray-200 border-r-gray-600 border-b-gray-600 border-2 cursor-pointer ${
                                        listPool[idx] == "stake"
                                          ? "text-gray-800 border-b-0 bg-[#C1C1C1]"
                                          : "text-gray-500"
                                        }`}
                                    >
                                      Stake
                                      {listPool[idx] == "stake" && (
                                        <div
                                          className={`w-full flex bg-[#C1C1C1] h-2 mb-[-4px]`}
                                        />
                                      )}
                                    </div>
                                    <div
                                      onClick={() => {
                                        updateStakeAtIndex(idx, "unstake");
                                      }}
                                      className={`borderBottomNone px-4 py-1 flex flex-row border-r-gray-600 border-t-gray-200 border-l-gray-200 border-b-gray-600 border-2 cursor-pointer ${
                                        listPool[idx] == "unstake"
                                          ? "text-gray-800  bg-[#C1C1C1]"
                                          : "text-gray-500"
                                        }`}
                                      style={{
                                        zIndex:
                                          listPool[idx] == "unstake" ? 5 : 0,
                                      }}
                                    >
                                      Unstake
                                      {listPool[idx] == "unstake" && (
                                        <div
                                          className={`w-full flex bg-[#C1C1C1] h-2 mb-[-4px]`}
                                        />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="w-[300px] justify-between mb-1 bg-[#c1c1c1] px-4 py-1 flex flex-row border-l-gray-200 border-t-gray-200 border-r-gray-600 border-b-gray-600 border-2">
                                <div className="flex flex-col gap-1 w-[50%]"
                                  dangerouslySetInnerHTML={{
                                    __html: listPool[idx] == "stake"
                                      ? "Stake LOVE,<br />get FAITH"
                                      : "Burn FAITH,<br />get LOVE"
                                  }} />
                                <div className="flex flex-col gap-1">
                                  <div className="text-[11px] text-gray-500 leading-3">
                                    {listPool[idx] == "stake"
                                      ? "Unstaked LOVE balance"
                                      : "FAITH Balance"}
                                  </div>
                                  <div className="text-xs">
                                    {listPool[idx] == "stake"
                                      ? formatEther(item.loveBalance)
                                      : formatEther(item.faithBalance)}
                                  </div>
                                  <div className="flex flex-row gap-1">
                                    <input
                                      type="text"
                                      value={
                                        listPool[idx] == "stake"
                                          ? stakeValue
                                          : unStakeValue
                                      }
                                      onChange={(e) => {
                                        if (listPool[idx] == "stake")
                                          setStakeValue(e.target.value);
                                        if (listPool[idx] == "unstake")
                                          setUnStakeValue(e.target.value);
                                      }}
                                      className="text-[#0A0080] px-[3px] text-[10px] border-l-gray-600 border-t-gray-600 border-r-gray-200 border-b-gray-200 border-2"
                                    />
                                    <button
                                      onClick={() => {
                                        if (listPool[idx] == "stake") {
                                          setStakeValue(
                                            (
                                              formatEther(item.loveBalance) ??
                                              ""
                                            ).toString()
                                          );
                                        } else {
                                          setUnStakeValue(
                                            (
                                              formatEther(item.faithBalance) ??
                                              ""
                                            ).toString()
                                          );
                                        }
                                      }}
                                      className="smallBtn"
                                    >
                                      max
                                    </button>
                                  </div>
                                  <div
                                    className="btn mb-1"
                                    onClick={
                                      listPool[idx] == "stake"
                                        ? () => deposit(stakeValue)
                                        : () => withdraw(unStakeValue)
                                    }
                                  >
                                    {listPool[idx] == "stake"
                                      ? "Stake"
                                      : "Unstake"}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="justify-center items-center flex flex-col sm:flex-row w-full">
                            <div className="m-auto text-md px-2 mt-1 whitespace-nowrap">
                              NO POSITION FOUND
                            </div>
                            <button
                              onClick={() => {
                                if (item.stakeValue == 0) {
                                  const url = `https://app.uniswap.org/#/add/v2/${contractAddressLove}/ETH`;
                                  window.open(url, "_blank");
                                }
                              }}
                              className="m-auto mb-[6px] btn h-8 w-[90%] sm:w-[290px] text-center"
                            >
                              Add Liquidity
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="loading">loading</div>
      )}
    </>
  );
};

export default SingleStaking;

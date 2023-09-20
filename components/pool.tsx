import Image from "next/image";
import { PoolDataDisplay } from "./ui/PoolDataDisplay";
import { GeneralPoolData } from "../system/hooks/useFetchFarmData";
import { useFetchUserPoolData } from "../system/hooks/useFetchUserPoolData";
import { useEffect, useState } from "react";
import { PoolAprDataDisplay } from "./ui/PoolAprDataDisplay";
import { thousandSeparator } from "../system/appUtils";
import { StakedLiquidityDataDisplay } from "./ui/StakedLiquidityDataDisplay";
import { ExpandPoolUtilsButton } from "./ui/ExpandPoolUtilsButton";
import { FarmStakeUnstakeUtils } from "./ui/FarmStakeUnstakeUtils";
import { contractAddressLoveFarm } from "../utils/constant";
import { ethers } from "ethers";
import { AppContracts } from "../system/AppContracts";
import {
  requestErrorState,
  requestPendingState,
  requestSuccessState,
  useRequestState,
} from "../system/hooks/useRequestState";
import { TransactionNotificationWrapper } from "./ui/TransactionNotificationWrapper";

const lpContractAbi = require("../utils/poolABI.json");

const boxStyle =
  "p-2 h-16 flex border-l-gray-200 border-t-gray-200 border-r-gray-600 border-b-gray-600 portrait:border-b-0 border-2 ml-[0.5px] borderBottomShadow";
const boxStyle2 =
  "p-2 h-16 flex border-l-gray-200 border-t-gray-200 border-r-gray-600 border-b-gray-600 border-2 ml-[0.5px] borderBottomShadow";
const boxStyle3 =
  "h-[130px] landscape:h-16 w-[5%] sm:w-[3%] flex border-l-gray-200 border-t-gray-200 border-r-gray-200 border-l-2 border-t-2 border-r-2 ml-[0.8px]";

interface IPoolProps {
  pool: GeneralPoolData;
  address: string | undefined;
  lpContractAddress: string;
  poolIndex: number;
  onGetFarmData: () => Promise<void>;
}

export const Pool = ({
  pool,
  address,
  lpContractAddress,
  poolIndex,
  onGetFarmData,
}: IPoolProps) => {
  const [expanded, setExpanded] = useState(false);
  const { userPoolData, onGetUserPoolData, userDataPending } =
    useFetchUserPoolData();
  const [viewStake, setViewStake] = useState(true);
  const [stakeValue, setStakeValue] = useState<string>("");
  const [unStakeValue, setUnStakeValue] = useState<string>("");
  const { requestState, setRequestState } = useRequestState();
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (address && lpContractAddress && poolIndex !== undefined) {
      onGetUserPoolData(poolIndex, address, lpContractAddress);
    }
  }, [address, poolIndex, lpContractAddress]);

  const canShowPosition = () => !!address;

  const message = (rawMessage: string) => {
    if (rawMessage.includes("withdraw") || rawMessage.includes("underflow")) {
      return "Check amounts and try again.";
    }
    if (rawMessage.includes("unknown account")) {
      return "Please connect your wallet to interact.";
    }
    return rawMessage;
  };

  const handleTransactionSuccess = () => {
    setStakeValue("");
    setUnStakeValue("");
    setRequestState(requestSuccessState);
    onGetFarmData();
  };

  const handleTransactionError = (error: any) => {
    console.log(error?.reason);
    setErrorMessage(message(error?.reason));
    setRequestState(requestErrorState);
  };

  const depositToFarmContract = async (
    amount: string,
    lpContractAddress: string,
    poolIndex: number
  ) => {
    setRequestState(requestPendingState);

    try {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      const signer = provider.getSigner();
      const ETHLOVEPool = new ethers.Contract(
        lpContractAddress,
        lpContractAbi,
        signer
      );
      const { loveFarmContract } = new AppContracts(signer);
      const isApprovedForAll = await ETHLOVEPool.allowance(
        address,
        contractAddressLoveFarm!
      );
      let formattedAmount = ethers.utils.parseUnits(amount.toString(), "ether");
      if (isApprovedForAll.lt(formattedAmount)) {
        const tx = await ETHLOVEPool.approve(
          contractAddressLoveFarm,
          formattedAmount
        );
        await tx.wait(1);
      }
      const tx = await loveFarmContract.deposit(poolIndex, formattedAmount);
      await tx.wait(2);
      handleTransactionSuccess();
    } catch (error: any) {
      handleTransactionError(error);
    }
  };

  const withdrawFromFarmContract = async (
    amount: string,
    lpContractAddress: string,
    poolIndex: number
  ) => {
    setRequestState(requestPendingState);
    try {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      const signer = provider.getSigner();
      const { loveFarmContract } = new AppContracts(signer);
      let formattedAmount = ethers.utils.parseUnits(amount.toString(), "ether");
      const tx = await loveFarmContract.withdraw(poolIndex, formattedAmount);
      await tx.wait(2);
      handleTransactionSuccess();
    } catch (error: any) {
      handleTransactionError(error);
    }
  };

  const harvestFarmContract = async (poolIndex: number) => {
    setRequestState(requestPendingState);
    try {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      const signer = provider.getSigner();
      const { loveFarmContract } = new AppContracts(signer);
      const tx = await loveFarmContract.withdraw(poolIndex, 0);
      await tx.wait(2);
      await onGetFarmData();
      setRequestState(requestSuccessState);
    } catch (error) {
      console.log(error);
      setRequestState(requestErrorState);
    }
  };

  const dataIsUpdating = requestPendingState || userDataPending;
  return (
    <TransactionNotificationWrapper
      requestState={requestState}
      setRequestState={setRequestState}
      errorMessage={errorMessage}
    >
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row border-2 border-gray-600 border-b-0 mt-2">
          <div className="w-[95%] sm:w-[97%] flex flex-col landscape:flex-row">
            <div className="w-full portrait:border-b-gray-600 portrait:border-b-2 portrait:mb-[0.8px]">
              <div className="w-full flex flex-row">
                <div className={`w-[78%] pl-0 ${boxStyle}`}>
                  <div className="w-full flex flex-row justify-between px-1">
                    <div className="flex flex-row">
                      <Image
                        src={pool.poolIcon}
                        alt=""
                        width={30}
                        height={30}
                      />
                      <div className={`text-lg leading-5 flex`}>
                        <div className="my-auto mx-1">{pool.poolName}</div>
                      </div>
                    </div>
                    <div className="mr-1">
                      <PoolDataDisplay
                        title="DEP FEE"
                        data={`${pool.poolInfoValue * 100}%`}
                      />
                    </div>
                    <div>
                      <PoolDataDisplay
                        title="Earned"
                        data={userPoolData?.pendingLove.toString() || "NA"}
                      />
                    </div>
                  </div>
                </div>
                <div className={`w-[22%] ${boxStyle}`}>
                  <PoolAprDataDisplay
                    title="APR"
                    data={Math.ceil(pool.aprValue).toString()}
                  />
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="w-full flex flex-row">
                <div className={`w-[50%] ${boxStyle2}`}>
                  <StakedLiquidityDataDisplay
                    title="Staked Liquidity"
                    data={`$${thousandSeparator(pool.stakedLiquidity, 2, 2)}`}
                  />
                </div>
                <div className={`w-[25%] ${boxStyle2}`}>
                  <PoolDataDisplay
                    title="Available"
                    data={userPoolData?.lpAvailable.toString() || "NA"}
                  />
                </div>
                <div className={`w-[25%] ${boxStyle2}`}>
                  <PoolDataDisplay
                    title="Staked"
                    data={userPoolData?.stakedValue.toString() || "NA"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${boxStyle3} ${
              expanded ? "" : "embossBorderBottomExpanded"
            }`}
            style={{ marginBottom: "-10px" }}
          >
            <ExpandPoolUtilsButton
              isExpanded={expanded}
              onChangeExpanded={() => {
                if (address) {
                  setExpanded(!expanded);
                }
              }}
            />
          </div>
        </div>
        {expanded && canShowPosition() && !userDataPending && (
          <div className="w-full flex flex-row justify-between sm:border-2 sm:border-t-0 sm:border-l-gray-600 sm:border-b-gray-200 sm:border-r-gray-600">
            <div
              className={`relative w-full flex ${
                canShowPosition() ? "flex-col" : "flex-row"
              } sm:flex-row justify-between pt-0 sm:pt-2 sm:border-2 sm:border-t-0 sm:border-l-gray-200 sm:border-b-gray-600 sm:border-r-gray-200 pb-[8px] pr-0 sm:pr-[8px]`}
            >
              <div className="w-[100%] sm:w-[28%] flex border-2 sm:border-0 border-l-gray-600 border-r-0 sm:border-t-gray-600 border-t-0 border-b-0 sm:border-b-gray-100">
                <div className="w-full border-l-gray-200 border-t-0 border-r-0 border-b-0 sm:border-b-gray-600 border-2 sm:border-0 flex">
                  <div
                    className={`flex flex-col text-[#0A0080] text-xs ml-2 ${
                      canShowPosition()
                        ? "sm:ml-8 mt-1 mb-[-10px] sm:mb-auto"
                        : "m-auto"
                    }`}
                  >
                    <div
                      onClick={() => {
                        window.open(
                          `https://app.uniswap.org/#/add/v2/${pool.token}/${pool.baseAsset}`,
                          "_blank"
                        );
                      }}
                      className="cursor-pointer"
                    >
                      {`Add ${pool.poolName} LP`}
                    </div>
                    <div
                      onClick={() => {
                        window.open(
                          `https://etherscan.io/address/${lpContractAddress}`,
                          "_blank"
                        );
                      }}
                      className="cursor-pointer h-[20px] m-[3px]"
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
                  canShowPosition() ? "w-full" : "w-[68.1%]"
                } sm:w-[72%]`}
              >
                <div className="">
                  <div className="text-xs min-h-[16px] sm:min-h-0 embossBorderLeft sm:border-l-0 sm:before:border-l-0 text-right sm:text-left pr-1 pb-1 pr-2"></div>
                  <div className="embossBorderBottom block sm:hidden" />
                </div>
                <div className="w-full flex flex-row border-l-gray-600 sm:border-t-gray-600 border-t-0 sm:border-t-2 border-r-gray-100 border-b-gray-100 border-2 p-[0.5px]">
                  <div className="pb-2 sm:pb-0 w-full flex border-l-gray-200 border-t-0 sm:border-t-2 border-r-gray-600 border-b-gray-600 border-2 pt-1">
                    <div className="w-full sm:w-auto flex flex-col sm:flex-row">
                      <FarmStakeUnstakeUtils
                        poolIndex={poolIndex}
                        poolName={pool.poolName}
                        lovePerUser={userPoolData?.LoveUser.toString() || "NA"}
                        ethPerUser={userPoolData?.EthUser.toString() || "NA"}
                        isUnstakeVisible={!viewStake}
                        isStakeVisible={viewStake}
                        availableBalance={userPoolData?.lpTokenBalance!}
                        stakedBalance={userPoolData?.lpBalanceStake}
                        stakeValue={stakeValue}
                        unStakeValue={unStakeValue}
                        onShowStake={() => {
                          setViewStake(true);
                        }}
                        onShowUnstake={() => {
                          setViewStake(false);
                        }}
                        onChangeStakeValue={(value) => setStakeValue(value)}
                        onChangeUnstakeValue={(value) => setUnStakeValue(value)}
                        depositToFarmContract={(amount) =>
                          depositToFarmContract(
                            amount,
                            lpContractAddress,
                            poolIndex
                          )
                        }
                        withdrawFromFarmContract={(amount) =>
                          withdrawFromFarmContract(
                            amount,
                            lpContractAddress,
                            poolIndex
                          )
                        }
                      />
                      <div className="embossBorderTop w-full flex mt-2 sm:hidden" />
                      <div className="embossBorderLeft h-full ml-2 hidden sm:flex " />
                      <div className="flex flex-row sm:flex-col h-full gap-4 pl-4">
                        <div className="w-[60%] sm:w-full flex flex-col h-[80px] ">
                          <div className="mt-1">LOVE EARNED</div>
                          <div className="text-xl">
                            {userPoolData?.pendingLove}
                          </div>
                        </div>
                        <div className="sm:w-full">
                          <button
                            className="btn my-4 w-[80px] mr-2 sm:ml-2"
                            disabled={!userPoolData?.pendingLove}
                            onClick={() => harvestFarmContract(poolIndex)}
                          >
                            Harvest
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {expanded && !address && !dataIsUpdating && (
          <div className="w-full flex flex-row justify-center sm:border-2 sm:border-t-0 sm:border-l-gray-600 sm:border-b-gray-200 sm:border-r-gray-600">
            Connect Wallet
          </div>
        )}
        {expanded && address && userDataPending && (
          <div className="w-full flex flex-row justify-center sm:border-2 sm:border-t-0 sm:border-l-gray-600 sm:border-b-gray-200 sm:border-r-gray-600">
            <div className="loading" style={{ width: "200px" }}>
              loading
            </div>
          </div>
        )}
        {expanded && address && !userDataPending && !canShowPosition() && (
          <div className="w-full flex flex-row justify-between sm:border-2 sm:border-t-0 sm:border-l-gray-600 sm:border-b-gray-200 sm:border-r-gray-600">
            <div className="justify-center items-center flex flex-col w-full">
              <div className="m-auto text-md px-2 mt-1 whitespace-nowrap">
                NO POSITION FOUND
              </div>
              <button
                onClick={() => {
                  const url = `https://app.uniswap.org/#/add/v2/${pool.token}/${pool.baseAsset}`;
                  window.open(url, "_blank");
                }}
                className="m-auto mb-[6px] btn h-8 w-[90%] sm:w-[290px] text-center"
              >
                Add Liquidity
              </button>
            </div>
          </div>
        )}
      </div>
    </TransactionNotificationWrapper>
  );
};

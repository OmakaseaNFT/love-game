import Image from "next/image";
import { useContext, useState } from "react";
import { thousandSeparator } from "../system/appUtils";
import {
  ETHERSCAN_FAITH_LINK,
  contractAddressFaith,
  contractAddressLove,
} from "../utils/constant";
import { formatEther } from "ethers/lib/utils";
import {
  requestErrorState,
  requestPendingState,
  requestSuccessState,
  useRequestState,
} from "../system/hooks/useRequestState";
import { ethers } from "ethers";
import { AppContracts } from "../system/AppContracts";
import { ExpandPoolUtilsButton } from "./ui/ExpandPoolUtilsButton";
import { PoolDataDisplay } from "./ui/PoolDataDisplay";
import { TransactionNotificationWrapper } from "./ui/TransactionNotificationWrapper";
import { StakedLiquidityDataDisplay } from "./ui/StakedLiquidityDataDisplay";
import { FileThemeContext } from "../system/context/FileThemeContext";

interface ISingleStakePoolProps {
  fee: number;
  aprValue: string;
  totalStakedLove: number;
  loveBalance: string;
  faithBalance: string;
  lovePerUser: number;
  address: string;
  onGetSingleStakingData: () => Promise<void>;
}

const boxStyle =
  "p-2 h-16 flex border-l-gray-200 border-t-gray-200 border-r-gray-600 border-b-gray-600 portrait:border-b-0 border-2 ml-[0.5px] borderBottomShadow";
const boxStyle2 =
  "p-2 h-16 flex border-l-gray-200 border-t-gray-200 border-r-gray-600 border-b-gray-600 border-2 ml-[0.5px] borderBottomShadow";
const boxStyle3 =
  "h-[130px] landscape:h-16 w-[5%] sm:w-[3%] flex border-l-gray-200 border-t-gray-200 border-r-gray-200 border-l-2 border-t-2 border-r-2 ml-[0.8px]";

export const SingleStakePool = ({
  fee,
  aprValue,
  totalStakedLove,
  loveBalance,
  faithBalance,
  lovePerUser,
  address,
  onGetSingleStakingData,
}: ISingleStakePoolProps) => {
  const { files: { startIcon }} = useContext(FileThemeContext);
  const [expanded, setExpanded] = useState(true);
  const [isStakeVisible, setIsStakeVisible] = useState(true);
  const [stakeValue, setStakeValue] = useState<string>("");
  const [unStakeValue, setUnStakeValue] = useState<string>("");
  const { requestState, setRequestState } = useRequestState();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const message = (rawMessage: string) => {
    if (rawMessage.includes("withdraw") || rawMessage.includes("underflow")) {
      return "Check amounts and try again.";
    }
    return rawMessage;
  };

  const handleTransactionSuccess = () => {
    setStakeValue("");
    setUnStakeValue("");
    setRequestState(requestSuccessState);
    onGetSingleStakingData();
  };

  const handleTransactionError = (error: any) => {
    console.log(error?.reason);
    setErrorMessage(message(error?.reason));
    setRequestState(requestErrorState);
  };

  const deposit = async (amount: string, address: string) => {
    setRequestState(requestPendingState);

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
      handleTransactionSuccess();
      await onGetSingleStakingData();
    } catch (error: any) {
      handleTransactionError(error);
    }
  };

  const withdraw = async (amount: string) => {
    setRequestState(requestPendingState);
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
      handleTransactionSuccess();
    } catch (error: any) {
      handleTransactionError(error);
    }
  };

  return (
    <TransactionNotificationWrapper
      requestState={requestState}
      setRequestState={setRequestState}
      errorMessage={errorMessage}
    >
      <div className="w-full flex flex-col w-[600px]">
        <div className="w-full flex flex-row border-2 border-gray-600 border-b-0 mt-2">
          <div className="w-[95%] sm:w-[97%] flex flex-col landscape:flex-row">
            <div className="w-full portrait:border-b-gray-600 portrait:border-b-2 portrait:mb-[0.8px]">
              <div className="w-full flex flex-row">
                <div className={`w-[78%] ${boxStyle}`}>
                  <div className="w-full flex flex-row justify-between items-center px-1">
                    <Image
                      src={startIcon}
                      alt=""
                      width={20}
                      height={20}
                    />
                    <div className={`text-lg ml-2`}>LOVE</div>
                    <PoolDataDisplay title="DEP FEE" data={`${fee}%`} />
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
                    <div className="text-xs font-semibold text-center mb-[2px]">Ratio</div>
                    <div style={{ position: "relative", whiteSpace: "nowrap" }} className="mb-[-2px]">
                      {`${aprValue} LOVE / FAITH`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="w-full flex flex-row">
                <div className={`w-[100%] ${boxStyle2}`}>
                  <StakedLiquidityDataDisplay
                    title="Total Staked Love"
                    data={`$${thousandSeparator(totalStakedLove)}`}
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
              onChangeExpanded={() => setExpanded(!expanded)}
            />
          </div>
        </div>
        {expanded && (
          <div className="w-full flex flex-row justify-between sm:border-2 sm:border-t-0 sm:border-l-gray-600 sm:border-b-gray-200 sm:border-r-gray-600">
            <div
              className={`relative w-full flex ${
                loveBalance || faithBalance ? "flex-col" : "flex-row"
                } sm:flex-row justify-between pt-0 sm:pt-2 sm:border-2 sm:border-t-0 sm:border-l-gray-200 sm:border-b-gray-600 sm:border-r-gray-200 pb-[8px] pr-0 sm:pr-[8px]`}
            >
              <div className="w-[31.9%] sm:w-[28%] flex border-2 sm:border-0 border-l-gray-600 border-r-0 sm:border-t-gray-600 border-t-0 border-b-0 sm:border-b-gray-100">
                <div className="w-full border-l-gray-200 border-t-0 border-r-0 border-b-0 sm:border-b-gray-600 border-2 sm:border-0 flex">
                  <div
                    className={`flex flex-col text-[#0A0080] text-xs ml-2 ${
                      loveBalance || faithBalance
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
                  loveBalance || faithBalance ? "w-full" : "w-[68.1%]"
                  } sm:w-[72%]`}
              >
                <div className="w-full flex flex-row border-l-gray-600 sm:border-t-gray-600 border-t-0 sm:border-t-2 border-r-gray-100 border-b-gray-100 border-2 p-[0.5px]">
                  <div className="pb-2 sm:pb-0 w-full flex border-l-gray-200 border-t-0 sm:border-t-2 border-r-gray-600 border-b-gray-600 border-2 pt-1">
                    {loveBalance || faithBalance ? (
                      <div className="w-full sm:w-auto flex flex-col sm:flex-row">
                        <div className="flex flex-col m-auto sm:ml-2">
                          <div>LOVE</div>
                          <div className="flex flex-row justify-between">
                            <div className="flex flex-col text-xs text-[#0A0080] my-2">
                              <div>{thousandSeparator(lovePerUser)} LOVE</div>
                            </div>
                            <div className="flex flex-col justify-between">
                              <div />
                              <div
                                className={`flex flex-row text-md h-[30px] ${
                                  isStakeVisible ? "mb-[-2px]" : "mb-[-2px]"
                                  }`}
                              >
                                <div
                                  onClick={() => {
                                    setIsStakeVisible(true);
                                  }}
                                  style={{
                                    zIndex: isStakeVisible ? 2 : 0,
                                  }}
                                  className={`borderBottomNone px-4 py-1 flex flex-row border-l-gray-200 border-t-gray-200 border-r-gray-600 border-b-gray-600 border-2 cursor-pointer ${
                                    isStakeVisible
                                      ? "text-gray-800 border-b-0 bg-[#C1C1C1]"
                                      : "text-gray-500"
                                    }`}
                                >
                                  Stake
                                  {isStakeVisible && (
                                    <div
                                      className={`w-full flex bg-[#C1C1C1] h-2 mb-[-4px]`}
                                    />
                                  )}
                                </div>
                                <div
                                  onClick={() => {
                                    setIsStakeVisible(false);
                                  }}
                                  className={`borderBottomNone px-4 py-1 flex flex-row border-r-gray-600 border-t-gray-200 border-l-gray-200 border-b-gray-600 border-2 cursor-pointer ${
                                    !isStakeVisible
                                      ? "text-gray-800  bg-[#C1C1C1]"
                                      : "text-gray-500"
                                    }`}
                                  style={{
                                    zIndex: !isStakeVisible ? 5 : 0,
                                  }}
                                >
                                  Unstake
                                  {!isStakeVisible && (
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
                                __html: isStakeVisible
                                  ? "Stake LOVE,<br />get FAITH"
                                  : "Burn FAITH,<br />get LOVE"
                              }} />
                            <div className="flex flex-col gap-1">
                              <div className="text-[11px] text-gray-500 leading-3">
                                {isStakeVisible
                                  ? "Unstaked LOVE balance"
                                  : "FAITH Balance"}
                              </div>
                              <div className="text-xs">
                                {isStakeVisible
                                  ? formatEther(loveBalance)
                                  : formatEther(faithBalance)}
                              </div>
                              <div className="flex flex-row gap-1">
                                <input
                                  type="text"
                                  value={
                                    isStakeVisible ? stakeValue : unStakeValue
                                  }
                                  onChange={(e) => {
                                    if (isStakeVisible)
                                      setStakeValue(e.target.value);
                                    if (!isStakeVisible)
                                      setUnStakeValue(e.target.value);
                                  }}
                                  className="text-[#0A0080] px-[3px] text-[10px] border-l-gray-600 border-t-gray-600 border-r-gray-200 border-b-gray-200 border-2"
                                />
                                <button
                                  onClick={() => {
                                    if (isStakeVisible) {
                                      setStakeValue(
                                        (
                                          formatEther(loveBalance) ?? ""
                                        ).toString()
                                      );
                                    } else {
                                      setUnStakeValue(
                                        (
                                          formatEther(faithBalance) ?? ""
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
                                  isStakeVisible
                                    ? () => deposit(stakeValue, address)
                                    : () => withdraw(unStakeValue)
                                }
                              >
                                {isStakeVisible ? "Stake" : "Unstake"}
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
                            const url = `https://app.uniswap.org/#/add/v2/${contractAddressLove}/ETH`;
                            window.open(url, "_blank");
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
    </TransactionNotificationWrapper>
  );
};

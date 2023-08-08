import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";

interface IFarmStakeUnstakeUtilsProps {
  poolName: string;
  lovePerUser: string;
  ethPerUser: string;
  isUnstakeVisible: boolean;
  isStakeVisible: boolean;
  availableBalance: BigNumber;
  stakedBalance: string;
  stakeValue: string;
  unStakeValue: string;
  poolIndex: number;
  onShowStake: () => void;
  onShowUnstake: () => void;
  onChangeStakeValue: (value: string) => void;
  onChangeUnstakeValue: (value: string) => void;
  depositToFarmContract: (amount: string) => void;
  withdrawFromFarmContract: (amount: string) => void;
}

export const FarmStakeUnstakeUtils = ({
  lovePerUser,
  ethPerUser,
  isStakeVisible,
  isUnstakeVisible,
  availableBalance,
  stakedBalance,
  stakeValue,
  unStakeValue,
  poolName,
  poolIndex,
  onShowStake,
  onShowUnstake,
  depositToFarmContract,
  withdrawFromFarmContract,
  onChangeStakeValue,
  onChangeUnstakeValue,
}: IFarmStakeUnstakeUtilsProps) => {
  const tokenText = (poolIndex: number) => {
    switch (poolIndex) {
      case 0:
        return "ETH";
      case 1:
        return "USDT";
      case 2:
        return "WBTC";
      case 3:
        return "PEPE";
      default:
        return "ETH";
    }
  };
  return (
    <div className="flex flex-col m-auto sm:ml-2">
      <div>{poolName}</div>
      <div className="flex flex-row w-[300px] justify-between">
        <div className="flex flex-col text-xs text-[#0A0080] my-2">
          <div>{Number(lovePerUser).toFixed(6)} LOVE</div>
          <div>{`${Number(ethPerUser).toFixed(6)} ${tokenText(poolIndex)}`}</div>
        </div>
        <div className="flex flex-col justify-between">
          <div />
          <div
            className={`flex flex-row text-md h-[30px] ${
              isStakeVisible ? "mb-[-0.15rem]" : "mb-[-0.15rem]"
            }`}
          >
            <div
              onClick={onShowStake}
              style={{
                zIndex: isStakeVisible ? 5 : 0,
              }}
              className={`borderBottomNone px-4 py-1 flex flex-row border-l-gray-200 border-t-gray-200 border-r-gray-600 border-b-gray-600 border-2 cursor-pointer ${
                isStakeVisible
                  ? "text-gray-800 border-b-0 bg-[#C1C1C1]"
                  : "text-gray-500"
              }`}
            >
              Stake
            </div>
            <div
              onClick={onShowUnstake}
              className={`w-[82px] borderBottomNone px-4 py-1 flex flex-row border-r-gray-600 border-t-gray-200 border-l-gray-200 border-b-gray-600 border-2 cursor-pointer ${
                isUnstakeVisible
                  ? "text-gray-800  bg-[#C1C1C1] border-b-0"
                  : "text-gray-500"
              }`}
              style={{
                zIndex: isUnstakeVisible ? 5 : 0,
              }}
            >
              Unstake
            </div>
          </div>
        </div>
      </div>
      <div className="justify-between mb-1 bg-[#c1c1c1] px-4 py-1 flex flex-row border-l-gray-200 border-t-gray-200 border-r-gray-600 border-b-gray-600 border-2">
        <div className="flex flex-col gap-1">
          <div className="text-[11px] text-gray-500 leading-3">
            Amount to be {isStakeVisible ? "staked" : "unstaked"}
          </div>
          <div className="text-xs">
            {isStakeVisible
              ? `${formatEther(availableBalance)} LP`
              : `${formatEther(stakedBalance)} LP`}
          </div>
          <div className="flex flex-row gap-1">
            <input
              type="text"
              value={isStakeVisible ? stakeValue : unStakeValue}
              onChange={(e) => {
                if (isStakeVisible) onChangeStakeValue(e.target.value);
                if (isUnstakeVisible) onChangeUnstakeValue(e.target.value);
              }}
              className="text-[#0A0080] px-[3px] text-[10px] border-l-gray-600 border-t-gray-600 border-r-gray-200 border-b-gray-200 border-2"
            />
            <button
              onClick={() => {
                if (isStakeVisible) {
                  onChangeStakeValue(formatEther(availableBalance));
                } else {
                  onChangeUnstakeValue(formatEther(stakedBalance));
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
                ? () => depositToFarmContract(stakeValue)
                : () => withdrawFromFarmContract(unStakeValue)
            }
          >
            {isStakeVisible ? "Stake" : "Unstake"}
          </div>
        </div>
      </div>
    </div>
  );
};

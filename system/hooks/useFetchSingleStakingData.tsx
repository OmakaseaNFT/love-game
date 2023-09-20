import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

import { contractAddressFaith } from "../../utils/constant";
import { AppContracts } from "../AppContracts";
import { LoveTokenAbi } from "../LoveTokenAbi";
import { FaithAbi } from "../FaithAbi";
import { getTotalFaithUSD } from "./useFetchStakingTotal";

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

export type GeneralPoolData = {
  poolInfo: [
    string,
    ethers.BigNumber,
    ethers.BigNumber,
    ethers.BigNumber,
    number
  ] & {
    lpToken: string;
    allocPoint: ethers.BigNumber;
    lastRewardBlock: ethers.BigNumber;
    accLovePerShare: ethers.BigNumber;
    depositFeeBP: number;
  };
  poolInfoValue: number;
  aprValue: number;
  stakedLiquidity: number;
  poolName: string;
};

export const useFetchSingleStakingData = () => {
  const { address } = useAccount();
  const [singleStakingData, setSingleStakingData] = useState<PoolData>();
  const [dataLoading, setDataLoading] = useState<boolean>(false);

  const getSingleStakingData = async () => {
    setDataLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      const { loveTokenContract, faithContract, usdtLovePoolContract } =
        new AppContracts(provider);
      let availableValue;
      let availableStaked;
      let realValue;
      let stakeValue;

      const faithBalance = await faithContract.balanceOf(address!);
      const loveBalance = await loveTokenContract.balanceOf(address!);
      const aprValue = await calculateRatioAPR(
        faithContract,
        loveTokenContract
      );
      const fee = await faithContract.faithFeePercent();
      const lovePerUser =
        Number(ethers.utils.formatEther(faithBalance)) * aprValue;
      const totalStakedLove = await getTotalFaithUSD(
        loveTokenContract,
        usdtLovePoolContract
      );
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
      // console.log(data);
      setSingleStakingData(data);
      setDataLoading(false);
    } catch (error) {
      console.log(error);
      setDataLoading(false);
    }
  };

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

  useEffect(() => {
    if ((window as any).ethereum) {
      getSingleStakingData();
    }
  }, []);

  return {
    onGetSingleStakingData: getSingleStakingData,
    singleStakingData,
    dataLoading,
  };
};

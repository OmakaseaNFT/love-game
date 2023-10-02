import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

import { AppContracts } from "../AppContracts";
import {
  aprToApy,
  getFaithAPR,
  getLoveFaithRatio,
  getTotalFaithUSD,
} from "./useFetchStakingTotal";

type PoolData = {
  availableValue: any;
  stakedValue: any;
  availableBalance: any;
  stakeValue: any;
  aprValue: any;
  apyValue: any;
  loveFaithRatio: any;
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

      const faithBalance = address
        ? await faithContract.balanceOf(address!)
        : 0;
      const loveBalance = address
        ? await loveTokenContract.balanceOf(address!)
        : 0;
      const loveFaithRatio = await getLoveFaithRatio(
        faithContract,
        loveTokenContract
      );
      const fee = await faithContract.faithFeePercent();
      const lovePerUser =
        Number(ethers.utils.formatEther(faithBalance)) * loveFaithRatio;
      const totalStakedLove = await getTotalFaithUSD(
        loveTokenContract,
        usdtLovePoolContract
      );
      const aprValue = await getFaithAPR(faithContract, loveTokenContract);
      const apyValue = aprToApy(aprValue);
      const data: PoolData = {
        availableValue: availableValue,
        stakedValue: availableStaked,
        availableBalance: realValue,
        stakeValue: stakeValue,
        aprValue,
        apyValue,
        loveFaithRatio,
        totalStakedLove,
        faithBalance,
        loveBalance,
        fee: Number(fee),
        lovePerUser,
      };
      console.log(data);
      setSingleStakingData(data);
      setDataLoading(false);
    } catch (error) {
      console.log(error);
      setDataLoading(false);
    }
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

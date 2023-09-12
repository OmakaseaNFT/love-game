import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { LOVE_POOLS } from "../../utils/constant";
import { AppContracts } from "../AppContracts";
import { LoveFarmAbi } from "../LoveFarmAbi";
import { PoolAbi } from "../PoolAbi";
import {
  calculateAPR,
  calculateStakedLiquidity,
} from "./poolCalcUtils"

const lpContractAbi = require("../../utils/poolABI.json");

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
  poolIcon: string;
};

export const useFetchFarmData = () => {
  const [farmData, setFarmData] = useState<GeneralPoolData[]>([]);
  const [poolDataLoading, setPoolDataLoading] = useState<boolean>(false);

  const getPoolData = async (usdtLovePoolContract: PoolAbi, farmContract: LoveFarmAbi) => {
    setPoolDataLoading(true);
    try {
      const pool = await farmContract.poolLength();
      let poolInfo;

      const poolDataArr = [];

      if (Number(pool) > 0) {
        for (let index = 0; index < Number(pool); index++) {
          // Get pool info from Farm contract.
          poolInfo = await farmContract.poolInfo(index);

          const poolInfoReceipt = poolInfo.depositFeeBP / 10000;
          const lpContractAddress = poolInfo.lpToken;
          const provider = new ethers.providers.Web3Provider(
            (window as any).ethereum
          );

          // Dynamically create a contract based on the pool's LP token address.
          const lpContract = new ethers.Contract(
            lpContractAddress,
            lpContractAbi,
            provider
          ) as PoolAbi;

          const aprValue = await calculateAPR(index);

          const stakedLiquidity = await calculateStakedLiquidity(
            lpContract,
            farmContract,
            usdtLovePoolContract
          )
            .catch((e) => {
              console.log(`error calculating staked liquidity: \n${e}`);
              return 0
            });

          poolDataArr.push({
            poolInfo: poolInfo,
            poolInfoValue: poolInfoReceipt,
            aprValue: aprValue,
            stakedLiquidity: stakedLiquidity,
            poolName: LOVE_POOLS[index].name,
            poolIcon: LOVE_POOLS[index].icon,
          });
        }

        console.log(poolDataArr);
        setFarmData(poolDataArr);
        setPoolDataLoading(false);
      } else {
        setPoolDataLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setPoolDataLoading(false);
    }
  };

  const fetchPoolData = async () => {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const { loveFarmContract, usdtLovePoolContract } = new AppContracts(provider);
    await getPoolData(usdtLovePoolContract, loveFarmContract);
  };

  useEffect(() => {
    if ((window as any).ethereum) {
      fetchPoolData();
    }
  }, []);

  return {
    onGetFarmData: fetchPoolData,
    farmData,
    poolDataLoading,
  };
};

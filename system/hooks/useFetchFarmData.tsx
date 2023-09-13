import { BigNumber, ethers } from "ethers";
import { useState, useEffect } from "react";
import {
  BLOCKS_PER_YEAR,
  contractAddressLove,
  LOVE_POOLS,
  USDCAddress,
} from "../../utils/constant";
import { AppContracts } from "../AppContracts";
import { LoveFarmAbi } from "../LoveFarmAbi";
import { PoolAbi } from "../PoolAbi";
import {
  calculateAPR,
  calculateAPRLovePepe,
  calculateAPRLoveUsdt,
  calculateAPRLoveWbtc,
  calculateStakedLiquidityEthLove,
  calculateStakedLiquidityPepe,
  calculateStakedLiquidityUSDT,
  calculateStakedLiquidityWbtc,
} from "./poolCalcUtils";
import { parseEther } from "viem";

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

  const getPoolData = async (usdContract: any, farmContract: LoveFarmAbi) => {
    setPoolDataLoading(true);
    try {
      const pool = await farmContract.poolLength();
      let poolInfo;
      let aprValue;
      let stakedLiquidity;
      const poolDataArr = [];

      if (Number(pool) > 0) {
        for (let index = 0; index < Number(pool); index++) {
          // Get pool info from Farm contract.
          poolInfo = await farmContract.poolInfo(index);

          const totalAllocPoint = await farmContract.totalAllocPoint();
          const poolInfoReceipt = poolInfo.depositFeeBP / 10000;
          const lpContractAddress = poolInfo.lpToken;
          const allocPoint = poolInfo.allocPoint;
          const provider = new ethers.providers.Web3Provider(
            (window as any).ethereum
          );

          // Dynamically create a contract based on the pool's LP token address.
          const lpContract = new ethers.Contract(
            lpContractAddress,
            lpContractAbi,
            provider
          ) as PoolAbi;

          if (index === 0) {
            aprValue = await calculateAPR(index);
          } else if (index === 1) {
            aprValue = await calculateAPRLoveUsdt(index);
          }else if (index === 2) {
            aprValue = await calculateAPRLoveWbtc(index);
          }else if (index === 3) {
            aprValue = await calculateAPRLovePepe(index);
          } else {
            aprValue = 0;
          }

          if (index === 0) {
            stakedLiquidity = await calculateStakedLiquidityEthLove(
              usdContract,
              lpContract,
              farmContract
            );
          } else if (index === 1) {
            stakedLiquidity = await calculateStakedLiquidityUSDT(
              usdContract,
              lpContract,
              farmContract
            );
          } else if (index === 2) {
            stakedLiquidity = await calculateStakedLiquidityWbtc(
              lpContract,
              farmContract
            );
          } else if (index === 3) {
            stakedLiquidity = await calculateStakedLiquidityPepe(
              lpContract,
              farmContract
            );
          } else {
            stakedLiquidity = 0;
          }

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
    const { loveFarmContract, usdEthPoolContract } = new AppContracts(provider);
    await getPoolData(usdEthPoolContract, loveFarmContract);
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

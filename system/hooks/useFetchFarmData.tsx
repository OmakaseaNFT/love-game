import { ethers } from "ethers";
import { useState, useEffect } from "react";
import {
  contractAddressLove,
  LOVE_POOLS,
  USDCAddress,
} from "../../utils/constant";
import { AppContracts } from "../contracts/AppContracts";
import { LoveFarmAbi } from "../contracts/LoveFarmAbi";
import { PoolAbi } from "../contracts/PoolAbi";

const lpContractAbi = require("@/system/data/poolABI.json");

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
          } else {
            aprValue = 0;
          }

          if (index === 0) {
            stakedLiquidity = await calculateStakedLiquidity(
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

  const calculateStakedLiquidity = async (
    usdContract: PoolAbi,
    lpContract: PoolAbi,
    farmContract: LoveFarmAbi
  ) => {
    const lpBalanceFarm = await lpContract.balanceOf(farmContract.address);
    const lpTotalSupply = await lpContract.totalSupply();
    const ETHLOVEToken0 = await lpContract.token0();
    const ETHLOVEReserves = await lpContract.getReserves();

    let ETHReserves: any;
    let LOVEReserves: any;
    if (ETHLOVEToken0 == contractAddressLove) {
      LOVEReserves = ethers.utils.formatUnits(ETHLOVEReserves._reserve0, 18);
      ETHReserves = ethers.utils.formatUnits(ETHLOVEReserves._reserve1, 18);
    } else {
      LOVEReserves = ethers.utils.formatUnits(ETHLOVEReserves._reserve1, 18);
      ETHReserves = ethers.utils.formatUnits(ETHLOVEReserves._reserve0, 18);
    }

    const ETHInFarm =
      (ETHReserves * Number(lpBalanceFarm)) / Number(lpTotalSupply);
    const ETHUSDToken0 = await usdContract.token0();
    const ETHUSDReserves = await usdContract.getReserves();

    let USDAmount: any;
    let ETHAmount: any;
    if (ETHUSDToken0 == USDCAddress) {
      USDAmount = ethers.utils.formatUnits(ETHUSDReserves._reserve0, 6);
      ETHAmount = ethers.utils.formatUnits(ETHUSDReserves._reserve1, 18);
    } else {
      USDAmount = ethers.utils.formatUnits(ETHUSDReserves._reserve1, 6);
      ETHAmount = ethers.utils.formatUnits(ETHUSDReserves._reserve0, 18);
    }

    const ETHPriceUSD = USDAmount / ETHAmount;
    const ETHValueFarmUSD = ETHInFarm * ETHPriceUSD;
    const totalValue = ETHValueFarmUSD * 2;
    return totalValue;
  };

  const calculateStakedLiquidityUSDT = async (
    usdContract: PoolAbi,
    lpContract: PoolAbi,
    farmContract: LoveFarmAbi
  ) => {
    const lpBalanceFarm = await lpContract.balanceOf(farmContract.address);
    const lpTotalSupply = await lpContract.totalSupply();
    const USDTLOVEToken0 = await lpContract.token0();
    const USDTLOVEReserves = await lpContract.getReserves();

    let USDTReserves: any;
    let LOVEReserves: any;
    if (USDTLOVEToken0 == contractAddressLove) {
      LOVEReserves = ethers.utils.formatUnits(USDTLOVEReserves._reserve0, 18);
      USDTReserves = ethers.utils.formatUnits(USDTLOVEReserves._reserve1, 6);
    } else {
      LOVEReserves = ethers.utils.formatUnits(USDTLOVEReserves._reserve1, 18);
      USDTReserves = ethers.utils.formatUnits(USDTLOVEReserves._reserve0, 6);
    }

    const USDTInFarm =
      (USDTReserves * Number(lpBalanceFarm)) / Number(lpTotalSupply);
    const ETHUSDToken0 = await usdContract.token0();
    const ETHUSDReserves = await usdContract.getReserves();

    let USDAmount: any;
    let ETHAmount: any;
    if (ETHUSDToken0 == USDCAddress) {
      USDAmount = ethers.utils.formatUnits(ETHUSDReserves._reserve0, 6);
      ETHAmount = ethers.utils.formatUnits(ETHUSDReserves._reserve1, 18);
    } else {
      USDAmount = ethers.utils.formatUnits(ETHUSDReserves._reserve1, 6);
      ETHAmount = ethers.utils.formatUnits(ETHUSDReserves._reserve0, 18);
    }

    const ETHValueFarmUSD = USDTInFarm;
    const totalValue = ETHValueFarmUSD * 2;

    return totalValue;
  };

  async function calculateAPR(poolIndex: number) {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const { loveFarmContract } = new AppContracts(provider);
    const poolInfo = await loveFarmContract.poolInfo(0);

    const LOVEETHPoolAddy = poolInfo.lpToken;

    const lpContract = new ethers.Contract(
      LOVEETHPoolAddy,
      lpContractAbi,
      provider
    );

    // const USDETHPool = new ethers.Contract(USDETHPoolAddy, poolABI, deployer);

    const totalAllocPoint: any = await loveFarmContract.totalAllocPoint();
    const allocPoint: any = poolInfo.allocPoint;

    const blocksPerYear = 2591500;

    const LOVEETHToken0 = await lpContract.token0();
    const LOVEETHReserves = await lpContract.getReserves();
    let loveReservesBN;

    if (LOVEETHToken0 == contractAddressLove) {
      loveReservesBN = LOVEETHReserves._reserve0;
    } else {
      loveReservesBN = LOVEETHReserves._reserve1;
    }

    const lovePerBlock = await loveFarmContract.lovePerBlock();
    const totalLiquidityLocked = await lpContract.balanceOf(
      loveFarmContract.address
    );
    const totalLPSupply = await lpContract.totalSupply();
    const totalLoveLocked = totalLiquidityLocked
      .mul(loveReservesBN)
      .div(totalLPSupply);
    const annualRewardInToken =
      (Number(lovePerBlock) * blocksPerYear * allocPoint) / totalAllocPoint;
    const apr = (annualRewardInToken / Number(totalLoveLocked)) * 100;
    return Math.trunc(apr);
  }

  async function calculateAPRLoveUsdt(poolIndex: number) {
    const ETHUSDTPoolAddy = "0xE24Ab719209A9844E59dBfEEe91ce7d8D482532e";
    const farm = "0xFb063b1ae6471E6795d6ad1FC7f47c1cAb1f3422";
    const contractAddressLove = "0xB22C05CeDbF879a661fcc566B5a759d005Cf7b4C";
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const lpContract = new ethers.Contract(
      ETHUSDTPoolAddy,
      lpContractAbi,
      provider
    );
    const { loveFarmContract } = new AppContracts(provider);
    const poolInfo = await loveFarmContract.poolInfo(1);
    const totalAllocPoint: any = await loveFarmContract.totalAllocPoint();
    const allocPoint: any = poolInfo.allocPoint;

    const blocksPerYear = 2591500;

    const ETHUSDTToken0 = await lpContract.token0();
    const ETHUSDTReserves = await lpContract.getReserves();
    let loveReservesBN;

    if (ETHUSDTToken0 == contractAddressLove) {
      loveReservesBN = ETHUSDTReserves._reserve0;
    } else {
      loveReservesBN = ETHUSDTReserves._reserve1;
    }

    const lovePerBlock = await loveFarmContract.lovePerBlock();
    const totalLiquidityLocked = await lpContract.balanceOf(
      loveFarmContract.address
    );
    const totalLPSupply = await lpContract.totalSupply();
    const totalLoveLocked = totalLiquidityLocked
      .mul(loveReservesBN)
      .div(totalLPSupply);
    const annualRewardInToken =
      (Number(lovePerBlock) * blocksPerYear * allocPoint) / totalAllocPoint;
    const apr = (annualRewardInToken / Number(totalLoveLocked)) * 100;
    return apr;
  }

  return {
    onGetFarmData: fetchPoolData,
    farmData,
    poolDataLoading,
  };
};

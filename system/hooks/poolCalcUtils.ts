import { ethers } from "ethers";
import {
  contractAddressLove,
  ETHUSDTPoolAddy,
  USD_PEPE_POOL_ADDY,
  USD_WBTC_POOL_ADDY,
  USDCAddress,
} from "../../utils/constant";
import { LoveFarmAbi } from "../LoveFarmAbi";
import { PoolAbi } from "../PoolAbi";
import { AppContracts } from "../AppContracts";
import axios from "axios";
import { parseEther } from "viem";

const lpContractAbi = require("../../utils/poolABI.json");

export const calculateStakedLiquidityEthLove = async (
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

export const calculateStakedLiquidityWbtc = async (
  lpContract: PoolAbi,
  farmContract: LoveFarmAbi
) => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);

  const usdBtcPoolContract = new ethers.Contract(
    USD_WBTC_POOL_ADDY,
    lpContractAbi,
    provider
  ) as PoolAbi;

  const lpBalanceFarm = await lpContract.balanceOf(farmContract.address);
  const lpTotalSupply = await lpContract.totalSupply();
  const WBTCLOVEToken0 = await lpContract.token0();
  const WBTCLOVEReserves = await lpContract.getReserves();

  let WBTCReserves: any;
  let LOVEReserves: any;
  if (WBTCLOVEToken0 == process.env.NEXT_PUBLIC_CONTRACT_WBTC) {
    LOVEReserves = ethers.utils.formatUnits(WBTCLOVEReserves._reserve0, 18);
    WBTCReserves = ethers.utils.formatUnits(WBTCLOVEReserves._reserve1, 18);
  } else {
    LOVEReserves = ethers.utils.formatUnits(WBTCLOVEReserves._reserve1, 18);
    WBTCReserves = ethers.utils.formatUnits(WBTCLOVEReserves._reserve0, 18);
  }

  const WBTCInFarm =
    (WBTCReserves * Number(lpBalanceFarm)) / Number(lpTotalSupply) || 0;
  const WBTC_USDToken0 = await usdBtcPoolContract.token0();
  const WBTC_USDReserves = await usdBtcPoolContract.getReserves();

  let USDAmount: any;
  let WBTCAmount: any;
  if (WBTC_USDToken0 == USDCAddress) {
    USDAmount = ethers.utils.formatUnits(WBTC_USDReserves._reserve0, 6);
    WBTCAmount = ethers.utils.formatUnits(WBTC_USDReserves._reserve1, 8);
  } else {
    USDAmount = ethers.utils.formatUnits(WBTC_USDReserves._reserve1, 6);
    WBTCAmount = ethers.utils.formatUnits(WBTC_USDReserves._reserve0, 8);
  }

  const BTCPriceUSD = USDAmount / WBTCAmount;

  const BTCValueFarmUSD = WBTCInFarm * BTCPriceUSD;

  const totalValue = BTCValueFarmUSD * 2;
  return totalValue;
};

export const calculateStakedLiquidityPepe = async (
  lpContract: PoolAbi,
  farmContract: LoveFarmAbi
) => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);

  const usdPepePoolContract = new ethers.Contract(
    USD_PEPE_POOL_ADDY,
    lpContractAbi,
    provider
  ) as PoolAbi;

  const lpBalanceFarm = await lpContract.balanceOf(farmContract.address);
  const lpTotalSupply = await lpContract.totalSupply();
  const PEPELOVEToken0 = await lpContract.token0();
  const PEPELOVEReserves = await lpContract.getReserves();
  let PEPEReserves: any;
  let LOVEReserves: any;
  if (PEPELOVEToken0 == process.env.NEXT_PUBLIC_CONTRACT_PEPE) {
    LOVEReserves = ethers.utils.formatUnits(PEPELOVEReserves._reserve0, 18);
    PEPEReserves = ethers.utils.formatUnits(PEPELOVEReserves._reserve1, 18);
  } else {
    LOVEReserves = ethers.utils.formatUnits(PEPELOVEReserves._reserve1, 18);
    PEPEReserves = ethers.utils.formatUnits(PEPELOVEReserves._reserve0, 18);
  }

  const PEPEInFarm =
    (PEPEReserves * Number(lpBalanceFarm)) / Number(lpTotalSupply) || 0;

  const PEPE_USDToken0 = await usdPepePoolContract.token0();
  const PEPE_USDReserves = await usdPepePoolContract.getReserves();

  let USDAmount: any;
  let PEPEAmount: any;
  if (PEPE_USDToken0 == USDCAddress) {
    USDAmount = ethers.utils.formatUnits(PEPE_USDReserves._reserve0, 6);
    PEPEAmount = ethers.utils.formatUnits(PEPE_USDReserves._reserve1, 18);
  } else {
    USDAmount = ethers.utils.formatUnits(PEPE_USDReserves._reserve1, 6);
    PEPEAmount = ethers.utils.formatUnits(PEPE_USDReserves._reserve0, 18);
  }

  const PEPEPriceUSD = USDAmount / PEPEAmount;
  const PEPEValueFarmUSD = PEPEInFarm * PEPEPriceUSD;
  const totalValue = PEPEValueFarmUSD * 2;
  return totalValue;
};

export const calculateStakedLiquidityUSDT = async (
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

  const ETHValueFarmUSD = USDTInFarm;
  const totalValue = ETHValueFarmUSD * 2;

  return totalValue;
};

export async function calculateAPR(poolIndex: number) {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const { loveFarmContract } = new AppContracts(provider);
  const poolInfo = await loveFarmContract.poolInfo(poolIndex);

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

export async function calculateAPRLoveWbtc(poolIndex: number) {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const { loveFarmContract } = new AppContracts(provider);
  const poolInfo = await loveFarmContract.poolInfo(poolIndex);

  const LoveWbtcPoolAddy = poolInfo.lpToken;

  const lpContract = new ethers.Contract(
    LoveWbtcPoolAddy,
    lpContractAbi,
    provider
  );

  const totalAllocPoint: any = await loveFarmContract.totalAllocPoint();
  const allocPoint: any = poolInfo.allocPoint;

  const blocksPerYear = 2591500;

  const WBTC_TOKEN_ADDRESS = await lpContract.token0();
  const LOVE_WBTCReserves = await lpContract.getReserves();
  let loveReservesBN;

  if (WBTC_TOKEN_ADDRESS == process.env.NEXT_PUBLIC_CONTRACT_WBTC) {
    loveReservesBN = LOVE_WBTCReserves._reserve0;
  } else {
    loveReservesBN = LOVE_WBTCReserves._reserve1;
  }

  const lovePerBlock = await loveFarmContract.lovePerBlock();
  const totalLiquidityLocked = await lpContract.balanceOf(
    loveFarmContract.address
  );
  const totalLPSupply = await lpContract.totalSupply();
  const totalLoveLocked =
    loveReservesBN.isZero() || totalLPSupply.isZero()
      ? 0
      : totalLiquidityLocked.mul(loveReservesBN).div(totalLPSupply);
  const annualRewardInToken =
    (Number(lovePerBlock) * blocksPerYear * Number(allocPoint)) /
    Number(totalAllocPoint);

  console.log("poolInfo", poolInfo);
  console.log("loverReservesBN", loveReservesBN);
  console.log("totalLiquidityLocked", totalLiquidityLocked);
  console.log("totalLPSupply", totalLPSupply);
  console.log("annualRewardInToken", annualRewardInToken);
  console.log("totalLoveLocked", totalLoveLocked);

  const apr = (annualRewardInToken / Number(totalLoveLocked)) * 100;
  return Math.trunc(apr);
}
export async function calculateAPRLovePepe(poolIndex: number) {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const { loveFarmContract } = new AppContracts(provider);
  const poolInfo = await loveFarmContract.poolInfo(poolIndex);

  const LovePepePoolAddy = poolInfo.lpToken;

  const lpContract = new ethers.Contract(
    LovePepePoolAddy,
    lpContractAbi,
    provider
  );

  const totalAllocPoint: any = await loveFarmContract.totalAllocPoint();
  const allocPoint: any = poolInfo.allocPoint;

  const blocksPerYear = 2591500;

  const PEPE_TOKEN_ADDRESS = await lpContract.token0();
  const LOVE_WBTCReserves = await lpContract.getReserves();
  let loveReservesBN;

  if (PEPE_TOKEN_ADDRESS == process.env.NEXT_PUBLIC_CONTRACT_WBTC) {
    loveReservesBN = LOVE_WBTCReserves._reserve0;
  } else {
    loveReservesBN = LOVE_WBTCReserves._reserve1;
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
    (Number(lovePerBlock) * blocksPerYear * Number(allocPoint)) /
    Number(totalAllocPoint);
  const apr = (annualRewardInToken / Number(totalLoveLocked)) * 100;
  return Math.trunc(apr);
}

export async function calculateAPRLoveUsdt(poolIndex: number) {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
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

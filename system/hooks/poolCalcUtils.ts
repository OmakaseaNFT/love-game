import { ethers } from "ethers";
import {
  BLOCKS_PER_YEAR,
  contractAddressLove,
} from "../../utils/constant";
import { LoveFarmAbi } from "../LoveFarmAbi";
import { PoolAbi } from "../PoolAbi";
import { AppContracts } from "../AppContracts";

import lpContractAbi from "../../utils/poolABI.json";

// const calculateUSDTPriceFromLove =
//   (tokenPriceInLOVE: number, LOVEPriceInUSDT: number) => tokenPriceInLOVE * LOVEPriceInUSDT;

export const fetchLovePriceUSDT = async (usdtLovePoolContract: PoolAbi) => {
  const token0Address = await usdtLovePoolContract.token0();
  const USDTLOVEReserves = await usdtLovePoolContract.getReserves();
  const loveIsToken0 = token0Address == contractAddressLove;

  const LOVEKey = loveIsToken0 ? `_reserve0` : `_reserve1`;
  const USDTKey = loveIsToken0 ? `_reserve1` : `_reserve0`;

  const LOVEReserves = Number(ethers.utils.formatUnits(USDTLOVEReserves[LOVEKey], 18));
  const USDTReserves = Number(ethers.utils.formatUnits(USDTLOVEReserves[USDTKey], 6));

  const LOVEPriceUSDT = USDTReserves / LOVEReserves;

  return LOVEPriceUSDT;
}

export const fetchLovePriceETH = async (ethLovePoolContract: PoolAbi) => {
  const token0Address = await ethLovePoolContract.token0();
  const ETHLOVEReserves = await ethLovePoolContract.getReserves();
  const loveIsToken0 = token0Address == contractAddressLove;

  const LOVEKey = loveIsToken0 ? `_reserve0` : `_reserve1`;
  const ETHKey = loveIsToken0 ? `_reserve1` : `_reserve0`;

  const LOVEReserves = Number(ethers.utils.formatUnits(ETHLOVEReserves[LOVEKey], 18));
  const ETHReserves = Number(ethers.utils.formatUnits(ETHLOVEReserves[ETHKey], 18));

  const LOVEPriceETH = ETHReserves / LOVEReserves;

  return LOVEPriceETH;
}


export const calculateStakedLiquidity = async (
  lpContract: PoolAbi,
  farmContract: LoveFarmAbi,
  usdtLovePoolContract: PoolAbi,
) => {
  const LOVEPriceInUSDT = await fetchLovePriceUSDT(usdtLovePoolContract);
  const lpBalanceFarm = await lpContract.balanceOf(farmContract.address);
  const lpTotalSupply = await lpContract.totalSupply();
  const lpToken0 = await lpContract.token0();
  const lpReserves = await lpContract.getReserves();
  
  const token0IsLOVE = lpToken0 == contractAddressLove;
  const LOVEKey = token0IsLOVE ? `_reserve0` : `_reserve1`;
  const LOVEReservesBN = lpReserves[LOVEKey];
  
  const LOVEInFarmBN = LOVEReservesBN
    .mul(lpBalanceFarm)
    .div(lpTotalSupply);
  const LOVEInFarm = Number(ethers.utils.formatUnits(LOVEInFarmBN, 18));
  const LOVEInFarmValueUSDT = LOVEInFarm * LOVEPriceInUSDT;
  const totalValue = LOVEInFarmValueUSDT * 2;
  return totalValue;
}

export const calculateAPR = async (poolIndex: number) => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const { loveFarmContract } = new AppContracts(provider);

  const poolInfo = await loveFarmContract.poolInfo(poolIndex);
  const totalAllocPoint = await loveFarmContract.totalAllocPoint();
  const lovePerBlock = await loveFarmContract.lovePerBlock();

  const lpContract = new ethers.Contract(
    poolInfo.lpToken,
    lpContractAbi,
    provider
  ) as PoolAbi;

  const totalLiquidityLocked: ethers.BigNumber = await lpContract
    .balanceOf(loveFarmContract.address);
    
  const lpTotalSupply = await lpContract.totalSupply();
  const lpToken0 = await lpContract.token0();
  const lpReserves = await lpContract.getReserves();

  const token0IsLOVE = lpToken0 == contractAddressLove;

  const LOVEKey = token0IsLOVE ? `_reserve0` : `_reserve1`;

  const LOVEReservesBN = lpReserves[LOVEKey];

  const lovePerBlockBN = ethers.BigNumber.from(lovePerBlock);
  const allocPointBN = ethers.BigNumber.from(poolInfo.allocPoint);
  const totalAllocPointBN = ethers.BigNumber.from(totalAllocPoint);
  const blocksPerYearBN = ethers.BigNumber.from(BLOCKS_PER_YEAR);

  const totalLoveLockedBN = totalLiquidityLocked
    .mul(LOVEReservesBN)
    .div(lpTotalSupply);
  const totalLoveLocked = Number(ethers.utils.formatUnits(totalLoveLockedBN, 18));

  const annualRewardInTokenBN = lovePerBlockBN
    .mul(blocksPerYearBN)
    .mul(allocPointBN)
    .div(totalAllocPointBN);
  const annualRewardInToken = Number(ethers.utils.formatUnits(annualRewardInTokenBN, 18));

  const apr = (annualRewardInToken / totalLoveLocked) * 100;
  return Math.trunc(apr);
}

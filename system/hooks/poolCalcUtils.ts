import { ethers } from "ethers";
import {
  BLOCKS_PER_YEAR,
  contractAddressLove,
  contractAddressWar,
} from "../../utils/constant";
import { PoolAbi } from "../PoolAbi";
import { AppContracts } from "../AppContracts";

import lpContractAbi from "../../utils/poolABI.json";

const checkIsLovePair = (address1: string, address2: string): boolean =>
  address1 == contractAddressLove || address2 == contractAddressLove

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

export const fetchWarPriceLove = async (warLovePoolContract: PoolAbi) => {
  const token0Address = await warLovePoolContract.token0();
  const WARLOVEReserves = await warLovePoolContract.getReserves();
  const loveIsToken0 = token0Address == contractAddressLove;

  const LOVEKey = loveIsToken0 ? `_reserve0` : `_reserve1`;
  const WARKey = loveIsToken0 ? `_reserve1` : `_reserve0`;

  const LOVEReserves = Number(ethers.utils.formatUnits(WARLOVEReserves[LOVEKey], 18));
  const WARReserves = Number(ethers.utils.formatUnits(WARLOVEReserves[WARKey], 18));

  const WARPriceInLove = WARReserves / LOVEReserves;
  return WARPriceInLove;
}

export const fetchWarPriceUSDT = async (warLovePoolContract: PoolAbi, usdtLovePoolContract: PoolAbi) => {
  const LOVEPriceInUSDT = await fetchLovePriceUSDT(usdtLovePoolContract);
  const WARPriceInLove = await fetchWarPriceLove(warLovePoolContract);
  const WARPriceInUSDT = WARPriceInLove * LOVEPriceInUSDT;
  return WARPriceInUSDT;
}

export const calculateStakedLiquidity = async (
  lpContract: PoolAbi,
  appContracts: AppContracts,
) => {
  const { loveFarmContract, usdtLovePoolContract, warLovePoolContract } = appContracts;
  const lpBalanceFarm = await lpContract.balanceOf(loveFarmContract.address);
  const lpTotalSupply = await lpContract.totalSupply();
  const lpToken0 = await lpContract.token0();
  const lpToken1 = await lpContract.token1();
  const lpReserves = await lpContract.getReserves();
  const isLovePair = checkIsLovePair(lpToken0, lpToken1);
  
  if (isLovePair) {
    const LOVEPriceInUSDT = await fetchLovePriceUSDT(usdtLovePoolContract);

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
  } else {
    const WARPriceInUSDT = await fetchWarPriceUSDT(usdtLovePoolContract, warLovePoolContract);

    const token0IsWar = lpToken0 == contractAddressWar;
    const WARKey = token0IsWar ? `_reserve0` : `_reserve1`;
    const WARReservesBN = lpReserves[WARKey];
    
    const WARInFarmBN = WARReservesBN
      .mul(lpBalanceFarm)
      .div(lpTotalSupply);
    const WARInFarm = Number(ethers.utils.formatUnits(WARInFarmBN, 18));
    const WARInFarmValueUSDT = WARInFarm * WARPriceInUSDT;
    const totalValue = WARInFarmValueUSDT * 2;
    return totalValue;
  }
}

export const calculateAPR = async (poolIndex: number) => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const { loveFarmContract, warLovePoolContract } = new AppContracts(provider);

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
  const lpToken1 = await lpContract.token1();
  const lpReserves = await lpContract.getReserves();

  const isLovePair = checkIsLovePair(lpToken0, lpToken1);

  if (isLovePair) {
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
    const totalValueLocked = totalLoveLocked * 2;

    const annualRewardInTokenBN = lovePerBlockBN
      .mul(blocksPerYearBN)
      .mul(allocPointBN)
      .div(totalAllocPointBN);
    const annualRewardInToken = Number(ethers.utils.formatUnits(annualRewardInTokenBN, 18));

    const apr = (annualRewardInToken / totalValueLocked) * 100;
    return Math.trunc(apr);
  } else {
    const WARPriceLove = fetchWarPriceLove(warLovePoolContract);

    const token0IsWAR = lpToken0 == contractAddressLove;
    const WARKey = token0IsWAR ? `_reserve0` : `_reserve1`;
    const WARReservesBN = lpReserves[WARKey];

    const warPriceInLoveBN = ethers.BigNumber.from(WARPriceLove);
    const lovePerBlockBN = ethers.BigNumber.from(lovePerBlock);
    const allocPointBN = ethers.BigNumber.from(poolInfo.allocPoint);
    const totalAllocPointBN = ethers.BigNumber.from(totalAllocPoint);
    const blocksPerYearBN = ethers.BigNumber.from(BLOCKS_PER_YEAR);

    const totalWarLockedBN = totalLiquidityLocked
      .mul(WARReservesBN)
      .div(lpTotalSupply);
    const totalWarLocked = Number(ethers.utils.formatUnits(totalWarLockedBN, 18));
    const totalValueLocked = totalWarLocked * 2

    const annualRewardInTokenBN = lovePerBlockBN
      .div(warPriceInLoveBN)
      .mul(blocksPerYearBN)
      .mul(allocPointBN)
      .div(totalAllocPointBN);
    const annualRewardInToken = Number(ethers.utils.formatUnits(annualRewardInTokenBN, 18));

    const apr = (annualRewardInToken / totalValueLocked) * 100;
    return Math.trunc(apr);
  }
}

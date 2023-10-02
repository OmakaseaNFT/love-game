import { ethers } from "ethers";
import { useState, useEffect } from "react";

import { AppContracts } from "../AppContracts";
import { calculateStakedLiquidity, fetchLovePriceUSDT } from "./poolCalcUtils";
import { FaithAbi } from "../FaithAbi";
import { LoveTokenAbi } from "../LoveTokenAbi";
import { PoolAbi } from "../PoolAbi";
import lpContractAbi from "../../utils/poolABI.json";
import { BLOCKS_PER_YEAR, contractAddressFaith } from "../../utils/constant";
import { roundUSDToCents } from "../appUtils";

const loveFromBN = (bn: ethers.BigNumber): number =>
  Number(ethers.utils.formatUnits(bn, 18));

export const aprToApy = (apr: number): number => {
  const apy = ((1 + apr / 100 / BLOCKS_PER_YEAR) ** BLOCKS_PER_YEAR - 1) * 100;
  return Math.trunc(apy);
};

export async function getFaithAPR(
  faithContract: FaithAbi,
  loveTokenContract: LoveTokenAbi
) {
  const loveBalanceInFaithContract = await loveTokenContract.balanceOf(
    contractAddressFaith
  );
  const lovePerBlock = await faithContract.lovePerBlock();
  const annualRewardInLove = lovePerBlock.mul(
    ethers.BigNumber.from(BLOCKS_PER_YEAR)
  );

  const apy =
    (loveFromBN(annualRewardInLove) / loveFromBN(loveBalanceInFaithContract)) *
    100;

  return Math.trunc(Number(apy));
}

export const getLoveFaithRatio = async (
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

export async function getTotalFaithUSD(
  loveTokenContract: LoveTokenAbi,
  usdtLovePoolContract: PoolAbi
) {
  const loveBalanceInFaithContract = await loveTokenContract.balanceOf(
    contractAddressFaith
  );

  const lovePriceUSDT = await fetchLovePriceUSDT(usdtLovePoolContract);

  const totalFaithUSD =
    Number(ethers.utils.formatUnits(loveBalanceInFaithContract, 18)) *
    lovePriceUSDT;

  return totalFaithUSD;
}

export const getTotalStakedInFarmUSD = async (
  provider: ethers.providers.Provider
) => {
  const appContracts = new AppContracts(provider);
  const { loveFarmContract } = appContracts;
  const poolLength = await loveFarmContract.poolLength();
  const poolIDs = Array.from({ length: Number(poolLength) }, (_, i) => i);
  const pools = await Promise.all(
    poolIDs.map((id) => loveFarmContract.poolInfo(id))
  );
  const poolContracts = pools.map(
    ({ lpToken }) =>
      new ethers.Contract(lpToken, lpContractAbi, provider) as PoolAbi
  );
  const totalsInFarm = await Promise.all(
    poolContracts.map((lpContract) =>
      calculateStakedLiquidity(lpContract, appContracts)
    )
  );
  const totalFarmUSD = totalsInFarm.reduce((sum, staked) => sum + staked, 0);
  return totalFarmUSD;
};

export const useFetchTotalStaked = () => {
  const [totalStakedUSD, setTotalStaked] = useState<number>(0);
  const [totalFaithStakedUSD, setTotalFaith] = useState<number>(0);
  const [totalFarmStakedUSD, setTotalFarm] = useState<number>(0);
  const [isFetchingTotals, setIsLoading] = useState<boolean>(false);

  const fetchStakingTotals = async () => {
    setIsLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      const { loveTokenContract, usdtLovePoolContract } = new AppContracts(
        provider
      );
      const totalStakedUSD = await getTotalStakedInFarmUSD(provider);
      const totalFaithUSD = await getTotalFaithUSD(
        loveTokenContract,
        usdtLovePoolContract
      );
      const tvl = totalStakedUSD + totalFaithUSD;

      setTotalFarm(roundUSDToCents(totalStakedUSD));
      setTotalFaith(roundUSDToCents(totalFaithUSD));
      setTotalStaked(roundUSDToCents(tvl));
      setIsLoading(false);
    } catch (e) {
      console.log(`failed to fetch a staking totals: \n${e}`);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if ((window as any).ethereum) {
      fetchStakingTotals();
    }
  }, []);

  return {
    totalStakedUSD,
    totalFaithStakedUSD,
    totalFarmStakedUSD,
    isFetchingTotals,
  };
};

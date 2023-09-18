import { ethers } from "ethers";
import { useState, useEffect } from "react";

import { AppContracts } from "../AppContracts";
import { calculateStakedLiquidity, fetchLovePriceUSDT } from "./poolCalcUtils";
import { LoveTokenAbi } from "../LoveTokenAbi";
import { PoolAbi } from "../PoolAbi";
import lpContractAbi from "../../utils/poolABI.json";
import { contractAddressFaith } from "../../utils/constant";

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
      const tvl = Number((totalStakedUSD + totalFaithUSD).toFixed(2));

      setTotalFarm(totalStakedUSD);
      setTotalFaith(totalFaithUSD);
      setTotalStaked(tvl);
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

import { ethers } from "ethers";
import { useState, useEffect } from "react";

import { AppContracts } from "../AppContracts";
import { fetchLovePriceUSDT } from "./poolCalcUtils";
import { LoveTokenAbi } from "../LoveTokenAbi";
import { PoolAbi } from "../PoolAbi";

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

export const useFetchTotalFaith = () => {
  const [totalFaithStakedUSD, setTotalFaith] = useState<number>(0);
  const [isFetchingTotalFaith, setIsLoading] = useState<boolean>(false);

  const fetchStakingTotal = async () => {
    setIsLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      const { loveTokenContract, usdtLovePoolContract } = new AppContracts(
        provider
      );
      const totalFaithUSD = await getTotalFaithUSD(
        loveTokenContract,
        usdtLovePoolContract
      );
      setTotalFaith(totalFaithUSD);
      setIsLoading(false);
    } catch (e) {
      console.log(`failed to fetch a staking total for $FAITH: \n${e}`);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if ((window as any).ethereum) {
      fetchStakingTotal();
    }
  }, []);

  return { totalFaithStakedUSD, isFetchingTotalFaith };
};

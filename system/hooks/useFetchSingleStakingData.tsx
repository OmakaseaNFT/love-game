import { ethers } from "ethers";
import { useState, useEffect } from "react";
import {
  contractAddressFaith,
  contractAddressLove,
  USDCAddress,
} from "../../utils/constant";
import { AppContracts } from "../contracts/AppContracts";
import { LoveTokenAbi } from "../contracts/LoveTokenAbi";
import { FaithAbi } from "../contracts/FaithAbi";
import { useAccount } from "wagmi";

type PoolData = {
  availableValue: any;
  stakedValue: any;
  availableBalance: any;
  stakeValue: any;
  aprValue: any;
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
      const { loveTokenContract, faithContract } = new AppContracts(provider);
      let availableValue;
      let availableStaked;
      let realValue;
      let stakeValue;

      const faithBalance = await faithContract.balanceOf(address!);
      const loveBalance = await loveTokenContract.balanceOf(address!);
      const aprValue = await calculateRatioAPR(
        faithContract,
        loveTokenContract
      );
      const fee = await faithContract.faithFeePercent();
      const lovePerUser =
        Number(ethers.utils.formatEther(faithBalance)) * aprValue;
      const totalStakedLove = await totalFaithUSD();
      const data: PoolData = {
        availableValue: availableValue,
        stakedValue: availableStaked,
        availableBalance: realValue,
        stakeValue: stakeValue,
        aprValue: aprValue,
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

  async function totalFaithUSD() {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const signer = provider.getSigner();
    const {
      faithContract,
      loveTokenContract,
      usdEthPoolContract,
      ethLovePoolContract,
    } = new AppContracts(signer);

    const loveBalanceInFaithContract = await loveTokenContract.balanceOf(
      contractAddressFaith
    );

    const ETHUSDToken0 = await usdEthPoolContract.token0();
    const ETHUSDToken1 = await usdEthPoolContract.token1();
    const ETHUSDReserves = await usdEthPoolContract.getReserves();

    let USDAmount;
    let ETHAmount;
    if (ETHUSDToken0 == USDCAddress) {
      USDAmount = ethers.utils.formatUnits(ETHUSDReserves._reserve0, 6);
      ETHAmount = ethers.utils.formatUnits(ETHUSDReserves._reserve1, 18);
    } else {
      USDAmount = ethers.utils.formatUnits(ETHUSDReserves._reserve1, 6);
      ETHAmount = ethers.utils.formatUnits(ETHUSDReserves._reserve0, 18);
    }

    const ETHPriceUSD = Number(USDAmount) / Number(ETHAmount);

    const ETHLOVEToken0 = await ethLovePoolContract.token0();
    const ETHLOVEReserves = await ethLovePoolContract.getReserves();

    let loveReservesBN;
    let ETHReservesBN;
    if (ETHLOVEToken0 == contractAddressLove) {
      loveReservesBN = ETHLOVEReserves._reserve0;
      ETHReservesBN = ETHLOVEReserves._reserve1;
    } else {
      loveReservesBN = ETHLOVEReserves._reserve1;
      ETHReservesBN = ETHLOVEReserves._reserve0;
    }

    const loveETHRatio = ETHReservesBN.mul(
      ethers.BigNumber.from(10000000000)
    ).div(loveReservesBN);
    const LOVEPriceETH = loveETHRatio.toNumber() / 10000000000;

    const LOVEValueETH = LOVEPriceETH * Number(loveBalanceInFaithContract);
    const loveValueUSD = (LOVEValueETH * ETHPriceUSD) / 1e18;
    return loveValueUSD;
  }

  const calculateRatioAPR = async (
    faithContract: FaithAbi,
    loveContract: LoveTokenAbi
  ) => {
    const loveBalanceInFaithContract = await loveContract.balanceOf(
      contractAddressFaith
    );
    const totalFaith = await faithContract.totalSupply();

    const lovePerFaith = loveBalanceInFaithContract
      .mul(ethers.BigNumber.from("1000"))
      .div(totalFaith);
    const lovePerFaithRatio = lovePerFaith.toNumber() / 1000;

    return lovePerFaithRatio;
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

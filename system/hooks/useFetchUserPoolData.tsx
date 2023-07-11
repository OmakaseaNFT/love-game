import { ethers } from "ethers";
import { useState } from "react";
import { formatUnits } from "viem";
import {
  contractAddressLove,
  USD_PEPE_POOL_ADDY,
  USD_WBTC_POOL_ADDY,
  USDCAddress,
} from "../../utils/constant";
import { AppContracts } from "../AppContracts";
import { PoolAbi } from "../PoolAbi";
import { LoveFarmAbi } from "../LoveFarmAbi";
import axios from "axios";

const lpContractAbi = require("../../utils/poolABI.json");

type UserPoolData = {
  pendingLove: string;
  stakedValue: number;
  availableBalance: any;
  userValueStaked: any;
  lpTokenBalance: ethers.BigNumber;
  lpBalanceStake: any;
  EthUser: number;
  LoveUser: number;
  unstakedLiquidity: number;
  lpAvailable: number;
};

export const useFetchUserPoolData = () => {
  const [userPoolData, setUserPoolData] = useState<UserPoolData>();
  const [userDataPending, setUserDataPending] = useState(false);
  const getPoolUserData = async (
    poolIndex: number,
    address: string,
    lpContractAddress: string
  ) => {
    setUserDataPending(true);
    try {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );

      // Dynamically create a contract based on the pool's LP token address.
      const lpContract = new ethers.Contract(
        lpContractAddress,
        lpContractAbi,
        provider
      ) as PoolAbi;

      const { loveFarmContract, loveTokenContract } = new AppContracts(
        provider
      );

      const pendingLoveValue: any = await loveFarmContract.pendingLove(
        poolIndex,
        address
      );
      const realValue = await getAvailableRealValue(
        loveTokenContract,
        address!
      );
      const userInfo = await loveFarmContract.userInfo(poolIndex, address);
      const lpAvailable = await getAvailableToken(lpContract, address!);
      const availableStaked = Number(userInfo.amount.toString()) > 0 ? 1 : 0;
      const userValueStaked = userInfo.amount;
      const loveEthLpTokenBalance = await lpContract.balanceOf(address!);

      let getLpInformation: any;
      if (poolIndex === 0) {
        getLpInformation = await getTokenInformation(
          lpContract,
          loveFarmContract,
          address!,
          poolIndex
        );
      } else if (poolIndex === 1) {
        getLpInformation = await getTokenInformationUsdt(
          lpContract,
          loveFarmContract,
          address!,
          poolIndex
        );
      } else if (poolIndex === 2) {
        getLpInformation = await getTokenInformationWbtc(
          lpContract,
          loveFarmContract,
          address!,
          poolIndex
        );
      } else if (poolIndex === 3) {
        getLpInformation = await getTokenInformationPepe(
          lpContract,
          loveFarmContract,
          address!,
          poolIndex
        );
      } else {
        getLpInformation = {};
      }

      const data = {
        pendingLove: Number(formatUnits(pendingLoveValue, 18)).toFixed(2),
        stakedValue: availableStaked,
        availableBalance: realValue,
        userValueStaked,
        lpTokenBalance: loveEthLpTokenBalance,
        lpBalanceStake: getLpInformation.lpBalance,
        EthUser: getLpInformation.EthPerUser,
        LoveUser: getLpInformation.lovePerUser,
        unstakedLiquidity: getLpInformation.unstakedLiquidity,
        lpAvailable,
      };
      console.log(data);
      setUserPoolData(data);
      setUserDataPending(false);
    } catch (err) {
      console.log(err);
      setUserDataPending(false);
    }
  };

  const getAvailableToken = async (contractToken: any, address: string) => {
    try {
      const value = await contractToken.balanceOf(address);
      if (value > 0) {
        return 1;
      } else {
        return 0;
      }
    } catch (error) {
      return 0;
    }
  };

  const getAvailableRealValue = async (contractToken: any, address: string) => {
    try {
      const value = await contractToken.balanceOf(address);
      return value;
    } catch (error) {
      return 0;
    }
  };

  const getTokenInformation = async (
    lpContract: any,
    farmContract: LoveFarmAbi,
    address: string,
    poolIndex: number
  ) => {
    const userInfo = await farmContract.userInfo(poolIndex, address);
    const lpBalanceUser = userInfo.amount;
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

    const ETHPerUser =
      (ETHReserves * Number(lpBalanceUser.toString())) /
      Number(lpTotalSupply.toString());
    const LOVEPerUser =
      (LOVEReserves * Number(lpBalanceUser.toString())) /
      Number(lpTotalSupply.toString());

    const ETHUSDToken0 = await lpContract.token0();
    const ETHUSDReserves = await lpContract.getReserves();

    let USDAmount;
    let ETHAmount;
    if (ETHUSDToken0 == USDCAddress) {
      USDAmount = Number(formatUnits(ETHUSDReserves._reserve0, 6));
      ETHAmount = Number(formatUnits(ETHUSDReserves._reserve1, 18));
    } else {
      USDAmount = Number(formatUnits(ETHUSDReserves._reserve1, 6));
      ETHAmount = Number(formatUnits(ETHUSDReserves._reserve0, 18));
    }
    const ETHPriceUSD = USDAmount / ETHAmount;
    const ETHValueUserUSD = ETHPerUser * ETHPriceUSD;

    const totalValue = ETHValueUserUSD * 2;
    return {
      lpBalance: lpBalanceUser.toString(),
      EthPerUser: ETHPerUser,
      lovePerUser: LOVEPerUser,
      unstakedLiquidity: totalValue,
    };
  };

  const getTokenInformationUsdt = async (
    lpContract: any,
    farmContract: any,
    address: string,
    poolIndex: number
  ) => {
    const userInfo = await farmContract.userInfo(poolIndex, address);
    const lpBalanceUser = userInfo.amount;
    const lpTotalSupply = await lpContract.totalSupply();
    const ETHLOVEToken0 = await lpContract.token0();
    const ETHLOVEReserves = await lpContract.getReserves();

    let USDTReserves: any;
    let LOVEReserves: any;
    if (ETHLOVEToken0 == contractAddressLove) {
      LOVEReserves = ethers.utils.formatUnits(ETHLOVEReserves._reserve0, 18);
      USDTReserves = ethers.utils.formatUnits(ETHLOVEReserves._reserve1, 6);
    } else {
      LOVEReserves = ethers.utils.formatUnits(ETHLOVEReserves._reserve1, 18);
      USDTReserves = ethers.utils.formatUnits(ETHLOVEReserves._reserve0, 6);
    }

    const USDTPerUser =
      (USDTReserves * Number(lpBalanceUser.toString())) /
      Number(lpTotalSupply.toString());
    const LOVEPerUser =
      (LOVEReserves * Number(lpBalanceUser.toString())) /
      Number(lpTotalSupply.toString());

    const ETHValueUserUSD = USDTPerUser;

    const totalValue = ETHValueUserUSD * 2;
    return {
      lpBalance: lpBalanceUser.toString(),
      EthPerUser: USDTPerUser,
      lovePerUser: LOVEPerUser,
      unstakedLiquidity: totalValue,
    };
  };

  const getTokenInformationWbtc = async (
    lpContract: any,
    farmContract: LoveFarmAbi,
    address: string,
    poolIndex: number
  ) => {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );

    const usdBtcPoolContract = new ethers.Contract(
      USD_WBTC_POOL_ADDY,
      lpContractAbi,
      provider
    ) as PoolAbi;

    const userInfo = await farmContract.userInfo(poolIndex, address);
    const lpBalanceUser = userInfo.amount;
    const lpTotalSupply = await lpContract.totalSupply();
    const WBTC_LOVEToken0 = await lpContract.token0();
    const WBTC_LOVEReserves = await lpContract.getReserves();

    let WBTC_Reserves: any;
    let LOVEReserves: any;
    if (WBTC_LOVEToken0 == contractAddressLove) {
      LOVEReserves = ethers.utils.formatUnits(WBTC_LOVEReserves._reserve0, 18);
      WBTC_Reserves = ethers.utils.formatUnits(WBTC_LOVEReserves._reserve1, 8);
    } else {
      LOVEReserves = ethers.utils.formatUnits(WBTC_LOVEReserves._reserve1, 18);
      WBTC_Reserves = ethers.utils.formatUnits(WBTC_LOVEReserves._reserve0, 8);
    }

    const WBTCPerUser =
      (WBTC_Reserves * Number(lpBalanceUser.toString())) /
      Number(lpTotalSupply.toString());
    const LOVEPerUser =
      (LOVEReserves * Number(lpBalanceUser.toString())) /
      Number(lpTotalSupply.toString());

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
    const WBTCValueUserUSD = WBTCPerUser * BTCPriceUSD;

    const totalValue = WBTCValueUserUSD * 2;
    return {
      lpBalance: lpBalanceUser.toString(),
      EthPerUser: WBTCPerUser,
      lovePerUser: LOVEPerUser,
      unstakedLiquidity: totalValue,
    };
  };

  const getTokenInformationPepe = async (
    lpContract: any,
    farmContract: LoveFarmAbi,
    address: string,
    poolIndex: number
  ) => {
    const userInfo = await farmContract.userInfo(poolIndex, address);
    const lpBalanceUser = userInfo.amount;
    const lpTotalSupply = await lpContract.totalSupply();
    const PEPE_LOVEToken0 = await lpContract.token0();
    const PEPE_LOVEReserves = await lpContract.getReserves();

    let PEPE_Reserves: any;
    let LOVEReserves: any;
    if (PEPE_LOVEToken0 == contractAddressLove) {
      LOVEReserves = ethers.utils.formatUnits(PEPE_LOVEReserves._reserve0, 18);
      PEPE_Reserves = ethers.utils.formatUnits(PEPE_LOVEReserves._reserve1, 8);
    } else {
      LOVEReserves = ethers.utils.formatUnits(PEPE_LOVEReserves._reserve1, 18);
      PEPE_Reserves = ethers.utils.formatUnits(PEPE_LOVEReserves._reserve0, 8);
    }

    const PEPEPerUser =
      (PEPE_Reserves * Number(lpBalanceUser.toString())) /
      Number(lpTotalSupply.toString());
    const LOVEPerUser =
      (LOVEReserves * Number(lpBalanceUser.toString())) /
      Number(lpTotalSupply.toString());

    const response = await axios.get("/api/prices?token=PEPE");
    const PEPEPriceUSD = response.data.price;
    const PEPEValueUserUSD = PEPEPerUser * PEPEPriceUSD;

    const totalValue = PEPEValueUserUSD * 2;
    return {
      lpBalance: lpBalanceUser.toString(),
      EthPerUser: PEPEPerUser,
      lovePerUser: LOVEPerUser,
      unstakedLiquidity: totalValue,
    };
  };

  return {
    onGetUserPoolData: getPoolUserData,
    userPoolData,
    userDataPending,
  };
};

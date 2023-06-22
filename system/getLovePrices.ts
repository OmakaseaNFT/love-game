import { ethers } from "ethers";
import { USDCAddress, contractAddressLove } from "@/utils/constant";
import { PoolAbi } from "./contracts/PoolAbi";
import useLoveStore from "./stores/loveStore";

const getLovePrices = async (ETHLOVEPool: any, USDETHPool: PoolAbi) => {
  try {
    const [ETHLOVEToken0, ETHLOVEReserves, ETHUSDToken0, ETHUSDReserves] =
      await Promise.all([
        ETHLOVEPool.token0(),
        ETHLOVEPool.getReserves(),
        USDETHPool.token0(),
        USDETHPool.getReserves(),
      ]);

    const loveTokenMatch = ETHLOVEToken0 === contractAddressLove;
    const usdTokenMatch = ETHUSDToken0 === USDCAddress;

    const ETHReserves = Number(
      ethers.utils.formatUnits(
        ETHLOVEReserves[loveTokenMatch ? "_reserve1" : "_reserve0"],
        18
      )
    );
    const LOVEReserves = Number(
      ethers.utils.formatUnits(
        ETHLOVEReserves[loveTokenMatch ? "_reserve0" : "_reserve1"],
        18
      )
    );
    const USDAmount = Number(
      ethers.utils.formatUnits(
        ETHUSDReserves[usdTokenMatch ? "_reserve0" : "_reserve1"],
        6
      )
    );
    const ETHAmount = Number(
      ethers.utils.formatUnits(
        ETHUSDReserves[usdTokenMatch ? "_reserve1" : "_reserve0"],
        18
      )
    );

    const ETHPriceUSD = ETHAmount / USDAmount;
    const priceLOVEinETH = ETHReserves / LOVEReserves;

    useLoveStore.setState({
      price: parseFloat(priceLOVEinETH.toFixed(8)),
      USDPrice: parseFloat((priceLOVEinETH / ETHPriceUSD).toFixed(8)),
    });

    return {
      price: parseFloat(priceLOVEinETH.toFixed(8)),
      USDPrice: parseFloat((priceLOVEinETH / ETHPriceUSD).toFixed(8)),
    };
  } catch (error) {
    console.log(error);
  }
};

export default getLovePrices;

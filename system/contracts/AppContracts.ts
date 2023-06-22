import { ethers } from "ethers";
import { LoveFarmAbi } from "./contracts/LoveFarmAbi";
import {
  ETHLOVEPoolAddy,
  ETHLPAddy,
  USDETHPoolAddy,
  contractAddressFaith,
  contractAddressLove,
  contractAddressLoveFarm,
} from "@/utils/constant";
import { LoveTokenAbi } from "./contracts/LoveTokenAbi";
import { PoolAbi } from "./contracts/PoolAbi";
import { FaithAbi } from "./contracts/FaithAbi";

export class AppContracts {
  loveFarmContract: LoveFarmAbi;
  loveTokenContract: LoveTokenAbi;
  usdEthPoolContract: PoolAbi;
  ethLovePoolContract: PoolAbi;
  faithContract: FaithAbi;

  constructor(providerOrSigner: ethers.Signer | ethers.providers.Provider) {
    const loveFarmContractAbi = require("@/system/data/lovefarm.json");
    const loveTokenContractAbi = require("@/system/data/erc20abi.json");
    const usdEthPoolContractAbi = require("@/system/data/poolABI.json");
    const ethLovePoolContractAbi = require("@/system/data/poolABI.json");
    const faithContractAbi = require("@/system/data/Faith.abi.json");

    this.loveFarmContract = new ethers.Contract(
      contractAddressLoveFarm,
      loveFarmContractAbi,
      providerOrSigner
    ) as LoveFarmAbi;

    this.loveTokenContract = new ethers.Contract(
      contractAddressLove,
      loveTokenContractAbi,
      providerOrSigner
    ) as LoveTokenAbi;

    this.usdEthPoolContract = new ethers.Contract(
      USDETHPoolAddy,
      usdEthPoolContractAbi,
      providerOrSigner
    ) as PoolAbi;

    this.ethLovePoolContract = new ethers.Contract(
      ETHLOVEPoolAddy,
      ethLovePoolContractAbi,
      providerOrSigner
    ) as PoolAbi;

    this.faithContract = new ethers.Contract(
      contractAddressFaith,
      faithContractAbi,
      providerOrSigner
    ) as FaithAbi;
  }
}

import { ethers } from "ethers";
import { LoveFarmAbi } from "./LoveFarmAbi";
import {
  ETHLOVEPoolAddy,
  ETHLPAddy,
  USDETHPoolAddy,
  contractAddressFaith,
  contractAddressLove,
  contractAddressLoveFarm,
} from "../utils/constant";
import { LoveTokenAbi } from "./LoveTokenAbi";
import { PoolAbi } from "./PoolAbi";
import { FaithAbi } from "./FaithAbi";

export class AppContracts {
  loveFarmContract: LoveFarmAbi;
  loveTokenContract: LoveTokenAbi;
  usdEthPoolContract: PoolAbi;
  ethLovePoolContract: PoolAbi;
  faithContract: FaithAbi;

  constructor(providerOrSigner: ethers.Signer | ethers.providers.Provider) {
    const loveFarmContractAbi = require("../utils/lovefarm.json");
    const loveTokenContractAbi = require("../utils/erc20abi.json");
    const usdEthPoolContractAbi = require("../utils/poolABI.json");
    const ethLovePoolContractAbi = require("../utils/poolABI.json");
    const faithContractAbi = require("../utils/Faith.abi.json");

    this.loveFarmContract = new ethers.Contract(
      contractAddressLoveFarm!,
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

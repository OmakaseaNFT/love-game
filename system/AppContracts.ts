import { ethers } from "ethers";
import { LoveFarmAbi } from "./LoveFarmAbi";
import {
  ETHLOVEPoolAddy,
  USDTLOVEPoolAddy,
  WARLOVEPoolAddy,
  contractAddressFaith,
  contractAddressLove,
  contractAddressLoveFarm,
  contractAddressWar,
} from "../utils/constant";
import { LoveTokenAbi } from "./LoveTokenAbi";
import { PoolAbi } from "./PoolAbi";
import { FaithAbi } from "./FaithAbi";
import { WarAbi } from "./WarAbi";

export class AppContracts {
  loveFarmContract: LoveFarmAbi;
  loveTokenContract: LoveTokenAbi;
  ethLovePoolContract: PoolAbi;
  usdtLovePoolContract: PoolAbi;
  warLovePoolContract: PoolAbi;
  faithContract: FaithAbi;
  warContract: WarAbi;

  constructor(providerOrSigner: ethers.Signer | ethers.providers.Provider) {
    const loveFarmContractAbi = require("../utils/lovefarm.json");
    const loveTokenContractAbi = require("../utils/erc20abi.json");
    const ethLovePoolContractAbi = require("../utils/poolABI.json");
    const usdtLovePoolContractAbi = require("../utils/poolABI.json");
    const warLovePoolContractAbi = require("../utils/poolABI.json");
    const faithContractAbi = require("../utils/Faith.abi.json");
    const warContractAbi = require("../utils/war.abi.json");

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

    this.ethLovePoolContract = new ethers.Contract(
      ETHLOVEPoolAddy,
      ethLovePoolContractAbi,
      providerOrSigner
    ) as PoolAbi;

    this.usdtLovePoolContract = new ethers.Contract(
      USDTLOVEPoolAddy,
      usdtLovePoolContractAbi,
      providerOrSigner
    ) as PoolAbi;

    this.faithContract = new ethers.Contract(
      contractAddressFaith,
      faithContractAbi,
      providerOrSigner
    ) as FaithAbi;

    this.warContract = new ethers.Contract(
      contractAddressWar,
      warContractAbi,
      providerOrSigner
    ) as WarAbi;

    this.warLovePoolContract = new ethers.Contract(
      WARLOVEPoolAddy,
      warLovePoolContractAbi,
      providerOrSigner
    ) as PoolAbi;
  }
}

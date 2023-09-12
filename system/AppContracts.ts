import { ethers } from "ethers";
import { LoveFarmAbi } from "./LoveFarmAbi";
import {
  ETHLOVEPoolAddy,
  USDTLOVEPoolAddy,
  contractAddressFaith,
  contractAddressLove,
  contractAddressLoveFarm,
  contractAddressWar,
} from "../utils/constant";
import { LoveTokenAbi } from "./LoveTokenAbi";
import { PoolAbi } from "./PoolAbi";
import { FaithAbi } from "./FaithAbi";
import { WarClaimAbi } from "./WarClaimAbi";

export class AppContracts {
  loveFarmContract: LoveFarmAbi;
  loveTokenContract: LoveTokenAbi;
  ethLovePoolContract: PoolAbi;
  usdtLovePoolContract: PoolAbi;
  faithContract: FaithAbi;
  warClaimContract: WarClaimAbi;

  constructor(providerOrSigner: ethers.Signer | ethers.providers.Provider) {
    const loveFarmContractAbi = require("../utils/lovefarm.json");
    const loveTokenContractAbi = require("../utils/erc20abi.json");
    const ethLovePoolContractAbi = require("../utils/poolABI.json");
    const usdtLovePoolContractAbi = require("../utils/poolABI.json");
    const faithContractAbi = require("../utils/Faith.abi.json");
    const warClaimContractAbi = require("../utils/warClaim.abi.json");

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

    this.warClaimContract = new ethers.Contract(
      contractAddressWar,
      warClaimContractAbi,
      providerOrSigner
    ) as WarClaimAbi;
  }
}

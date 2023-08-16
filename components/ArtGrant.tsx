import { ethers } from "ethers";
import TestingABI from "../utils/testing.json";
import LoveNFTABI from "../utils/loveNFT.json";
import Image from "next/image";
import { useEffect, useState } from "react";

const loveNFTAddress = "0x570322Cd5Ee9A4EC341Bc85233C062cBA4724de0";
const loveTokenAddress = "0x2aA7b05CaDCb2A6604544131D556d68b5c18635e";
const ArtGrant = () => {
  const [multiply, setMultiply] = useState(0);
  const [value, setValue] = useState(0);

  useEffect(() => {
    setMultiply(value * 1000);
  }, [value]);
  function getTimestampInSeconds() {
    return Math.floor(Date.now() / 1000);
  }

  const handleMint = async () => {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const signer = provider.getSigner();

    const chainId = (await provider.getNetwork()).chainId;

    const loveNFTContract = new ethers.Contract(
      loveNFTAddress,
      LoveNFTABI,
      provider
    ) as any;

    const myTokenContract = new ethers.Contract(
      loveTokenAddress,
      TestingABI,
      provider
    ) as any;

    const getAddressSigner = await signer.getAddress();
    const myTokenBalance = await myTokenContract.balanceOf(getAddressSigner);

    const nonces = await myTokenContract.nonces(getAddressSigner);

    const domain = {
      name: await myTokenContract.name(),
      version: "1",
      chainId: chainId,
      verifyingContract: myTokenContract.address,
    };
    console.log(domain);

    const types = {
      Permit: [
        {
          name: "owner",
          type: "address",
        },
        {
          name: "spender",
          type: "address",
        },
        {
          name: "value",
          type: "uint256",
        },
        {
          name: "nonce",
          type: "uint256",
        },
        {
          name: "deadline",
          type: "uint256",
        },
      ],
    };

    const valueData = ethers.utils.parseEther(multiply.toString());
    const deadline = getTimestampInSeconds() + 4200;

    const values = {
      owner: getAddressSigner,
      spender: "0x570322Cd5Ee9A4EC341Bc85233C062cBA4724de0",
      value: valueData,
      nonce: nonces,
      deadline: deadline,
    };

    // Sign the typed data using the signer
    const signature = await signer._signTypedData(domain, types, values);

    // split the signature into its components
    const sig = ethers.utils.splitSignature(signature);

    const loveNFTContractWithSigner = loveNFTContract.connect(signer);

    // verify the Permit type data with the signature
    const recovered = ethers.utils.verifyTypedData(domain, types, values, sig);

    // get network gas price
    const gasPrice = await provider.getGasPrice();

    console.log(gasPrice.toString(), sig.v, sig.r, sig.s);

    console.log(loveNFTContract);

    let estimatedGas = await loveNFTContractWithSigner.estimateGas.mint(
      ethers.utils.parseEther(multiply.toString()),
      deadline,
      sig.v,
      sig.r,
      sig.s
    );

    const buffer = estimatedGas.mul(120).div(100); // adding 20% buffer
    const gasLimit = estimatedGas.add(buffer);

    let tx = await loveNFTContractWithSigner.mint(
      ethers.utils.parseEther(multiply.toString()),
      deadline,
      sig.v,
      sig.r,
      sig.s,
      {
        gasPrice: gasPrice,
        gasLimit: gasLimit,
        //hardcoded gas limit; change if needed
      }
    );

    await tx.wait(2);
  };

  return (
    <div className="flex flex-row items-center p-2">
      <div className="mr-2 w-2/3">
        <Image alt="" src="/assets/art_side.jpg" width={500} height={500} />
      </div>
      <div className="w-1/3">
        <div className="text-[20px]">COLLECTION NAME</div>
        <div className="text-[12px]">@beauti_100</div>
        <div className="text-[16px]">1000 Love</div>
        <div className="text-base">Amount to mint</div>
        <div>
          <input
            type="number"
            className="w-full"
            value={value}
            onChange={(e) => setValue(parseInt(e.target.value))}
          />
        </div>
        <div className="text-base">Total $LOVE to mint</div>
        <div className="text-[16px]">{multiply} Love</div>
        <div className="btn" onClick={() => handleMint()}>
          Mint Now
        </div>
      </div>
    </div>
  );
};

export default ArtGrant;

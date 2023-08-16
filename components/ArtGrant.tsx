import { ethers } from "ethers";
import TestingABI from "../utils/testing.json";
import LoveNFTABI from "../utils/loveNFT.json";
import Image from "next/image";
import { useEffect, useState } from "react";

const loveNFTAddress = process.env.NEXT_PUBLIC_FEATURED_NFT_MINT_ADDRESS;
const loveTokenAddress = process.env.NEXT_PUBLIC_CONTRACT_LOVE;
const ArtGrant = () => {
  const [multiply, setMultiply] = useState(0);
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setMultiply(parseInt(value) * 10000);
  }, [value]);
  function getTimestampInSeconds() {
    return Math.floor(Date.now() / 1000);
  }

  const handleMint = async () => {
    setLoading(true);
    setSuccess(false);
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const signer = provider.getSigner();

    const chainId = (await provider.getNetwork()).chainId;

    const loveNFTContract = new ethers.Contract(
      loveNFTAddress as string,
      LoveNFTABI,
      provider
    ) as any;

    const myTokenContract = new ethers.Contract(
      loveTokenAddress as string,
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

    if (parseInt(myTokenBalance.toString()) > multiply) {
      try {
        // Sign the typed data using the signer
        const signature = await signer._signTypedData(domain, types, values);

        // split the signature into its components
        const sig = ethers.utils.splitSignature(signature);

        // verify the Permit type data with the signature
        const recovered = ethers.utils.verifyTypedData(
          domain,
          types,
          values,
          sig
        );

        // get network gas price
        const gasPrice = await provider.getGasPrice();

        const loveNFTContractWithSigner = loveNFTContract.connect(signer);

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
        setSuccess(true);
      } catch (error: any) {
        setError("There was an error with the transaction");
      }
    } else {
      setError("Not enough balance!");
    }
    setLoading(false);
  };

  const menuBars = [
    {
      text: "<u>F</u>ile",
    },
    {
      text: "<u>E</u>dit",
    },
    {
      text: "<u>V</u>iew",
    },
    {
      text: "<u>H</u>elp",
    },
  ];

  return (
    <div className="w-full flex flex-col h-[500px]">
      <div className="text-gray-500 mt-1">
        {menuBars.map((item, idx) => (
          <span
            key={idx}
            dangerouslySetInnerHTML={{ __html: item.text }}
            className="mr-2"
          />
        ))}
      </div>
      <div className="border-l-gray-600 border-t-gray-600 border-r-gray-200 border-b-gray-200 border-[1.6px] bg-white w-[100%] flex aspect-[1.15] m-auto mt-1 py-1 px-2 overflow-auto">
        <div className="flex flex-row items-center">
          <div className="mr-2">
            <Image alt="" src="/assets/art_side.jpg" width={400} height={400} />
          </div>
          <div className="w-1/3">
            <div className="text-[48px]">COLLECTION NAME</div>
            <div className="text-base">@beauti_100</div>
            <div className="text-[32px]">10000 Love</div>
            <div className="text-base">Amount to mint</div>

            <div>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className="w-full border"
                value={value}
                onChange={(e) => {
                  const inputStr = e.target.value;

                  if (
                    inputStr === "" ||
                    (parseInt(inputStr) >= 0 && /^[0-9]+$/.test(inputStr))
                  ) {
                    setValue(inputStr);
                  }
                }}
              />
            </div>
            <div className="text-base">Total $LOVE to mint</div>
            <div className="text-[32px]">
              {" "}
              {isNaN(multiply) ? 0 : multiply} Love
            </div>
            <button
              className="btn text-[32px]"
              onClick={() => handleMint()}
              disabled={
                isNaN(parseInt(value)) || parseInt(value) === 0 || loading
              }
            >
              {loading ? "Loading..." : "Mint Now"}
            </button>
            {success && (
              <div className="text-green-400 mt-2">Minted Successfully</div>
            )}
            <div className="text-red-400 mt-2">{error}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtGrant;

import { useState, useEffect } from "react";
import { requestErrorState, requestPendingState, requestSuccessState, useRequestState } from "../system/hooks/useRequestState";
import { ethers } from "ethers";
import { contractAddressLoveSkinMint, contractAddressLove } from "../utils/constant";
import { LoveTokenAbi } from "../system/LoveTokenAbi";

interface Props {
  closeMe: () => void;
}

const MintSkin = ({ closeMe }: Props) => {
  const { requestState, setRequestState } = useRequestState();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const handleDeposit = async (address: string, amount: number) => {
    if (!amount) return;
    setRequestState(requestPendingState);
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const signer = provider.getSigner();
    const abi = require("../utils/erc20abi.json");
    const contract = new ethers.Contract(
      contractAddressLove,
      abi,
      signer
    ) as LoveTokenAbi;


    // const loveskin = new ethers.Contract(

    // )

    try {
      // check approval
      const tx = await contract.transfer(
        contractAddressLoveSkinMint,
        ethers.utils.parseEther(amount.toString())
      );
      //approve

      // get 

      

      await tx.wait(1);
      setRequestState(requestSuccessState);
    } catch (e: any) {
      setErrorMessage("Deposit failed");
      setRequestState(requestErrorState);
      console.log(e);
    }
  };
  return (
    <div className="w-full flex flex-col pt-[6px]">
      <div className="flex-col w-full">
        <div>You haven&apos;t unlocked this theme yet, unlock for 10,000 $LOVE?</div>

        <div className="w-full flex items-center justify-center flex-row">
          <button
            onClick={() => {
              const url = "https://www.youtube.com/watch?v=HEXWRTEbj1I";
              window.open(url, "_blank");
            }}
            className="btn w-auto h-[35px] m-auto mt-2 mb-4"
            dangerouslySetInnerHTML={{ __html: "Unlock" }}
          />
          <button
            onClick={closeMe}
            className="btn w-auto h-[35px] m-auto mt-2 mb-4"
            dangerouslySetInnerHTML={{ __html: "Cancel" }}
          />
        </div>
      </div>
    </div>
  );
};

export default MintSkin;

import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { ContractTransaction, providers } from "ethers";
import { useNetwork, useAccount, useSignMessage } from "wagmi";

import FireIcon from "../assets/fire-icon.png";
import { AppContracts } from "../system/AppContracts";

import {
  requestErrorState,
  requestPendingState,
  requestSuccessState,
  useRequestState,
} from "../system/hooks/useRequestState";
import { TransactionNotificationWrapper } from "./ui/TransactionNotificationWrapper";

const rickRoll = () =>
  window.open(
    "https://shattereddisk.github.io/rickroll/rickroll.mp4",
    '_blank',
    'noopener,noreferrer'
    );


const ClaimWarTokens = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const [isWrongNetwork, setWrongNetwork] = useState<boolean>(false);

  useEffect(() => {
    const isGoodNetwork = chain?.unsupported == false
    setWrongNetwork(!isGoodNetwork);
  }, [chain]);
    
  const { signMessageAsync } = useSignMessage();
  const { requestState, setRequestState } = useRequestState();
  const [ errorMessage, setErrorMessage ] = useState<string>("");

  const handleTransactionSuccess = () =>
    setRequestState(requestSuccessState);

  const handleTransactionError = (error: any) => {
    setErrorMessage(error?.reason);
    setRequestState(requestErrorState);
  }

  const rickRollError = (error: any) => {
    rickRoll();
    handleTransactionError(error);
  }

  const handleClaim = async () => {
    const message = `ALL IS FAIR IN $LOVE AND $WAR`;
    const provider = new providers.Web3Provider(
      (window as any).ethereum
    );
    const signer = provider.getSigner();
    const { warClaimContract } = new AppContracts(signer);
    setRequestState(requestPendingState);
    try {
      const sig = await signMessageAsync({message});
      const result = await axios.post(`/api/claimTokens`, {
        signature: sig,
        message
      });
      if (!result.data) return rickRollError({ reason: `Address is not eligible for claim!` });
      const owner = await signer.getAddress();
      const hasClaimed = owner ? await warClaimContract.hasClaimed(owner) : false;
      if (hasClaimed) return rickRollError({ reason: `Address has already claimed!` });
      try {
        const { messageHash, signature } = result.data;
        const tx: ContractTransaction = await warClaimContract.claim(messageHash, signature);
        await tx.wait(2)
        return handleTransactionSuccess();
      } catch (error: any) {
        return rickRollError(error);
      }
    } catch (error: any) {
      return handleTransactionError({ reason: `Failed to create signature with wallet!`});
    }
  };

  return (isWrongNetwork || !address) ? (
    <div className="flex flex-col gap-1 justify-center items-center mt-4 mx-auto">
      <p className="cursor-pointer hover:opacity-70">
        { !address ? "Connect Account" : "Switch Network" }
      </p>
    </div>
  ) : (
    <div className="flex flex-col gap-1 justify-center items-center mt-4 mx-auto">
      <TransactionNotificationWrapper
        requestState={requestState}
        setRequestState={setRequestState}
        errorMessage={errorMessage}
      >
        <Image src={FireIcon} alt="" width={72} height={72} />
        <button
          onClick={async () => await handleClaim()}
          className="btn w-auto h-[35px] m-auto my-2"
        >
          PARA BELLUM
        </button>      
      </TransactionNotificationWrapper>
    </div>
  );
};

export default ClaimWarTokens;
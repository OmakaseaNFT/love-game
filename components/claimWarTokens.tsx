import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { ContractTransaction, providers } from "ethers";
import { useAccount, useSignMessage } from "wagmi";

import ClaimIcon from "../assets/claim.png";
import { AppContracts } from "../system/AppContracts";
import { useWrongNetwork } from "../system/hooks/useWrongNetwork";
import { WalletConnectButton } from "./ui/WallectConnectButton";

import {
  requestErrorState,
  requestPendingState,
  requestSuccessState,
  useRequestState,
} from "../system/hooks/useRequestState";
import { TransactionNotificationWrapper } from "./ui/TransactionNotificationWrapper";

const rickRoll = () =>
  window.open(
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    '_blank',
    'noopener,noreferrer'
    );


const ClaimWarTokens = () => {
  const { address } = useAccount({
    onDisconnect() {
      window.location.reload();
    },
  });
  const { isWrongNetwork } = useWrongNetwork();
  const [, setPrevWrongNetwork] = useState<boolean>(false);

  useEffect(() => {
    setPrevWrongNetwork(isWrongNetwork);
  }, [isWrongNetwork]);

  const provider = new providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();
  const { warClaimContract } = new AppContracts(signer);
    
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

  const claim = async () => {
    setRequestState(requestPendingState);
    const message = `ALL IS FAIR IN $LOVE AND $WAR`;
    
    let sig = "";

    try {
      sig = await signMessageAsync({message});
    } catch (error: any) {
      return handleTransactionError({ reason: `Failed to create signature with wallet!`});
    }
  
    const result = await axios.post(`/api/claimTokens`, {
      signature: sig,
      message
    });
    
    const owner = await signer.getAddress();
    const hasClaimed = await warClaimContract.hasClaimed(owner);
    
    if (!result.data) {
      return rickRollError({ reason: `Address is not eligible for claim!` });
    } else if (hasClaimed) {
      return rickRollError({ reason: `Address has already claimed!` })
    }
    
    const { messageHash, signature } = result.data;

    try {
      const tx = await warClaimContract.claim(messageHash, signature) as ContractTransaction;
      await tx.wait(2)
      handleTransactionSuccess();
    } catch (error: any) {
      rickRollError(error);
    }
  };

  return (isWrongNetwork || !address) ? (
    <WalletConnectButton
      connectWalletElement={
        <p className="cursor-pointer hover:opacity-70">
          Connect Wallet
        </p>
      }
      walletConnectedElement={<></>}
      wrongNetworkElement={
        <p className="cursor-pointer hover:opacity-70">
          Switch Network
        </p>
      }
    />
  ) : (
    <TransactionNotificationWrapper
      requestState={requestState}
      setRequestState={setRequestState}
      errorMessage={errorMessage}
    >
      <div className="flex flex-col gap-1 justify-center items-center mt-4 mx-auto">
        <Image src={ClaimIcon} alt="" width={48} height={48} />
        <button
          onClick={async () => await claim()}
          className="btn w-auto h-[35px] m-auto my-2"
        >
          Claim $WAR!
        </button>      
      </div>
    </TransactionNotificationWrapper>
  );
};

export default ClaimWarTokens;
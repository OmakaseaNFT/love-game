import Image from "next/image";
import axios from "axios";
import { providers } from "ethers";
import { useSignMessage } from "wagmi";

import { AppContracts } from "../system/AppContracts";
import ClaimIcon from "../assets/claim.png";

const ClaimWarTokens = () => {
  const provider = new providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();
  const { warClaimContract } = new AppContracts(signer);
    
  const { signMessageAsync } = useSignMessage();

  const rickRoll = () =>
    window.open(
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      '_blank',
      'noopener,noreferrer'
      );
  
  const claim = async () => {
    const message = `ALL IS FAIR IN $LOVE AND $WAR`;

    const sig = await signMessageAsync({message});

    const result = await axios.post(`/api/claimTokens`, {
      signature: sig,
      message
    });

    const owner = await signer.getAddress();
    const hasClaimed = await warClaimContract.hasClaimed(owner);

    if (!result.data || hasClaimed) return rickRoll();

    const { messageHash, signature } = result.data;

    try {
      return await warClaimContract.claim(messageHash, signature)
    } catch (e) {
      return rickRoll();
    }
  };

  return (
    <div className="flex flex-col gap-1 justify-center items-center mt-4 mx-auto">
      <Image src={ClaimIcon} alt="" width={48} height={48} />
      <button
        onClick={async () => await claim()}
        className="btn w-auto h-[35px] m-auto my-2"
      >
        Claim $WAR!
      </button>      
    </div>
  );
};

export default ClaimWarTokens;
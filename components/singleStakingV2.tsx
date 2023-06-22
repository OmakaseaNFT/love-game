import { useAccount } from "wagmi";
import { useFetchSingleStakingData } from "@/system/hooks/useFetchSingleStakingData";
import { useWrongNetwork } from "@/system/hooks/useWrongNetwork";
import { SingleStakePool } from "./SingleStakePool";

const SingleStaking = () => {
  const { address } = useAccount();
  const { onGetSingleStakingData, singleStakingData, dataLoading } =
    useFetchSingleStakingData();
  const { isWrongNetwork } = useWrongNetwork();

  return (
    <>
      {!dataLoading && !isWrongNetwork && (
        <SingleStakePool
          fee={singleStakingData?.fee}
          aprValue={singleStakingData?.aprValue}
          totalStakedLove={singleStakingData?.totalStakedLove}
          loveBalance={singleStakingData?.loveBalance}
          faithBalance={singleStakingData?.faithBalance}
          lovePerUser={singleStakingData?.lovePerUser}
          address={address!}
          onGetSingleStakingData={onGetSingleStakingData}
        />
      )}
      {!isWrongNetwork && dataLoading && <div className="loading">loading</div>}
    </>
  );
};

export default SingleStaking;

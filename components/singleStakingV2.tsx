import { useAccount } from "wagmi";
import { useFetchSingleStakingData } from "../system/hooks/useFetchSingleStakingData";
import { useFetchTotalFaith } from "../system/hooks/useFetchStakingTotal";
import { SingleStakePool } from "./singleStakePool";
import { useWrongNetwork } from "../system/hooks/useWrongNetwork";

const SingleStaking = () => {
  const { address } = useAccount();
  const { onGetSingleStakingData, singleStakingData, dataLoading } =
    useFetchSingleStakingData();
  const { isWrongNetwork } = useWrongNetwork();
  const { totalFaithStakedUSD, isFetchingTotalFaith } = useFetchTotalFaith();

  return (
    <>
      {!dataLoading && !isWrongNetwork && !isFetchingTotalFaith && (
        <SingleStakePool
          fee={singleStakingData?.fee}
          aprValue={singleStakingData?.aprValue}
          totalStakedLove={totalFaithStakedUSD}
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

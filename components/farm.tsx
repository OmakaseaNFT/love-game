import { useEffect, useState } from "react";
import { useAccount, useSwitchNetwork } from "wagmi";
import { StakingSelectTab } from "./ui/StakingSelectTab";
import { useFetchFarmData } from "../system/hooks/useFetchFarmData";
import { useFetchTotalFaith } from "../system/hooks/useFetchStakingTotal";
import { Pool } from "./pool";
import SingleStaking from "./singleStakingV2";
import { useWrongNetwork } from "../system/hooks/useWrongNetwork";
import { WalletConnectButton } from "./ui/WallectConnectButton";

const thousandSeparator = (value: number) => {
  let formattedValue = value.toLocaleString("en-US", {
    style: "decimal",
    maximumFractionDigits: 3,
  });

  return formattedValue;
};

const Farm = () => {
  const [tab, setTab] = useState<string>("live");
  const { address } = useAccount({
    onDisconnect() {
      window.location.reload();
    },
  });
  const { farmData, onGetFarmData, poolDataLoading } = useFetchFarmData();
  const { totalFaithStakedUSD, isFetchingTotalFaith } = useFetchTotalFaith();
  const { isWrongNetwork } = useWrongNetwork();
  const [prevWrongNetwork, setPrevWrongNetwork] = useState<boolean>(false);

  const totalFarmStakedUSD: number = farmData.reduce(
    (sum, { stakedLiquidity }) => sum + stakedLiquidity,
    0
  );

  useEffect(() => {
    setPrevWrongNetwork(isWrongNetwork);
  }, [isWrongNetwork]);

  return (
    <div className="w-full">
      <div className="flex flex-col landscape:flex-row justify-between mt-2 ml-1">
        <div className="sm:order-first order-last flex flex-row gap-2 w-full mt-2">
          <div className="flex flex-col gap-2 w-[70%]">
            <div className="flex flex-row text-xl">
              <StakingSelectTab
                title="FARM"
                onClick={() => {
                  setTab("live");
                }}
                isSelected={tab == "live"}
              />
              <StakingSelectTab
                title="STAKING"
                onClick={() => {
                  setTab("finished");
                }}
                isSelected={tab == "finished"}
              />
              {!poolDataLoading && !isFetchingTotalFaith && (
                <StakingSelectTab
                  title={`TVL $${thousandSeparator(
                    totalFarmStakedUSD + totalFaithStakedUSD
                  )}`}
                  onClick={() => {}}
                  isSelected={false}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[360px] overflow-y-auto border-l-gray-200 border-t-gray-200 border-r-gray-600 border-b-gray-600 portrait:border-b-0 border-2 p-2 mb-2">
        {(isWrongNetwork || !address) && !poolDataLoading && (
          <WalletConnectButton
            connectWalletElement={
              <p className="cursor-pointer hover:opacity-70">Connect Wallet</p>
            }
            walletConnectedElement={<></>}
            wrongNetworkElement={
              <p className="cursor-pointer hover:opacity-70">Switch Network</p>
            }
          />
        )}
        {tab === "live" && (
          <>
            {!poolDataLoading ? (
              farmData.map((pool, idx: any) => (
                <>
                  <Pool
                    key={`pool-${idx}`}
                    pool={pool}
                    address={address}
                    lpContractAddress={pool.poolInfo.lpToken}
                    poolIndex={idx}
                    onGetFarmData={onGetFarmData}
                  />
                </>
              ))
            ) : (
              <div className="loading">loading</div>
            )}
          </>
        )}
        {tab === "finished" && <SingleStaking />}
      </div>
    </div>
  );
};

export default Farm;

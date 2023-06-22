import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useFetchFarmData } from "@/system/hooks/useFetchFarmData";
import Pool from "./Pool";
import { useWrongNetwork } from "@/system/hooks/useWrongNetwork";
import SingleStaking from "@/components/SingleStakingV2";
import StakingSelectTab from "@/components/StakingSelectTab";
import WalletConnectButton from "@/components/WallectConnectButton";

const Farm = () => {
  const [tab, setTab] = useState<string>("live");
  const { address } = useAccount({
    onDisconnect() {
      window.location.reload();
    },
    onConnect() {
      onGetFarmData();
    },
  });
  const { farmData, onGetFarmData, poolDataLoading } = useFetchFarmData();
  const { isWrongNetwork } = useWrongNetwork();
  const [prevWrongNetwork, setPrevWrongNetwork] = useState<boolean>(false);

  useEffect(() => {
    setPrevWrongNetwork(isWrongNetwork);
  }, [isWrongNetwork]);

  useEffect(() => {
    if (prevWrongNetwork && !isWrongNetwork) {
      onGetFarmData();
    }
  }, [isWrongNetwork, prevWrongNetwork, poolDataLoading]);

  return (
    <div className="w-full">
      <div className="flex flex-col justify-between mt-2 ml-1 landscape:flex-row">
        <div className="flex flex-row order-last w-full gap-2 mt-2 sm:order-first">
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
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[360px] overflow-y-auto border-l-gray-200 border-t-gray-200 border-r-gray-600 border-b-gray-600 portrait:border-b-0 border-2 p-2 mb-2">
        {tab === "live" && (
          <>
            {!poolDataLoading ? (
              farmData.map((pool, idx: number) => (
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
      </div>
    </div>
  );
};

export default Farm;

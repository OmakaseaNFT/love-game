import React from "react";
import { useAccount, useNetwork } from "wagmi";
import { CHAIN_ID } from "../../utils/constant";

export const useWrongNetwork = () => {
    const { chain } = useNetwork();
    const { address } = useAccount({
        onDisconnect() {
            window.location.reload();
        },
    });

    const chainID = chain?.id;
    const [isWrongNetwork, setIsWrongNetwork] = React.useState(false);
    const [currentChain, setCurrentChain] = React.useState<number>();


    React.useEffect(() => {
        if (chainID) {
            setCurrentChain(chainID);
        }
    }, [chainID]);

    React.useEffect(() => {
        if (currentChain !== chainID) {
            setIsWrongNetwork(chainID !== CHAIN_ID);
        }
    }, [currentChain, chainID, isWrongNetwork]);

    return {
        isWrongNetwork,
    };
};

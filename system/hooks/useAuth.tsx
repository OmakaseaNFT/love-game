import React from "react";
import { useAccount, useSignMessage } from "wagmi";
import { getSigAndMsgFromStorage } from "../appUtils";

/**
 * A custom hook for authorizing users.
 *
 * @returns A method for authorizing the user and
 *          the users session credentials.
 */
export const useAuth = () => {
    const { signMessageAsync } = useSignMessage();

    const [msg, setMsg] = React.useState("");
    const [sig, setSig] = React.useState("");
    const { isConnected, address } = useAccount({
        onDisconnect() {
            window.location.reload();
        },
    });
    const [currentAddress, setCurrentAddress] = React.useState("");

    const prevAddress = address;

    React.useEffect(() => {
        if (address) {
            setCurrentAddress(address);
            const { sig, msg } = getSigAndMsgFromStorage(address!);
            setSig(sig);
            setMsg(msg);
        }
    }, [address]);

    React.useEffect(() => {
        if (!!prevAddress && !!currentAddress) {
            if (prevAddress !== currentAddress) {
                window.location.reload();
            }
        }
    }, [address, prevAddress]);

    const handleAuthUser = async () => {
        const message = `Welcome to heartbreaker!`
        const { sig, msg } = getSigAndMsgFromStorage(address!);

        if (!sig) {
            const result = await signMessageAsync({message})
                .then((signature: string) => {
                    setMsg(message);
                    setSig(signature);

                    if (typeof window !== "undefined" && !!address) {
                        localStorage.setItem(
                            address,
                            JSON.stringify({ sig: signature, msg: message })
                        );
                    }

                    return {
                        sig: signature,
                        msg: message,
                    };
                })
                .catch((error: any) => {
                    console.log(error);
                });

            return result;
        }
        setMsg(msg);
        setSig(sig);
    };

    return {
        onAuthUser: handleAuthUser,
        signature: sig,
        message: msg,
    };
};

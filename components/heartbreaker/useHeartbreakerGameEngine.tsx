import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { io, Socket } from "socket.io-client";
import { ethers } from "ethers";
import {
  HEARTBREAKER_SOCKET_URL,
  contractAddressLove,
  contractAddressHeartbreak,
  BE_URL,
} from "../../utils/constant";
import { HeartbreakerAbi } from "../../system/HeartbreakerAbi";
import { LoveTokenAbi } from "../../system/LoveTokenAbi";
import {
  requestErrorState,
  requestPendingState,
  requestSuccessState,
  useRequestState,
} from "../../system/hooks/useRequestState";
import { AuthContext } from "../../system/context/AuthContext";

export const useHeartbreakerGameEngine = () => {
  const [balance, setBalance] = useState<number>(0);
  const [socket, setSocket] = useState<Socket>();
  const [mult, setMult] = useState<number>(1);
  const [multiplierToStopAt, setMultiplierToStopAt] = useState<
    string | undefined
  >("0");
  const [gameIsLive, setGameIsLive] = useState<boolean>(false);
  const [gameResults, setGameResults] = useState<any>([]);
  const [amountToPlay, setAmountToPlay] = useState(0);
  const [gameHistory, setGameHistory] = useState<any>([]);
  const [leaderboard, setLeaderboard] = useState<any>([]);
  const [gameTimer, setGameTimer] = useState<any>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [startAnimation, setStartAnimation] = useState<boolean>(false);
  const [userExited, setUserExited] = useState<boolean>(false);
  const [lockTime, setLockTime] = useState<number>(0);

  const { requestState, setRequestState } = useRequestState();
  const { address } = useAccount();
  const { signature, message, onAuthUser } = useContext(AuthContext);

  const handleGetBalance = async (address: string) => {
    await axios
      .get(`${BE_URL}/heartbreakPlayer?address=${address}`)
      .then((res) => {
        setLockTime(res.data.bettingLockTime);
        setBalance(parseFloat(res.data.balance));
        setAmountToPlay(0);
      });
  };

  const handleSocketInit = (socket: Socket) => {
    // initialize a socket io connection
    socket.on("connect", () => {
      console.log("connected to socket server");
    });

    socket.on("increment", (data) => {
      setMult(data.mult);
      if (!gameIsLive) setGameIsLive(true);
    });

    socket.on("startGame", (data) => {
      setMult(1);
      setGameIsLive(true);
      setGameTimer(0);
      setStartAnimation(true);
    });

    socket.on("timer", (data) => {
      setGameTimer(data.time);
    });

    socket.on("endGame", (data) => {
      setGameIsLive(false);
      setStartAnimation(false);
      setGameResults([]);
      handleGetGameHistory();
      handleGetGameLeaders();
      setUserExited(false);
    });

    socket.on("balanceUpdate", (data) => {
      if (!address) return;
      handleGetBalance(address);
    });

    socket.on("gameResults", (data) => {
      setGameResults(JSON.parse(data));
    });
  };

  const handleBet = async (multiplierToStopAt: number, amount: number) => {
    if (!socket) return;

    if (lockTime > 0) {
      setErrorMessage(
        `Please wait ${(lockTime / 60000).toFixed(
          2
        )} minutes before playing again`
      );
      setRequestState(requestErrorState);
      handleGetBalance(address!);
      return;
    }

    if (!signature || !message) {
      setErrorMessage("Please sign the message to play");
      setRequestState(requestErrorState);
      onAuthUser();
      return;
    }

    setAmountToPlay(amount);
    
    socket.emit("bet", {
      address,
      multiplierToStopAt,
      amount,
      signature,
      message,
    });
  };

  const handleStop = async (amount: number) => {
    setUserExited(true);
    if (!socket) return;

    if (lockTime > 0) {
      setErrorMessage(
        `Please wait ${(lockTime / 60000).toFixed(
          2
        )} minutes before playing again`
      );
      setRequestState(requestErrorState);
      handleGetBalance(address!);
      return;
    }

    if (!signature || !message) {
      setErrorMessage("Please sign the message to play");
      setRequestState(requestErrorState);
      onAuthUser();
      return;
    }

    socket.emit("exit", {
      address,
      amount,
      signature,
      message,
    });
  };

  const handleGetGameHistory = async () => {
    await axios
      .get(`${BE_URL}/heartbreakGames`)
      .then((res) => {
        setGameHistory(res.data);
      })
      .catch(() => {
        setGameHistory([]);
      });
  };

  const handleGetGameLeaders = async () => {
    await axios
      .get(`${BE_URL}/heartbreakLeaders`)
      .then((res) => {
        setLeaderboard(res.data);
      })
      .catch(() => {
        setLeaderboard([]);
      });
  };

  const handleWithdraw = async (
    address: string,
    amount: number,
    signature: string,
    message: string
  ) => {
    if (!amount) return;
    setRequestState(requestPendingState);
    await axios
      .post(`${BE_URL}/withdraw`, { address, amount, signature, message })
      .then((res) => {
        setLockTime(res.data.lockTime);
        handleWithdrawFromContract(res, address)
          .then(() => {
            handleGetBalance(address);
            setRequestState(requestSuccessState);
          })
          .catch(() => {
            if (lockTime) {
              setErrorMessage(
                `Withdraw locked for ${(lockTime / 60000).toFixed(2)} minutes`
              );
            } else {
              setErrorMessage("Withdraw failed");
            }
            setRequestState(requestErrorState);
          });
      })
      .catch((err) => {
        if (lockTime) {
          setErrorMessage(
            `Withdraw locked. Try again in ${lockTime / 1000} seconds}`
          );
        } else {
          setErrorMessage(err?.response?.data || "Withdraw failed");
        }
        setRequestState(requestErrorState);
      });
  };

  const handleWithdrawFromContract = async (res: any, address: string) => {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const signer = provider.getSigner();
    const abi = require("../../utils/heartbreaker.json");
    const contract = new ethers.Contract(
      contractAddressHeartbreak,
      abi,
      signer
    ) as HeartbreakerAbi;
    try {
      const tx = await contract.withdrawTokens(
        {
          ...res.data.recpt,
          _amount: ethers.utils.parseEther(res.data.recpt._amount.toString()),
        },
        res.data.sig,
        address
      );
      await tx.wait(2);
    } catch (e) {
      setErrorMessage("Withdraw failed");
      throw e;
    }
  };

  const handleDeposit = async (address: string, amount: number) => {
    if (!amount) return;
    setRequestState(requestPendingState);
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const signer = provider.getSigner();
    const abi = require("../../utils/erc20abi.json");
    const contract = new ethers.Contract(
      contractAddressLove,
      abi,
      signer
    ) as LoveTokenAbi;

    try {
      const tx = await contract.transfer(
        contractAddressHeartbreak,
        ethers.utils.parseEther(amount.toString())
      );

      await tx.wait(1);
      setRequestState(requestSuccessState);
      handleGetBalance(address);
    } catch (e: any) {
      setErrorMessage("Deposit failed");
      setRequestState(requestErrorState);
      console.log(e);
    }
  };

  useEffect(() => {
    if (!socket) {
      const socket = io(HEARTBREAKER_SOCKET_URL, { withCredentials: true });
      setSocket(socket);
      handleGetGameHistory();
    }
    if (socket) handleSocketInit(socket!);
    return () => {
      socket?.removeAllListeners();
    };
  }, [socket]);

  useEffect(() => {
    if (address) handleGetBalance(address);
  }, [address]);

  return {
    onBet: handleBet,
    onStop: handleStop,
    onDeposit: handleDeposit,
    onGetBalance: handleGetBalance,
    onSocketInit: handleSocketInit,
    onSetMultiplierToStopAt: (mult: string) => setMultiplierToStopAt(mult),
    onWithdraw: handleWithdraw,
    setRequestState,
    onChangeBalance: (newBalance: number) => setBalance(newBalance),
    onSetErrorMessage: (message: string) => setErrorMessage(message),
    userExited,
    startAnimation,
    multiplierToStopAt,
    balance,
    mult,
    gameIsLive,
    gameResults,
    amountToPlay,
    gameHistory,
    leaderboard,
    gameTimer,
    requestState,
    errorMessage,
    lockTime,
  };
};

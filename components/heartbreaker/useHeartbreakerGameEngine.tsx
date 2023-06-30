import axios from "axios";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { io, Socket } from "socket.io-client";
import { ethers } from "ethers";
import {
  HEARTBREAKER_CONTRACT_ADDRESS,
  HEARTBREAKER_SOCKET_URL,
  LOVE_TOKEN_SEPOLIA_CONTRACT,
  BE_URL,
} from "../../utils/constant";
import {
  HeartbreakerAbi,
  HeartbreakerAbiInterface,
} from "../../system/HeartbreakerAbi";
import { LoveTokenAbi } from "../../system/LoveTokenAbi";
import {
  requestErrorState,
  requestPendingState,
  requestSuccessState,
  useRequestState,
} from "../../system/hooks/useRequestState";
import { set } from "mongoose";

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
  const { requestState, setRequestState } = useRequestState();

  const { address } = useAccount();

  const handleGetBalance = async (address: string) => {
    await axios
      .get(`${BE_URL}/heartbreakPlayer?address=${address}`)
      .then((res) => {
        setBalance(Number(parseFloat(res.data.balance).toFixed(6)));
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
    });

    socket.on("timer", (data) => {
      setGameTimer(data.time);
    });

    socket.on("endGame", (data) => {
      setGameIsLive(false);
      setGameResults([]);
      setAmountToPlay(0);
      handleGetGameHistory();
      handleGetGameLeaders();
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
    setAmountToPlay(amount);
    if (!socket) return;

    socket.emit("bet", {
      address: address,
      multiplierToStopAt,
      amount,
    });
  };

  const handleStop = async (amount: number) => {
    if (!socket) return;

    socket.emit("exit", {
      address: address,
      amount,
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
    signature: string
  ) => {
    if (!amount) return;
    setRequestState(requestPendingState);
    await axios
      .post(`${BE_URL}/withdraw`, { address, amount, signature })
      .then((res) => {
        handleWithdrawFromContract(res, address)
          .then(() => {
            handleGetBalance(address);
            setRequestState(requestSuccessState);
          })
          .catch(() => {
            setErrorMessage("Withdraw failed");
            setRequestState(requestErrorState);
          });
      })
      .catch(() => {
        setErrorMessage("Withdraw failed");
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
      HEARTBREAKER_CONTRACT_ADDRESS,
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
      LOVE_TOKEN_SEPOLIA_CONTRACT,
      abi,
      signer
    ) as LoveTokenAbi;
    try {
      const tx = await contract.transfer(
        HEARTBREAKER_CONTRACT_ADDRESS,
        ethers.utils.parseEther(amount.toString())
      )
   
      
      await tx.wait(2);
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
      const socket = io(HEARTBREAKER_SOCKET_URL);
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
    errorMessage
  };
};

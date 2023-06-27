import axios from "axios";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { io, Socket } from "socket.io-client";
import { ethers } from "ethers";
import {
  HEARTBREAKER_CONTRACT_ADDRESS,
  LOVE_TOKEN_SEPOLIA_CONTRACT,
} from "../../utils/constant";
import {
  HeartbreakerAbi,
  HeartbreakerAbiInterface,
} from "../../system/HeartbreakerAbi";
import { LoveTokenAbi } from "../../system/LoveTokenAbi";

export const useHeartbreakerGameEngine = () => {
  const [balance, setBalance] = useState<number>(0);
  const [socket, setSocket] = useState<Socket>();
  const [mult, setMult] = useState<number>(1);
  const [multiplierToStopAt, setMultiplierToStopAt] = useState<number>(1.01);
  const [gameIsLive, setGameIsLive] = useState<boolean>(false);
  const [gameResults, setGameResults] = useState<any>([]);
  const [amountToPlay, setAmountToPlay] = useState(0);
  const [gameHistory, setGameHistory] = useState<any>([]);
  const [leaderboard, setLeaderboard] = useState<any>([]);
  const [gameTimer, setGameTimer] = useState<any>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { address } = useAccount();

  const handleGetBalance = async (address: string) => {
    await axios
      .get(`http://localhost:3030/heartbreakPlayer?address=${address}`)
      .then((res) => {
        setBalance(res.data.balance);
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
      setGameIsLive(true);
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
    console.log("BET", multiplierToStopAt, amount);
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
      .get(`http://localhost:3030/heartbreakGames`)
      .then((res) => {
        setGameHistory(res.data);
      })
      .catch(() => {
        setGameHistory([]);
      });
  };

  const handleGetGameLeaders = async () => {
    await axios
      .get(`http://localhost:3030/heartbreakLeaders`)
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
    await axios
      .post(`http://localhost:3030/withdraw`, { address, amount, signature })
      .then((res) => {
        console.log();

        handleWithdrawFromContract(res, address).then(() => {
          handleGetBalance(address);
        });
      })
      .catch(() => {
        setErrorMessage("Withdraw failed");
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
    console.log("res.data.receipt", res.data.recpt, res.data.sig, address);
    try {
      const tx = await contract.withdrawLOVE(
        {
          ...res.data.recpt,
          _amount: ethers.utils.parseEther(res.data.recpt._amount.toString()),
        },
        res.data.sig,
        address
      );
      await tx.wait(2);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeposit = async (address: string, amount: number) => {
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
      );
      await tx.wait(2);
      handleGetBalance(address);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const socket = io("http://localhost:4000");
    setSocket(socket);
    handleGetGameHistory();
  }, []);

  useEffect(() => {
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
    onSetMultiplierToStopAt: (mult: number) => setMultiplierToStopAt(mult),
    onWithdraw: handleWithdraw,
    multiplierToStopAt,
    balance,
    mult,
    gameIsLive,
    gameResults,
    amountToPlay,
    gameHistory,
    leaderboard,
    gameTimer,
  };
};

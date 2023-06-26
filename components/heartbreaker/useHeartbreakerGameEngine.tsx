import axios from "axios";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { io, Socket } from "socket.io-client";

export const useHeartbreakerGameEngine = () => {
  const [balance, setBalance] = useState<number>(0);
  const [socket, setSocket] = useState<Socket>();
  const [mult, setMult] = useState<number>(1);
  const [multiplierToStopAt, setMultiplierToStopAt] = useState<number>(1.01);
  const [gameIsLive, setGameIsLive] = useState<boolean>(false);
  const [gameResults, setGameResults] = useState<any>([]);
  const [amountToPlay, setAmountToPlay] = useState(0);

  const { address } = useAccount();

  const handleGetBalance = async (address: string) => {
    await axios
      .get(`http://localhost:3030/heartbreakPlayer?address=${address}`)
      .then((res) => {
        setBalance(res.data.balance);
        console.log(res.data);
      });
  };

  const handleDeposit = async () => {
    await axios
      .post(`http://localhost:3030/heartbreakPlayer`, {})
      .then((res) => {});
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

    socket.on("endGame", (data) => {
      setGameIsLive(false);
      setGameResults([]);
      console.log("gameResults", gameResults);

      setAmountToPlay(0);
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

  useEffect(() => {
    const socket = io("http://localhost:4000");
    setSocket(socket);
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
    multiplierToStopAt,
    balance,
    mult,
    gameIsLive,
    gameResults,
    amountToPlay,
  };
};

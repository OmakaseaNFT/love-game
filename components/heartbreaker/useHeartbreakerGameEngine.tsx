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
  const [amountToBet, setAmountToBet] = useState<number>(1000);

  const disabled = gameIsLive;

  const betButtonStyles = {
    border: "1px solid black",
    padding: "8px 16px",
    borderRadius: "4px",
    background: disabled ? "rgba(0, 0, 0, 0.3)" : "transparent",
    color: disabled ? "rgba(0, 0, 0, 0.5)" : "black",
    cursor: disabled ? "not-allowed" : "pointer",
  };

  const stopButtonStyles = {
    border: "1px solid black",
    padding: "8px 16px",
    borderRadius: "4px",
    background: !gameIsLive ? "rgba(0, 0, 0, 0.3)" : "transparent",
    color: !gameIsLive ? "rgba(0, 0, 0, 0.5)" : "black",
    cursor: !gameIsLive ? "not-allowed" : "pointer",
  };

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
    });

    socket.on("startGame", (data) => {
      setGameIsLive(true);
    });

    socket.on("endGame", (data) => {
      setGameIsLive(false);
    });

    socket.on("balanceUpdate", (data) => {
      handleGetBalance(address!);
    });
  };

  const handleBet = async (multiplierToStopAt: number, amount: number) => {
    console.log("SOCKET", socket);
    
    if (!socket) return;

    socket.emit("bet", {
      address: address,
      multiplierToStopAt,
      amount,
    });
    console.log("BEEETTTTTT");
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
    gameIsLive
  }
};

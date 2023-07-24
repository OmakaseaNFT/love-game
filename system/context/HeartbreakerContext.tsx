import { createContext } from "react";
import { useHeartbreakerGameEngine } from "../../components/heartbreaker/useHeartbreakerGameEngine";
import { Socket } from "socket.io-client";
import { RequestState } from "../hooks/useRequestState";
import { GameHistory, GameResult, LeaderBoard } from "../types";

export interface IHeartBreaker {
  onBet: (multiplierToStopAt: number, amount: number) => Promise<void>;
  onStop: (amount: number) => Promise<void>;
  onDeposit: (address: string, amount: number) => Promise<void>;
  onGetBalance: (address: string) => Promise<void>;
  onSocketInit: (socket: Socket) => void;
  onSetMultiplierToStopAt: (mult: string) => void;
  setRequestState: (requestState: RequestState) => void;
  onSetErrorMessage: (message: string) => void;
  onChangeBalance: (newBalance: number) => void;
  onWithdraw: (
    address: string,
    withdrawAmount: number,
    signature: string,
    message: string
  ) => Promise<void>;
  multiplierToStopAt: string | undefined;
  balance: number;
  mult: number;
  gameIsLive: boolean;
  amountToPlay: number;
  gameTimer: number;
  gameHistory: GameHistory[];
  leaderboard: LeaderBoard[];
  gameResults: GameResult[];
  requestState: RequestState;
  errorMessage: string;
  startAnimation: boolean;
  userExited: boolean;
  lockTime: number;
}

export const HeartBreakerContext = createContext<IHeartBreaker>(
  {} as IHeartBreaker
);

export const HeartBreakerProvider = ({ children }: { children: any }) => {
  const heartBreakerEngine: any = useHeartbreakerGameEngine();
  return (
    <HeartBreakerContext.Provider value={heartBreakerEngine}>
      {children}
    </HeartBreakerContext.Provider>
  );
};

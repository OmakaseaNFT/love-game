import { createContext } from "react";
import { useHeartbreakerGameEngine } from "../../components/heartbreaker/useHeartbreakerGameEngine";
import { Socket } from "socket.io-client";

export interface IHeartBreaker {
  onBet: (multiplierToStopAt: number, amount: number) => Promise<void>;
  onStop: (amount: number) => Promise<void>;
  onDeposit: (address: string, amount: number) => Promise<void>;
  onGetBalance: (address: string) => Promise<void>;
  onSocketInit: (socket: Socket) => void;
  onSetMultiplierToStopAt: (mult: number) => void;
  onWithdraw: (
    address: string,
    withdrawAmount: number,
    signature: string
  ) => Promise<void>;
  multiplierToStopAt: number;
  balance: number;
  mult: number;
  gameIsLive: boolean;
  amountToPlay: number;
  gameTimer: number;
  gameHistory: {
    game_number: number;
    total_amount: string;
    total_profit: string;
    crash: string;
    date_created: string;
  }[];
  leaderboard: {
    user_address: number;
    total_amount: string;
    total_profit: string;
  }[];
  gameResults: {
    gameNumber: number;
    profit: number;
    userAddress: string;
  }[];
}

export const HeartBreakerContext = createContext<IHeartBreaker>(
  {} as IHeartBreaker
);

export const HeartBreakerProvider = ({ children }: { children: any }) => {
  const heartBreakerEngine = useHeartbreakerGameEngine();
  return (
    <HeartBreakerContext.Provider value={heartBreakerEngine}>
      {children}
    </HeartBreakerContext.Provider>
  );
};

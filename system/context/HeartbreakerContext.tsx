import { createContext } from "react";
import { useHeartbreakerGameEngine } from "../../components/heartbreaker/useHeartbreakerGameEngine";
import { Socket } from "socket.io-client";

export interface IHeartBreaker {
  onBet: (multiplierToStopAt: number, amount: number) => Promise<void>;
  onStop: (amount: number) => Promise<void>;
  onDeposit: () => Promise<void>;
  onGetBalance: (address: string) => Promise<void>;
  onSocketInit: (socket: Socket) => void;
  onSetMultiplierToStopAt: (mult: number) => void;
  multiplierToStopAt: number;
  balance: number;
  mult: number;
  gameIsLive: boolean;
  amountToPlay: number;
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

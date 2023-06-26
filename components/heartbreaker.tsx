import { HeartBreakerProvider } from "../system/context/HeartbreakerContext";
import Control from "./heartbreaker/control";
import Features from "./heartbreaker/features";
import Game from "./heartbreaker/game";

export const HeartBreaker = () => {
  return (
    <HeartBreakerProvider>
      <div className="flex flex-col w-[100%] h-[90%] py-[20px]">
        <div className="flex flex-1 w-[100%] justify-between">
          <div className="w-[255px]">
            <Game />
          </div>
          <Control />
        </div>
        <div className="flex-1 overflow-x-auto">
          <Features />
        </div>
      </div>
    </HeartBreakerProvider>
  );
};

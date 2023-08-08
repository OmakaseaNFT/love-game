import { useEffect } from "react";
import { HeartBreakerProvider } from "../system/context/HeartbreakerContext";
import { useAuth } from "../system/hooks/useAuth";
import Control from "./heartbreaker/control";
import Features from "./heartbreaker/features";
import Game from "./heartbreaker/game";
import { AuthProvider } from "../system/context/AuthContext";

export const HeartBreaker = () => {
  const { onAuthUser } = useAuth();

  useEffect(() => {
    onAuthUser();
  }, []);

  return (
    <AuthProvider>
      <HeartBreakerProvider>
        <div className="flex flex-col w-[100%] h-[90%]">
          <div className="flex flex-1 w-[100%] w-[100%] my-[1rem] justify-between">
            <div className="w-[255px] ">
              <Game />
            </div>
            <Control />
          </div>
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <Features />
          </div>
        </div>
      </HeartBreakerProvider>
    </AuthProvider>
  );
};

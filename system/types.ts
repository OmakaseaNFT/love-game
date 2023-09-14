export type GameResult = {
  gameNumber: number;
  profit: number;
  userAddress: string;
};

export type GameHistory = {
  game_number: number;
  total_amount: string;
  total_profit: string;
  crash: string;
  date_created: string;
};

export type LeaderBoard = {
  user_address: number;
  total_amount: string;
  total_profit: string;
};

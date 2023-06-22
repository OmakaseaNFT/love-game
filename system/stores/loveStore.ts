import { create } from "zustand";

interface LoveStore {
  price: number;
  USDPrice: number;
}

const useLoveStore = create<LoveStore>(() => ({
  price: 0,
  USDPrice: 0,
}));

export default useLoveStore;

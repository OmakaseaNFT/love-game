
import { useState, useEffect } from "react";

function useLocalStorage<S>(key: string, defaultValue: string) : [S, React.Dispatch<React.SetStateAction<S>>]{
  const [value, setValue] = useState<S>(() => {
    let currentValue;

    try {
      currentValue = JSON.parse(
        localStorage.getItem(key) || String(defaultValue)
      );
    } catch (error) {
      currentValue = defaultValue;
    }

    return currentValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
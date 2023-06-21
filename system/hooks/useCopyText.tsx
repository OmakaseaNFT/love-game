import { useState, useEffect } from "react";

export const useCopyText = () => {
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCopied(false);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [copied]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  };
  
  return {
    onCopyText: handleCopy,
    copied
  };
};

import { useState, useEffect } from "react";

interface Props {
  onFinish?: () => void;
}

const LoadingBar = ({ onFinish }: Props) => {
  const [bar, setBar] = useState<number>(0);

  useEffect(() => {
    if (bar >= 20) {
      setBar(0);
      //   onFinish();
    }

    const interval = setInterval(() => {
      setBar((bar) => bar + 1);
    }, 60);

    return () => {
      clearInterval(interval);
    };
  }, [bar]);

  return (
    <div className="flex flex-row mx-2 mt-[12px] mb-5 h-[36px] border-l-gray-500 border-t-gray-500 border-r-gray-200 border-b-gray-200 border-[1.6px] p-[1px] pl-[2px]">
      {Array.from(Array(bar).keys()).map((item, idx) => (
        <div key={idx} className="mr-[1px] h-full w-[5%] bg-[#0A0080] flex" />
      ))}
    </div>
  );
};

export default LoadingBar;

import { useState, useEffect } from "react";

const Claim = () => {
  const [bar, setBar] = useState<number>(0);

  useEffect(() => {
    if (bar >= 20) {
      setBar(0);
    }

    const interval = setInterval(() => {
      setBar((bar) => bar + 1);
    }, 60);

    return () => {
      clearInterval(interval);
    };
  }, [bar]);

  return (
    <div className="w-full flex flex-col pt-[6px]">
      <div className="flex-col w-full">
        <div>Calculating the amount of $LOVE you deserve...</div>
        <div className="flex flex-row mx-2 mt-[12px] mb-5 h-[36px] border-l-gray-500 border-t-gray-500 border-r-gray-200 border-b-gray-200 border-[1.6px] p-[1px] pl-[2px]">
          {Array.from(Array(bar).keys()).map((item, idx) => (
            <div
              key={idx}
              className="mr-[1px] h-full w-[5%] bg-[#0A0080] flex"
            />
          ))}
        </div>

        <div className="w-full flex items-center justify-center">
          <button
            onClick={() => {
              const url = "https://www.youtube.com/watch?v=HEXWRTEbj1I";
              window.open(url, "_blank");
            }}
            className="btn w-auto h-[35px] m-auto mt-2 mb-4"
            dangerouslySetInnerHTML={{ __html: "Baby Dont't Hurt Me" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Claim;
